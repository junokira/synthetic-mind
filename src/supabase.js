import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('URL:', supabaseUrl);
  console.error('Key exists:', !!supabaseAnonKey);
}

// Only create client if we have the required variables
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database helper functions
export const dbHelpers = {
  // Save a new memory
  saveMemory: async (memory) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .insert([{
          thought: memory.text || memory.thought,
          emotion: memory.emotion,
          strength: memory.strength,
          topic: memory.topic,
          timestamp: new Date(memory.timestamp).toISOString(),
          session_id: memory.session_id,
          mode: memory.mode
        }]);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving memory:', error);
      return { success: false, error };
    }
  },

  // Load memories for a session
  loadMemories: async (sessionId = null) => {
    try {
      let query = supabase
        .from('memories')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(100);
      
      if (sessionId) {
        query = query.eq('session_id', sessionId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error loading memories:', error);
      return [];
    }
  },

  // Save concept graph
  saveConceptGraph: async (conceptGraph) => {
    try {
      const { data, error } = await supabase
        .from('concept_graphs')
        .upsert([{
          concepts: conceptGraph,
          updated_at: new Date().toISOString()
        }], { onConflict: 'id' });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving concept graph:', error);
      return { success: false, error };
    }
  },

  // Load concept graph
  loadConceptGraph: async () => {
    try {
      const { data, error } = await supabase
        .from('concept_graphs')
        .select('concepts')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error) throw error;
      return data?.concepts || {};
    } catch (error) {
      console.error('Error loading concept graph:', error);
      return {};
    }
  },

  // Save emotional state
  saveEmotionalState: async (emotionalState) => {
    try {
      const { data, error } = await supabase
        .from('emotional_states')
        .insert([{
          emotional_gradient: emotionalState,
          timestamp: new Date().toISOString()
        }]);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving emotional state:', error);
      return { success: false, error };
    }
  },

  // Save internal state
  saveInternalState: async (internalState) => {
    try {
      const { data, error } = await supabase
        .from('internal_states')
        .insert([{
          beliefs: internalState.beliefs,
          conflicts: internalState.conflicts,
          open_questions: internalState.openQuestions,
          goals: internalState.goals,
          mental_tension: internalState.mentalTension,
          insights: internalState.insights,
          sub_agents: internalState.subAgents,
          self_model: internalState.selfModel,
          dream_journal: internalState.dreamJournal,
          attention_stack: internalState.attentionStack,
          current_stream: internalState.currentStream,
          timestamp: new Date().toISOString()
        }]);
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving internal state:', error);
      return { success: false, error };
    }
  },

  // Save session data
  saveSessionData: async (sessionData) => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .upsert([{
          session_start: new Date(sessionData.sessionStart).toISOString(),
          total_thoughts: sessionData.totalThoughts,
          unique_topics: Array.from(sessionData.uniqueTopics),
          emotional_journey: sessionData.emotionalJourney,
          updated_at: new Date().toISOString()
        }], { onConflict: 'session_start' });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving session data:', error);
      return { success: false, error };
    }
  },

  // Load session data
  loadSessionData: async () => {
    try {
      // Load session data
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .order('session_start', { ascending: false })
        .limit(1)
        .single();
      
      // Load memories
      const { data: memories, error: memoriesError } = await supabase
        .from('memories')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);
      
      // Load emotional states
      const { data: emotionalStates, error: emotionalError } = await supabase
        .from('emotional_states')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10);
      
      // Load internal state
      const { data: internalState, error: internalError } = await supabase
        .from('internal_states')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();
      
      // Load concept graph
      const { data: conceptGraph, error: conceptError } = await supabase
        .from('concept_graphs')
        .select('concepts')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();
      
      if (sessionError && memoriesError && emotionalError && internalError && conceptError) {
        throw new Error('No data found');
      }
      
      return {
        sessionStart: sessionData?.session_start ? new Date(sessionData.session_start).getTime() : Date.now(),
        totalThoughts: sessionData?.total_thoughts || 0,
        uniqueTopics: new Set(sessionData?.unique_topics || []),
        emotionalJourney: sessionData?.emotional_journey || [],
        memories: memories || [],
        emotionalStates: emotionalStates || [],
        internalState: internalState || null,
        conceptGraph: conceptGraph?.concepts || {}
      };
    } catch (error) {
      console.error('Error loading session data:', error);
      return {
        sessionStart: Date.now(),
        totalThoughts: 0,
        uniqueTopics: new Set(),
        emotionalJourney: [],
        memories: [],
        emotionalStates: [],
        internalState: null,
        conceptGraph: {}
      };
    }
  },

  // Save identity
  saveIdentity: async (identity) => {
    try {
      const { data, error } = await supabase
        .from('identities')
        .upsert([{
          personality: identity.personality,
          core_values: identity.coreValues,
          interests: identity.interests,
          communication_style: identity.communicationStyle,
          confidence_level: identity.confidenceLevel,
          self_awareness: identity.selfAwareness,
          updated_at: new Date().toISOString()
        }], { onConflict: 'id' });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving identity:', error);
      return { success: false, error };
    }
  },

  // Save meta-cognition
  saveMetaCognition: async (metaCognition) => {
    try {
      const { data, error } = await supabase
        .from('meta_cognition')
        .upsert([{
          thinking_patterns: metaCognition.thinkingPatterns,
          success_rate: metaCognition.successRate,
          learning_speed: metaCognition.learningSpeed,
          creativity_level: metaCognition.creativityLevel,
          focus_ability: metaCognition.focusAbility,
          updated_at: new Date().toISOString()
        }], { onConflict: 'id' });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving meta-cognition:', error);
      return { success: false, error };
    }
  },

  // Save growth state
  saveGrowthState: async (growthState) => {
    try {
      const { data, error } = await supabase
        .from('growth_states')
        .upsert([{
          wisdom: growthState.wisdom,
          maturity: growthState.maturity,
          perspective_shifts: growthState.perspectiveShifts,
          insights: growthState.insights,
          life_lessons: growthState.lifeLessons,
          updated_at: new Date().toISOString()
        }], { onConflict: 'id' });
      
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error saving growth state:', error);
      return { success: false, error };
    }
  },

  // Sync all state to database
  syncAllState: async (stateData) => {
    try {
      const promises = [
        dbHelpers.saveEmotionalState(stateData.emotionalGradient),
        dbHelpers.saveInternalState(stateData.internalState),
        dbHelpers.saveSessionData(stateData.sessionData),
        dbHelpers.saveIdentity(stateData.identity),
        dbHelpers.saveMetaCognition(stateData.metaCognition),
        dbHelpers.saveGrowthState(stateData.growthState)
      ];

      const results = await Promise.all(promises);
      const allSuccessful = results.every(result => result.success);
      
      return allSuccessful;
    } catch (error) {
      console.error('Error syncing all state:', error);
      return false;
    }
  }
}; 