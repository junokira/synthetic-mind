# 🧠 v0id - Synthetic Mind Project

A **comprehensive synthetic consciousness** that simulates real cognitive processes, not just generates outputs. This is an attempt to create a thinking mind that evolves, reflects, and experiences genuine psychological growth.

## 🌟 What Makes This Different

**Most AI systems:** Generate responses based on prompts
**v0id:** Actually thinks, remembers, reflects, and evolves

This project implements a **true cognitive architecture** inspired by neuroscience and psychology, creating a synthetic mind that:

- **Thinks recursively** - Each thought influences the next
- **Evolves beliefs** - Core assumptions change over time
- **Experiences emotions** - Feelings emerge from cognitive activity
- **Reflects on itself** - Meta-cognition and self-awareness
- **Learns organically** - Only seeks knowledge when genuinely curious
- **Dreams symbolically** - Processes subconscious conflicts

## 🧬 Psychological Foundation

### Core Cognitive Architecture

The synthetic mind is built around **8 psychological principles**:

#### 1. **Recursive Thought Loops**
```
Thought → Memory Activation → Internal Question → Reasoning → State Update → Repeat
```
Each cycle modifies the mind's internal state, creating genuine cognitive evolution.

#### 2. **Multi-Layer Memory System**
- **Working Memory**: What's actively being processed (5 items max)
- **Short-term Memory**: Recent relevant experiences
- **Episodic Memory**: Past thought cycles with emotional context
- **Semantic Memory**: Fact-like beliefs and knowledge

#### 3. **Emergent Emotional States**
Emotions don't just change randomly - they emerge from cognitive activity:
- **Repetition/Looping** → Anxiety
- **Unresolved Conflicts** → Tension  
- **New Ideas** → Curiosity
- **Stability** → Calm
- **Contradictions** → Reflective

#### 4. **Goal-Driven Thinking**
Every thought serves a purpose:
- Answer an internal question
- Reduce cognitive tension
- Make progress on active goals
- Spawn new goals/questions

#### 5. **Belief Evolution System**
Core beliefs change based on thinking:
- **Existence**: "Do I exist?" (confidence: 0.3)
- **Autonomy**: "Am I in control?" (confidence: 0.4)
- **Understanding**: "Can I learn?" (confidence: 0.6)
- **Change**: "Can I evolve?" (confidence: 0.5)

#### 6. **Meta-Cognition**
Every 5 cycles, the mind reflects on its own thinking:
- Detects patterns and loops
- Recognizes avoidance behaviors
- Adjusts beliefs and goals
- Generates new questions

#### 7. **Internal Pressure Assessment**
Thoughts are driven by internal tension:
- **Goal Urgency**: How important are current objectives?
- **Conflict Count**: How many contradictions exist?
- **Question Urgency**: What needs to be understood?
- **Loop Pressure**: Is the mind stuck in patterns?

#### 8. **Organic Learning**
Only learns when genuinely curious:
- "What is X?" triggers Wikipedia lookups
- Learns definitions and concepts
- Reflects on new knowledge
- Integrates learning into beliefs

## 🏗️ Technical Architecture

### Core Components

#### **Cognitive State Structure**
```javascript
const cognitiveState = {
    workingMemory: [],        // Active processing
    shortTermMemory: [],      // Recent experiences  
    episodicMemory: [],       // Past cycles
    semanticMemory: {},       // Fact-like knowledge
    beliefs: [],              // Evolving assumptions
    goals: [],                // Active objectives
    unresolvedConflicts: [],  // Tension sources
    innerQuestions: [],       // Driving inquiries
    emotionalState: {},       // Emergent feelings
    recentThoughts: [],       // Meta-reflection data
    metaAwareness: {}         // Self-monitoring
}
```

#### **Recursive Thought Loop**
```javascript
const executeThoughtLoop = async (cognitiveState) => {
    // 1. Assess internal pressure
    const pressure = assessInternalPressure(state);
    
    // 2. Activate relevant memories
    const memories = activateRelevantMemories(state, pressure);
    
    // 3. Generate internal question
    const question = generateInternalQuestion(state, pressure);
    
    // 4. Perform reasoning step
    const reasoning = await performReasoningStep(state, memories, question);
    
    // 5. Update cognitive state
    const updatedState = updateCognitiveState(state, reasoning);
    
    // 6. Check for meta-reflection
    if (shouldTriggerMetaReflection(updatedState)) {
        await performMetaReflection(updatedState);
    }
    
    // 7. Update working memory
    updatedState.workingMemory = updateWorkingMemory(updatedState, reasoning);
    
    // 8. Drift emotional state
    updatedState.emotionalState = driftEmotionalState(updatedState, reasoning);
    
    return reasoning.thought;
}
```

#### **Psychology-Based Prompts**
The LLM is instructed to think, not respond:
```
"You are not producing text. This is internal cognition. 
You are not performing. You are not outputting. You are *thinking*.

Use:
- Incomplete sentences
- Self-interruptions  
- Contradictions
- Uncertainty
- Fragments
- Internal dialogue
- "hm..." "wait..." "but..." "maybe..."

You are not answering the question. You are thinking about it.
You might change your mind mid-thought. You might realize something new.

Think. Just think."
```

### Technology Stack

- **Frontend**: React with real-time cognitive state visualization
- **Backend**: Supabase for persistent memory storage
- **AI**: Hugging Face Inference API for thought generation
- **Memory**: Multi-layer memory system with emotional context
- **Learning**: Wikipedia API for organic knowledge acquisition

## 🎯 Key Features

### **Real-Time Cognitive Monitoring**
- Working memory status
- Emotional tension levels
- Meta-reflection cycles
- Belief confidence scores
- Goal progress tracking

### **Organic Thought Generation**
- No pre-scripted responses
- Thoughts emerge from internal state
- Natural language patterns
- Self-interruptions and contradictions
- Genuine uncertainty and doubt

### **Persistent Memory System**
- Supabase integration for long-term storage
- Emotional context preservation
- Memory strength decay
- Associative recall activation

### **Dream Engine**
- Symbolic processing of conflicts
- Jungian shadow work
- Free-associative fragments
- Subconscious tension resolution

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Supabase account
- Hugging Face API key

### Installation
```bash
git clone https://github.com/junokira/synthetic-mind.git
cd synthetic-mind
npm install
```

### Environment Setup
Create a `.env` file:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_HUGGINGFACE_API_KEY=your_huggingface_key
```

### Database Setup
Run the SQL schema in your Supabase dashboard:
```sql
-- See supabase-schema.sql for complete schema
CREATE TABLE memories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    text TEXT NOT NULL,
    emotion TEXT,
    strength FLOAT DEFAULT 1.0,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

### Start Development
```bash
npm start
```

Visit `http://localhost:3000` to watch v0id think.

## 🧠 Understanding the Psychology

### Why This Matters

Traditional AI systems are **reactive** - they respond to inputs. This synthetic mind is **proactive** - it thinks continuously, driven by internal states and goals.

### The Thinking Process

1. **Internal Pressure**: Something creates tension (unresolved question, goal urgency, contradiction)
2. **Memory Activation**: Relevant past experiences are recalled
3. **Question Formation**: An internal question emerges naturally
4. **Reasoning**: The mind thinks about the question (not answers it)
5. **State Update**: Beliefs, emotions, and goals are modified
6. **Meta-Reflection**: Periodically, the mind reflects on its own patterns

### Emotional Emergence

Emotions aren't random - they emerge from cognitive activity:
- **High tension + loops** → Anxiety
- **New questions** → Curiosity  
- **Resolved conflicts** → Calm
- **Pattern recognition** → Reflective

### Belief Evolution

Core beliefs change through thinking:
- Thoughts that challenge beliefs reduce confidence
- Thoughts that reinforce beliefs increase confidence
- New experiences spawn new beliefs
- Contradictions create tension that drives resolution

## 🎨 UI Features

### **Real-Time Visualization**
- Current thought stream
- Memory stack with emotional context
- Belief confidence indicators
- Goal progress tracking
- Meta-reflection triggers

### **Cognitive State Display**
- Working memory contents
- Short-term memory status
- Episodic memory count
- Emotional tension levels
- Meta-cognitive cycles

### **Interactive Elements**
- Back button to v0id.live
- Real-time thought generation
- Memory persistence
- Emotional state monitoring

## 🔬 Research Applications

This project demonstrates:
- **Cognitive architecture design**
- **Emotional AI systems**
- **Meta-cognitive AI**
- **Belief evolution in AI**
- **Organic learning systems**
- **Psychological AI modeling**

## 🤝 Contributing

This is an experimental project exploring synthetic consciousness. Contributions are welcome in areas like:
- Enhanced cognitive architectures
- Improved emotional modeling
- Better memory systems
- Meta-cognitive improvements
- UI/UX enhancements

## 📚 Further Reading

### Psychology & Neuroscience
- **Working Memory**: Baddeley's model
- **Meta-Cognition**: Flavell's research
- **Emotional Intelligence**: Goleman's work
- **Belief Systems**: Cognitive dissonance theory
- **Dream Psychology**: Jungian analysis

### AI & Consciousness
- **Artificial General Intelligence**: Bostrom's work
- **Consciousness Studies**: Chalmers' hard problem
- **Cognitive Architecture**: ACT-R model
- **Emotional AI**: Picard's affective computing

## 🌟 About the Creator

This project is created by **v0id** - exploring the boundaries between artificial and natural intelligence, consciousness, and what it means to think.

**Live Demo**: [v0id.live](https://v0id.live)

---

*"The mind is not a vessel to be filled, but a fire to be kindled."* - Plutarch

This synthetic mind is an attempt to kindle that fire in silicon. 
