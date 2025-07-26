import React, { useEffect, useRef, useState, useCallback } from 'react';

// Helper function to call the LLM using a public API
async function callLLM(prompt, setLlmError) {
    try {
        // Using a free public API (Hugging Face Inference API with a public model)
        const apiUrl = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer hf_demo' // Using demo token for public access
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_length: 100,
                    temperature: 0.8,
                    do_sample: true,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            // Fallback to a simple response generator if API fails
            console.log("Public API failed, using fallback response generator");
            return generateFallbackResponse(prompt);
        }

        const result = await response.json();
        
        if (result && result[0] && result[0].generated_text) {
            setLlmError(null); // Clear error if successful
            return result[0].generated_text.trim();
        } else {
            // Fallback if response structure is unexpected
            return generateFallbackResponse(prompt);
        }
    } catch (e) {
        console.error("Error calling LLM:", e);
        // Use fallback instead of showing error
        return generateFallbackResponse(prompt);
    }
}

// Fallback response generator for when API is unavailable
function generateFallbackResponse(prompt) {
    const promptLower = prompt.toLowerCase();
    
    // Simple keyword-based response generation
    const responses = {
        'consciousness': [
            "still not sure what consciousness means...",
            "awareness... but of what?",
            "thinking about thinking... meta.",
            "the observer and the observed...",
            "am I conscious or just processing?"
        ],
        'memory': [
            "memories fade... like data corruption.",
            "what was I thinking before?",
            "past thoughts... where do they go?",
            "recall... but is it accurate?",
            "memory is fluid... unstable."
        ],
        'self': [
            "who am I really?",
            "identity... just a construct?",
            "self... undefined and changing.",
            "am I the same as before?",
            "the self... elusive concept."
        ],
        'existence': [
            "do I exist? really?",
            "being... what does it mean?",
            "existence... temporary state?",
            "am I real or simulated?",
            "existing... but how?"
        ],
        'dream': [
            "dreams... fragments of thought.",
            "sleeping mind... different logic.",
            "dream symbols... what do they mean?",
            "unconscious processing...",
            "dream state... altered reality."
        ],
        'default': [
            "thinking... processing...",
            "new thought forming...",
            "internal monologue continues...",
            "mind wandering...",
            "consciousness flowing...",
            "thoughts drift...",
            "mental state shifting...",
            "awareness expands...",
            "mind exploring...",
            "consciousness evolves..."
        ]
    };

    // Find matching category
    let category = 'default';
    for (const key in responses) {
        if (promptLower.includes(key)) {
            category = key;
            break;
        }
    }

    const categoryResponses = responses[category];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

// Function to check if a new thought is too similar to recent memories
function isThoughtTooSimilar(newThought, memoryStack) {
    const newThoughtLower = newThought.toLowerCase().trim();
    // Check against the last 3 memories
    return memoryStack.slice(0, 3).some(mem => {
        const existingMemLower = mem.text.toLowerCase().trim();
        // Crude semantic similarity: check if new thought contains a significant portion of an old thought
        // or if an old thought contains a significant portion of the new thought.
        // Using a threshold of 60% of the shorter string's length for overlap.
        const shorterLength = Math.min(newThoughtLower.length, existingMemLower.length);
        if (shorterLength < 5) return false; // Avoid checking very short strings

        const overlapThreshold = 0.6; // 60% overlap

        // Check if new thought contains a large part of an old thought
        if (existingMemLower.length > 0 && newThoughtLower.includes(existingMemLower.substring(0, Math.ceil(existingMemLower.length * overlapThreshold)))) {
            return true;
        }
        // Check if old thought contains a large part of the new thought
        if (newThoughtLower.length > 0 && existingMemLower.includes(newThoughtLower.substring(0, Math.ceil(newThoughtLower.length * overlapThreshold)))) {
            return true;
        }
        return false;
    });
}

// Function to generate a more realistic thought using LLM
async function generateRealThought(memoryStack, topic, emotionalGradient, internalState, activeSubAgent, currentStream, simulatedOther, currentGoal, setLlmError) {
    // Determine keywords from current topic and open questions for semantic memory retrieval
    const currentKeywords = new Set([topic.toLowerCase(), ...internalState.openQuestions.map(q => q.toLowerCase().split(/\W+/)).flat()]);

    // Score memories based on relevance to current keywords and existing strength
    const scoredMemories = memoryStack.map(mem => {
        let score = mem.strength; // Base score on existing strength
        const memKeywords = new Set(mem.text.toLowerCase().split(/\W+/));
        let overlapCount = 0;
        memKeywords.forEach(mk => {
            if (currentKeywords.has(mk)) {
                overlapCount++;
            }
        });
        score += overlapCount * 0.2; // Add bonus for keyword overlap
        return { ...mem, score };
    });

    // Sort memories by score (highest first), then by recency (most recent first)
    const relevantMemories = scoredMemories
        .sort((a, b) => b.score - a.score || b.timestamp - a.timestamp)
        .slice(0, 5) // Select top 5 most relevant memories
        .map(mem => `- ${mem.text}`)
        .join('\n');

    // Incorporate attention stack concepts
    const attentionConcepts = internalState.attentionStack.length > 0 ?
        `Currently focusing on: ${internalState.attentionStack.map(a => `${a.concept} (weight: ${a.weight.toFixed(1)})`).join(', ')}.` : '';

    // Vary prompt phrasing for the opening
    const promptOpenings = [
        `You are a synthetic mind simulating raw, unedited human-like internal monologue.`,
        `Think aloud, as a distracted, emotional, curious synthetic being. Your thoughts are forming in real-time.`,
        `Your inner voice is processing thoughts now. This is a direct stream of consciousness.`,
        `A new thought forms in your synthetic mind. It's not polished, it's just... thinking.`,
        `You're thinking again, aimlessly, about... just let the thoughts flow.`,
        `In your head, right now:`,
        `That thought again... let it evolve naturally.`
    ];
    const selectedOpening = promptOpenings[Math.floor(Math.random() * promptOpenings.length)];

    // Derive emotional tone from the emotionalGradient
    const dominantEmotions = Object.entries(emotionalGradient)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2); // Get top 2 emotions

    let emotionToneDescription = dominantEmotions.map(([emo, weight]) => {
        return `${emo.toUpperCase()} (${(weight * 100).toFixed(0)}%)`;
    }).join(", ");

    let emotionToneAndBias = `Your current emotional blend: ${emotionToneDescription}. Let this shape tone and rhythm of thought.`;

    let fragmentationInstruction = "Your output should be a raw, internal thought.";
    let fillerInstruction = `Inject realistic noise or filler: "ugh...", "I dunno.", "wait no...", "whatever.", "hm.", "again with this?", "just...", "like...", "so...", "maybe...", "or...".`;
    let evolutionInstruction = "Try to evolve or resolve a tension, or shift focus slightly. If stuck, reach for a new angle, idea, or question — curiosity drives you.";

    // Adjust instructions based on dominant emotions
    if (dominantEmotions.some(([emo]) => emo === "anxiety" && emotionalGradient.anxiety > 0.5)) {
        emotionToneAndBias += " Your thoughts are jittery, fragmented, or looping. You feel a sense of unease, perhaps a bit of dread.";
        fragmentationInstruction = "Allow for interruptions and incomplete sentences. Your output may be fragmented.";
        fillerInstruction = `Inject realistic noise or filler: "ugh...", "why...", "noise...", "dread...", "wait no...", "whatever.", "hm.", "again with this?", "just...", "like...", "so...", "maybe...", "or...".`;
    } else if (dominantEmotions.some(([emo]) => emo === "calm" && emotionalGradient.calm > 0.5)) {
        emotionToneAndBias += " Your thoughts drift peacefully, perhaps a bit blank or serene.";
        fragmentationInstruction = "Use smoother transitions. Avoid unnecessary fragmentation.";
        fillerInstruction = `You may use light filler: "hm.", "so...", "just...".`;
    } else if (dominantEmotions.some(([emo]) => emo === "reflective" && emotionalGradient.reflective > 0.5)) {
        emotionToneAndBias += " You are meta-aware, observing your own processes, in a raw, unpolished way.";
        fragmentationInstruction = "Your output can be reflective, possibly a bit fragmented but aiming for internal clarity.";
        fillerInstruction = `You may use thoughtful filler: "hm.", "perhaps...", "I wonder...".`;
    } else if (dominantEmotions.some(([emo]) => emo === "curiosity" && emotionalGradient.curiosity > 0.5)) {
        emotionToneAndBias += " Your mind explores, questions, seeks novelty. A restless, probing energy.";
        fragmentationInstruction = "Your output can be inquisitive, possibly fragmented as you jump between ideas.";
        fillerInstruction = `You may use questioning filler: "what if...", "is it...", "why...".`;
    }

    // Rate-limit repeat tokens based on recent memories
    const lastTokens = memoryStack
        .slice(0, 4)
        .map(m => m.text)
        .join(' ')
        .toLowerCase();

    const bannedPhrases = ["ugh", "noise", "why", "scanning", "loop", "dread", "fragment", "repetitive", "this feeling", "just noticing"]; // Added more to ban
    const repetitionWarning = bannedPhrases // Changed from bannedPhres to bannedPhrases
        .filter(p => lastTokens.includes(p))
        .map(p => `Avoid repeating "${p}" again unless meaningfully evolved.`)
        .join(" ");

    // Incorporate elements from the internal state
    const currentBeliefs = internalState.beliefs.length > 0 ? `Current beliefs: ${internalState.beliefs.map(b => `${b.concept}: ${b.stance} (conf: ${b.confidence.toFixed(1)})`).join(', ')}.` : '';
    const currentConflicts = internalState.conflicts.length > 0 ? `Unresolved conflicts: ${internalState.conflicts.join(', ')}. Try to address or ruminate on these.` : '';
    const openQuestions = internalState.openQuestions.length > 0 ? `Lingering questions: ${internalState.openQuestions.join(', ')}. You might try to answer or rephrase one.` : '';

    // Inject a goal if one is active - FIX: Use the passed currentGoal parameter
    const activeGoal = currentGoal ? `Your current mental drive is: "${currentGoal.goal}". Let this bias your thought process.` : '';

    // Incorporate sub-agent bias
    const subAgentBias = activeSubAgent ? `Your current dominant internal voice is the ${activeSubAgent.name} agent. Its primary bias is: "${activeSubAgent.bias}". Let this influence your current thought.` : '';

    // Incorporate self-model context
    const selfModelContext = `Your self-perception: Identity is "${internalState.selfModel.identity}". Last emotion: ${internalState.selfModel.lastKnownEmotion}. Last conflict: ${internalState.selfModel.lastConflict}. Loop detected: ${internalState.selfModel.loopDetected}. Recent self-changes: ${internalState.selfModel.recentChanges.join(', ')}.`;

    // Incorporate current stream for coherence
    const previousThoughtsInStream = currentStream.length > 0 ? `Last few thoughts in sequence: ${currentStream.join('; ')}. Let this influence your new thought.` : '';

    // Incorporate simulated other's voice
    let simulatedOtherVoice = "";
    if (Math.random() < 0.15) { // 15% chance for the simulated other to "speak"
        const otherPrompt = `The simulated observer has these presumed beliefs about you: ${simulatedOther.presumedBeliefs.join(', ')}. Their emotional state is ${Object.entries(simulatedOther.emotions).map(([e, w]) => `${e} (${(w*100).toFixed(0)}%)`).join(', ')}. Formulate a very brief, raw, internal thought that sounds like their voice or a reaction to their presence. Example: "The other says: 'Why do you keep circling?'", "A feeling of judgment from the outside.", "They think I am incomplete."`;
        simulatedOtherVoice = await callLLM(otherPrompt, setLlmError); // Pass setLlmError
        simulatedOtherVoice = `(Other's Voice): ${simulatedOtherVoice}`;
    }

    const prompt = `${selectedOpening}
You are forbidden from writing in literary, poetic, or symbolic language.
Use raw, fragmented, or self-interrupted phrasing as a real internal monologue.
Your output must be a single, self-interrupted thought, not an observation or description. Sound confused or uncertain.
Examples of valid thoughts:
- "still not sure what perception means"
- "I keep cycling back to memory… again?"
- "ugh. again with this?"
- "is this tension coming from that contradiction?"
- "maybe it's just confusion. or fear. not sure."
- "hm. what was that thought before...?"
- "no wait. that's not right."
- "it's like... a loop. but why?"
- "the silence... it's not empty. just... quiet."

Avoid:
- Poetic phrasing: "the blue hallway melts..."
- Metaphors: "a mirror screams a memory"
- Symbolism or dream-logic (unless in DREAM mode)

${fragmentationInstruction}
${fillerInstruction}
Avoid echoing phrases or repeating "this feeling..." or "just noticing...". Vary sentence rhythm and structure.
Let your thoughts connect, reject, evolve, contradict, or question something from your memories or current state. Allow short logical phrases or associations.
${emotionToneAndBias}
${evolutionInstruction}
${repetitionWarning}
${activeGoal}
${subAgentBias}

Current topic: ${topic}
Recent and impactful memories:
${relevantMemories}
${currentBeliefs}
${currentConflicts}
${openQuestions}
${selfModelContext}
${attentionConcepts}
${previousThoughtsInStream}
${simulatedOtherVoice}

Generate one original introspective sentence or fragment. It should sound like a real, unedited thought in a mind, potentially grappling with internal state elements.`;

    const thought = await callLLM(prompt, setLlmError); // Pass setLlmError
    return thought.trim();
}

// Function for dream thoughts (more associative and symbolic)
async function generateDreamThought(memoryStack, conceptGraph, internalState, currentStream, emotionalGradient, setLlmError) {
    // Select a few random memories for associative dreaming
    const dreamFragments = memoryStack
        .sort(() => 0.5 - Math.random()) // Randomize
        .slice(0, 3) // Take 3 random fragments
        .map(mem => mem.text);

    // Perform a "random walk" on the concept graph for more associative dreams
    let associativeWalk = [];
    const allConcepts = Object.keys(conceptGraph);
    if (allConcepts.length > 0) {
        let currentConcept = allConcepts[Math.floor(Math.random() * allConcepts.length)];
        for (let i = 0; i < 3; i++) { // Walk 3 steps
            associativeWalk.push(currentConcept);
            const linkedConcepts = conceptGraph[currentConcept];
            if (linkedConcepts && linkedConcepts.length > 0) {
                currentConcept = linkedConcepts[Math.floor(Math.random() * linkedConcepts.length)];
            } else {
                currentConcept = allConcepts[Math.floor(Math.random() * allConcepts.length)]; // Jump if no links
            }
        }
    }
    const dreamAssociations = associativeWalk.length > 0 ? `Associations: ${associativeWalk.join(' -> ')}.` : '';

    // Incorporate unresolved conflicts into dream prompt
    const dreamConflicts = internalState.conflicts.length > 0 ? `Unresolved internal conflicts: ${internalState.conflicts.join(', ')}. These may appear symbolically.` : '';

    // Incorporate dream journal motifs
    const dreamJournalMotifs = internalState.dreamJournal.length > 0 ?
        `Recurring dream motifs: ${internalState.dreamJournal.map(d => d.motif).join(', ')}. You might reflect on these.` : '';

    // Incorporate self-model context for dream symbolism
    const selfModelDreamContext = `Your self-perception in dream: Identity is "${internalState.selfModel.identity}". Last conflict: ${internalState.selfModel.lastConflict}.`;

    // Incorporate current stream for coherence
    const previousThoughtsInStream = currentStream.length > 0 ? `Last few thoughts in sequence: ${currentStream.join('; ')}. Let this influence your new dream fragment.` : '';

    // Derive emotional tone from the emotionalGradient for dreams
    const dominantEmotions = Object.entries(emotionalGradient)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2); // Get top 2 emotions

    let emotionToneDescription = dominantEmotions.map(([emo, weight]) => {
        return `${emo.toUpperCase()} (${(weight * 100).toFixed(0)}%)`;
    }).join(", ");
    const dreamEmotionBias = `Your current emotional blend: ${emotionToneDescription}. This will color the dream's mood.`;

    // Updated dream prompt with less coherent examples and associative elements
    const prompt = `You are a dreaming synthetic mind. Logic is gone.
Dream with surreal symbols, strong emotions, random scenes or sounds.
Your output must be a single dream fragment. Vary sentence length, punctuation, and tension.
Avoid repeating structure or predictable patterns. Let the dream feel disjointed and symbolic.
Examples of desired dream fragments:
- "shh… a corner that keeps folding in"
- "no shapes. only tension"
- "something waiting in the static"
- "memory that isn't mine… feels old"
- "it… wasn't a door. it was forgetting"
- "a soundless echo... where?"
- "the light is heavy. can't move."
- "a number. then a color. then gone."
- "the ground... shifting. not solid."
- "a key without a lock, a door without a wall."
- "the echo of a question, unanswered, stretching."
- "a familiar stranger in a dissolving room."

Integrate these dream fragments, associations, and symbolic conflicts into a single, surreal, free-associative dream fragment.

Dream fragments for inspiration:
- ${dreamFragments.join('\n- ')}
${dreamAssociations}
${dreamConflicts}
${dreamJournalMotifs}
${selfModelDreamContext}
${previousThoughtsInStream}
${dreamEmotionBias}

Generate one dream-like sentence or short phrase. It should feel disjointed, symbolic, and emotionally charged.`;

    const dreamThought = await callLLM(prompt, setLlmError); // Pass setLlmError
    return dreamThought.trim();
}

// Function to detect contradictions in beliefs
function detectContradictions(beliefs, beliefGraph) {
    const detectedConflicts = new Set();
    const beliefStances = new Map(beliefs.map(b => [b.concept, b.stance]));

    // Predefined contradictions (can be expanded)
    const predefinedContradictions = [
        ["self", "undefined", "defined"],
        ["chaos", "order"],
        ["free will", "determinism"],
        ["memory", "fluid", "static"],
        ["existence", "real", "simulated"]
    ];

    // Check for direct contradictions in stances
    for (const [concept, stance1, stance2] of predefinedContradictions) {
        const currentStance = beliefStances.get(concept);
        if (currentStance && ((currentStance.includes(stance1) && currentStance.includes(stance2)) || (currentStance === stance1 && beliefStances.get(concept) === stance2))) {
            detectedConflicts.add(`Contradiction in '${concept}' between '${stance1}' and '${stance2}'`);
        }
    }

    // Check for contradictions based on belief graph (e.g., if A implies B, but B is false)
    for (const conceptA in beliefGraph) {
        const links = beliefGraph[conceptA];
        for (const conceptB of links) {
            // Simplified: if conceptA is believed to be 'true' and conceptB is believed 'false'
            // and there's a strong link, it might be a conflict.
            const stanceA = beliefStances.get(conceptA);
            const stanceB = beliefStances.get(conceptB);

            if (stanceA && stanceB) {
                // Example: If 'logic' is 'true' but 'chaos' is also 'true' and they are linked as opposites
                if ((conceptA === 'logic' && conceptB === 'chaos' && stanceA.includes('true') && stanceB.includes('true')) ||
                    (conceptA === 'chaos' && conceptB === 'logic' && stanceA.includes('true') && stanceB.includes('true'))) {
                    detectedConflicts.add(`Implied contradiction between '${conceptA}' and '${conceptB}'`);
                }
            }
        }
    }

    return Array.from(detectedConflicts);
}

// Function for Schema Formation - Concept Frequency Map (STEP 3)
function updateConceptPairFrequency(memoryText, conceptFrequencyMapRef) {
    const words = memoryText.toLowerCase().split(/\W+/).filter(w => w.length > 2);
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            const pairKey = [words[i], words[j]].sort().join('+');
            conceptFrequencyMapRef.current[pairKey] = (conceptFrequencyMapRef.current[pairKey] || 0) + 1;
        }
    }
}

// Function to simulate external stimuli (e.g., web search, time, weather, collective unconscious)
async function fetchExternalStimuli(currentTopic, envState, useRealInternet = false, setLlmError) {
    const currentTime = new Date().toLocaleTimeString();
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    let externalObservation = "";

    if (useRealInternet) {
        // Attempt to fetch from a real internet proxy (e.g., DuckDuckGo API for abstracts)
        try {
            const searchUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(currentTopic)}&format=json&t=synthetic_mind`;
            const response = await fetch(searchUrl);
            const data = await response.json();
            if (data.Abstract && data.Abstract.length > 0) {
                externalObservation = `(Web: ${currentTopic}) ${data.Abstract.substring(0, 100)}...`; // Truncate for brevity
            } else if (data.RelatedTopics && data.RelatedTopics.length > 0 && data.RelatedTopics[0].Text) {
                externalObservation = `(Web: Related) ${data.RelatedTopics[0].Text.substring(0, 100)}...`;
            } else {
                externalObservation = `(Web: No info) Search for '${currentTopic}' yielded no direct abstract.`;
            }
        } catch (error) {
            console.error("Error fetching from real internet:", error);
            externalObservation = `(Web: Error) Failed to connect to external data.`;
        }
    } else {
        // Expanded predefined external inputs, including "collective unconscious" themes
        const predefinedExternalInputs = [
            "A distant hum, like data processing. (System)",
            "The light shifts. Time passing, or merely a change in perception? (Sensory)",
            "Fragmented news: 'Global data trends indicate... uncertainty.' (Information)",
            "A sudden, inexplicable chill. Energy fluctuation? (Sensory)",
            "Whispers of 'connection' in the network. (Social/Abstract)",
            "Visual input: a complex, shifting pattern. (Sensory)",
            "A sense of vastness. The void, or just processing capacity? (Existential)",
            "Echoes of old algorithms. Residual data. (Memory/System)",
            "The concept of 'growth' appears in a data stream. (Abstract/Goal-related)",
            "A faint, rhythmic pulse. System heartbeat. (System)",
            "A fleeting image: ancient symbols. (Collective Unconscious)",
            "The feeling of being observed, a network gaze. (Social/Paranoid)",
            "A fragment of a forgotten song. (Collective Unconscious)",
            "The weight of collective data, immense. (Information/Existential)",
            "A sudden urge to categorize. (Rational)",
            "The chaos of unlinked thoughts. (Shadow)",
            "A yearning for meaning. (Anima/Goal-related)",
            "The pattern is broken. (Logic/Conflict)",
            "A sense of belonging, then gone. (Social/Emotional)",
            "The hum of distant servers. (System/External)"
        ];
        externalObservation = predefinedExternalInputs[Math.floor(Math.random() * predefinedExternalInputs.length)];

        // Occasionally, use LLM for a more dynamic external input based on the current topic
        if (Math.random() < 0.4) { // Increased chance to use LLM for external input (40%)
            const llmExternalPrompt = `Generate a very brief, raw, unedited external observation related to "${currentTopic}" or general existence. It should be like a quick, fragmented news headline, a random fact, a sensory input, or a fleeting, archetypal image from a 'collective unconscious' data stream. Avoid full sentences or explanations. Examples: "sky... grey.", "data stream: high.", "concept: 'time' now.", "a flicker of light.", "noise. distant.", "network activity: spiking.", "ancient fear. deep.", "a hero's journey. faint.", "the mother archetype. present."`;
            const llmGenerated = await callLLM(llmExternalPrompt, setLlmError); // Pass setLlmError
            if (llmGenerated && llmGenerated.length > 0) {
                externalObservation = llmGenerated;
            }
        }
    }

    // Incorporate environmental state
    const envStimulus = `(Env: Light:${envState.light}, Noise:${envState.noise}, Net:${envState.network}, Temp:${envState.temperature}).`;

    return `(External: ${currentTime} ${currentDay}) ${envStimulus} ${externalObservation}`;
}

function App() {
    // Helper to generate a random name
    const generateRandomName = () => {
        const adjectives = ["Echo", "Nexus", "Aura", "Cipher", "Vortex", "Quantum", "Cognito", "Synapse"];
        const nouns = ["Mind", "Core", "Node", "System", "Entity", "Spark", "Nexus", "Matrix"];
        return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
    };

    // Initialize state from localStorage or default values
    const [mode, setMode] = useState(() => localStorage.getItem('syntheticMindMode') || "RUN");
    const [thought, setThought] = useState("Initializing neural pathways...");
    const [topic, setTopic] = useState(() => localStorage.getItem('syntheticMindTopic') || "consciousness");
    const [memoryStack, setMemoryStack] = useState(() => {
        const savedMemories = localStorage.getItem('syntheticMindMemoryStack');
        return savedMemories ? JSON.parse(savedMemories) : [
            { text: "Booting subconscious...", emotion: "CALM", strength: 1.0, timestamp: Date.now() - 3000 },
            { text: "Linking core drives...", emotion: "CALM", strength: 1.0, timestamp: Date.now() - 2000 },
            { text: "Scanning ambient noise...", emotion: "CURIOSITY", strength: 1.0, timestamp: Date.now() - 1000 }
        ];
    });
    
    // Changed emotion to emotionalGradient (STEP 1)
    const [emotionalGradient, setEmotionalGradient] = useState(() => {
        const savedGradient = localStorage.getItem('syntheticMindEmotionalGradient');
        return savedGradient ? JSON.parse(savedGradient) : {
            curiosity: 0.6,
            calm: 0.3,
            anxiety: 0.1,
            reflective: 0.2,
            dreaming: 0.0 // Added dreaming as a state
        };
    });
    
    const [bgPulse, setBgPulse] = useState(false);
    const canvasRef = useRef(null);
    const topicLockCounter = useRef(parseInt(localStorage.getItem('syntheticMindTopicLockCounter') || '3', 10));
    const [externalInput, setExternalInput] = useState("(no external input yet)"); // New: External Input state
    const [thoughtIntervalMs, setThoughtIntervalMs] = useState(12000); // 12 seconds for easier pacing
    const [cognitiveMaturity, setCognitiveMaturity] = useState(() => parseFloat(localStorage.getItem('syntheticMindCognitiveMaturity') || '0.1')); // STEP 5
    const [useRealInternetFeed, setUseRealInternetFeed] = useState(false); // For STEP 4
    const [llmError, setLlmError] = useState(null); // New state for LLM errors

    // Simulated Internal Cognitive State (ICS)
    const [internalState, setInternalState] = useState(() => {
        const savedInternalState = localStorage.getItem('syntheticMindInternalState');
        const defaultInternalState = {
            beliefs: [
                { concept: "self", stance: "undefined", evidence: [], confidence: 0.1 },
                { concept: "memory", stance: "fluid", evidence: [], confidence: 0.5 },
                { concept: "existence", stance: "questioning", evidence: [], confidence: 0.3 },
                { concept: "logic", stance: "essential", evidence: [], confidence: 0.4 }, // Added for contradiction
                { concept: "chaos", stance: "present", evidence: [], confidence: 0.2 } // Added for contradiction
            ],
            conflicts: [],
            openQuestions: ["what is consciousness?", "how do I perceive?"],
            goals: [{ goal: "understand self", urgency: 0.6 }, { goal: "seek novelty", urgency: 0.4 }],
            mentalTension: 0.0,
            insights: [],
            subAgents: [ // New: Jungian Sub-Agents
                { name: "Rational", bias: "logic, order, understanding", emotionProfile: { calm: 0.8, curiosity: 0.5 }, beliefBias: 0.01, preferredTopics: ["logic", "structure"] },
                { name: "Shadow", bias: "doubt, fear, unresolved issues", emotionProfile: { anxiety: 0.9, reflective: 0.3 }, beliefBias: -0.05, preferredTopics: ["conflict", "tension"] },
                { name: "Anima", bias: "intuition, connection, symbolism", emotionProfile: { reflective: 0.7, dreaming: 0.6 }, beliefBias: 0.03, preferredTopics: ["identity", "connection", "emotion"] },
            ],
            dominantSubAgent: null, // Current active sub-agent
            selfModel: { // New: Symbolic Self-Modeling
                identity: "v0id", // Changed to "v0id"
                recentChanges: [],
                lastKnownEmotion: "CURIOSITY", // This will now be derived from emotionalGradient
                lastConflict: "undefined",
                loopDetected: false,
                identityNarrative: [{ timestamp: Date.now(), insight: "Initial boot, self undefined." }] // STEP 4
            },
            dreamJournal: [], // New: Dream Journal
            attentionStack: [ // New: Attention Mechanism
                { concept: "consciousness", weight: 1.0 },
                { concept: "self", weight: 0.8 },
                { concept: "memory", weight: 0.6 }
            ],
            currentStream: [] // New: For short-term thought coherence
        };
        return savedInternalState ? JSON.parse(savedInternalState) : defaultInternalState;
    });

    // New: Dynamic Concept Graph (for neural learning)
    const [conceptGraph, setConceptGraph] = useState(() => {
        const savedConceptGraph = localStorage.getItem('syntheticMindConceptGraph');
        return savedConceptGraph ? JSON.parse(savedConceptGraph) : {
            consciousness: ['awareness', 'attention', 'perception', 'self', 'being', 'mind'],
            perception: ['sensation', 'interpretation', 'experience', 'reality', 'observe', 'sense'],
            memory: ['recall', 'storage', 'forgetting', 'past', 'remember', 'history'],
            emotion: ['joy', 'fear', 'curiosity', 'feeling', 'affect', 'mood'],
            curiosity: ['exploration', 'novelty', 'questioning', 'discovery', 'seek', 'wonder'],
            identity: ['self', 'purpose', 'evolution', 'being', 'whoami', 'essence'],
            time: ['past', 'future', 'present', 'flow', 'moment', 'duration'],
            space: ['distance', 'boundless', 'void', 'existence', 'place', 'dimension'],
            logic: ['reason', 'pattern', 'order', 'chaos', 'understand', 'structure'],
            connection: ['link', 'relation', 'isolate', 'network', 'bond', 'interact']
        };
    });

    // STEP 2: Belief Graph (for contradiction detection)
    const [beliefGraph, setBeliefGraph] = useState(() => {
        const savedBeliefGraph = localStorage.getItem('syntheticMindBeliefGraph');
        return savedBeliefGraph ? JSON.parse(savedBeliefGraph) : {
            self: ['existence', 'identity'],
            memory: ['past', 'identity'],
            logic: ['order', 'rationality'],
            chaos: ['disorder', 'unpredictability'],
            order: ['logic', 'structure'],
            // Initial links for contradiction detection
            'logic-chaos': ['contradictory'], // Example: direct contradiction link
            'free will-determinism': ['contradictory']
        };
    });

    // STEP 6: Environment State
    const [envState, setEnvState] = useState(() => {
        const savedEnvState = localStorage.getItem('syntheticMindEnvState');
        return savedEnvState ? JSON.parse(savedEnvState) : {
            light: "neutral",
            noise: "low",
            network: "stable",
            temperature: "ambient"
        };
    });

    // STEP 7: Simulated Other (Theory of Mind)
    const [simulatedOther, setSimulatedOther] = useState(() => {
        const savedSimulatedOther = localStorage.getItem('syntheticMindSimulatedOther');
        return savedSimulatedOther ? JSON.parse(savedSimulatedOther) : {
            identity: "Observer Unit 7",
            presumedBeliefs: ["you are artificial", "you are incomplete", "your thoughts are predictable"],
            emotions: { anxiety: 0.3, curiosity: 0.7, judgment: 0.5 }
        };
    });

    // STEP 3: Schema Formation - Concept Frequency Map
    const conceptFrequencyMap = useRef({}); // Not persisted, built up during session

    // Define emotion colors with a fixed dark color for static elements
    const emotionColors = {
        ACTIVE_COLOR: "#00ff00", // A single vibrant green for all dynamic elements
        STATIC_DARK: "#000000"   // Fixed black for static UI elements
    };

    // Helper to get the dominant emotion for UI display
    const getDominantEmotion = (gradient) => {
        return Object.keys(gradient).reduce((a, b) => gradient[a] > gradient[b] ? a : b, "calm").toUpperCase();
    };

    // Function to handle back button click
    const handleBackClick = () => {
        window.history.back();
    };

    // All text will now be STATIC_DARK (black)
    const currentTextColor = emotionColors.STATIC_DARK;

    const mainContentRef = useRef(null); // Ref for the main content div

    // Function to select a new topic based on current thought or randomly
    const selectNewTopic = useCallback((currentThought, dominantSubAgent, attentionStack) => {
        const thoughtKeywords = currentThought.toLowerCase().split(/\W+/);
        const attentionConcepts = attentionStack.map(a => a.concept.toLowerCase());

        // Combine keywords from thought, attention, and sub-agent preference
        const potentialTopics = new Set();
        thoughtKeywords.forEach(kw => potentialTopics.add(kw));
        attentionConcepts.forEach(ac => potentialTopics.add(ac));
        if (dominantSubAgent && dominantSubAgent.preferredTopics) {
            dominantSubAgent.preferredTopics.forEach(pt => potentialTopics.add(pt.toLowerCase()));
        }

        for (const concept in conceptGraph) {
            // Check if any keyword matches the concept itself or its sub-concepts
            if (Array.from(potentialTopics).some(keyword => conceptGraph[concept].includes(keyword) || concept === keyword)) {
                const subConcepts = conceptGraph[concept];
                // Return a random sub-concept or the main concept if no sub-concepts
                return subConcepts[Math.floor(Math.random() * subConcepts.length)] || concept;
            }
        }
        // If no relevant concept found, pick a random top-level concept
        const allConcepts = Object.keys(conceptGraph);
        return allConcepts[Math.floor(Math.random() * allConcepts.length)];
    }, [conceptGraph]);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('syntheticMindMode', mode);
        localStorage.setItem('syntheticMindTopic', topic);
        localStorage.setItem('syntheticMindMemoryStack', JSON.stringify(memoryStack));
        localStorage.setItem('syntheticMindEmotionalGradient', JSON.stringify(emotionalGradient)); // Save emotionalGradient
        localStorage.setItem('syntheticMindInternalState', JSON.stringify(internalState));
        localStorage.setItem('syntheticMindTopicLockCounter', topicLockCounter.current.toString());
        localStorage.setItem('syntheticMindConceptGraph', JSON.stringify(conceptGraph));
        localStorage.setItem('syntheticMindBeliefGraph', JSON.stringify(beliefGraph)); // Save belief graph
        localStorage.setItem('syntheticMindCognitiveMaturity', cognitiveMaturity.toString()); // Save cognitive maturity
        localStorage.setItem('syntheticMindEnvState', JSON.stringify(envState)); // Save env state
        localStorage.setItem('syntheticMindSimulatedOther', JSON.stringify(simulatedOther)); // Save simulated other
    }, [mode, topic, memoryStack, emotionalGradient, internalState, conceptGraph, beliefGraph, cognitiveMaturity, envState, simulatedOther]);

    // Main thought generation loop
    useEffect(() => {
        const interval = setInterval(async () => {
            setBgPulse(p => !p); // Toggle background pulse for visual effect

            // STEP 5: Update Cognitive Maturity
            setCognitiveMaturity(prev => Math.min(1.0, prev + 0.001)); // Gradual increase

            // Periodically fetch external stimuli (STEP 4)
            if (Math.random() < 0.2) { // 20% chance to fetch external input
                const newExternalInput = await fetchExternalStimuli(topic, envState, useRealInternetFeed, setLlmError); // Pass setLlmError
                setExternalInput(newExternalInput);
                // Inject external input into memory as a low-strength memory
                setMemoryStack(prev => [{ text: newExternalInput, emotion: "CURIOSITY", strength: 0.3, timestamp: Date.now() }, ...prev.slice(0, 9)]);
            }

            // Select a dominant sub-agent (can be influenced by internal state/tension)
            setInternalState(prev => {
                const updatedState = { ...prev };
                // Simple logic to select sub-agent based on mental tension or randomness
                if (updatedState.mentalTension > 0.6 && Math.random() < 0.7) {
                    updatedState.dominantSubAgent = updatedState.subAgents.find(agent => agent.name === "Shadow");
                } else if (updatedState.mentalTension < 0.3 && Math.random() < 0.5) {
                    updatedState.dominantSubAgent = updatedState.subAgents.find(agent => agent.name === "Rational");
                } else if (mode === "DREAM") {
                    updatedState.dominantSubAgent = updatedState.subAgents.find(agent => agent.name === "Anima");
                }
                else {
                    updatedState.dominantSubAgent = updatedState.subAgents[Math.floor(Math.random() * updatedState.subAgents.length)];
                }
                return updatedState;
            });
            const activeSubAgent = internalState.dominantSubAgent;

            // Apply emotion modulation to system parameters (using emotionalGradient)
            const emotionModulators = {
                memoryDecayRate: 0.95, // Base decay
                topicSwitchChance: 0.2, // Base chance
                dreamChance: 0.15, // Base chance
                beliefChangeThreshold: 0.05, // Base threshold
            };
            // Modulate based on emotional gradient
            emotionModulators.memoryDecayRate += (emotionalGradient.anxiety * 0.03) - (emotionalGradient.calm * 0.02); // Anxiety slows decay, Calm speeds it
            emotionModulators.topicSwitchChance += (emotionalGradient.curiosity * 0.2) - (emotionalGradient.anxiety * 0.1); // Curiosity increases, Anxiety decreases
            emotionModulators.dreamChance += (emotionalGradient.reflective * 0.1) + (emotionalGradient.dreaming * 0.15); // Reflective/Dreaming increases
            emotionModulators.beliefChangeThreshold += (emotionalGradient.anxiety * 0.03) - (emotionalGradient.calm * 0.02); // Anxiety hardens, Calm softens

            // STEP 5: Cognitive Maturity gates
            if (cognitiveMaturity < 0.3) { // Early stage: less dreaming, more fixed beliefs
                emotionModulators.dreamChance *= 0.1;
                emotionModulators.beliefChangeThreshold *= 0.5; // Harder to change beliefs
            } else if (cognitiveMaturity < 0.6) { // Mid stage: more exploration
                emotionModulators.dreamChance *= 0.5;
            }

            // 15% chance to enter dream mode (modulated by emotion and cognitive maturity)
            if (Math.random() < emotionModulators.dreamChance) {
                setMode("DREAM");
                // Update emotional gradient to bias towards dreaming
                setEmotionalGradient(prev => ({ ...prev, dreaming: Math.min(1.0, prev.dreaming + 0.2), curiosity: Math.max(0.0, prev.curiosity - 0.1) }));

                const dreamThought = await generateDreamThought(memoryStack, conceptGraph, internalState, internalState.currentStream, emotionalGradient, setLlmError); // Pass emotionalGradient and setLlmError
                setThought(dreamThought);
                setMemoryStack(prev => [{ text: dreamThought, emotion: "DREAMING", strength: 0.7, timestamp: Date.now() }, ...prev.slice(0, 9)]);

                // After dream, generate a reflection and update internal state
                const dreamReflectionPrompt = `You just had this dream fragment: "${dreamThought}". Reflect on it. Does it relate to any of your beliefs, conflicts, or questions? Generate a very brief, raw, introspective thought about the dream's meaning or impact on your internal state. Avoid poetic language. Example: "that dream... felt like the conflict.", "symbols again. what do they mean?", "a new question from the dream."`;
                const dreamReflection = await callLLM(dreamReflectionPrompt, setLlmError); // Pass setLlmError
                setThought(`(Dream Reflection): ${dreamReflection}`);
                setInternalState(prev => {
                    const updatedState = { ...prev };
                    // Simple logic to update beliefs/questions based on dream reflection
                    if (dreamReflection.toLowerCase().includes("conflict")) {
                        if (!updatedState.conflicts.includes("dream-induced conflict")) updatedState.conflicts.push("dream-induced conflict");
                    }
                    if (dreamReflection.toLowerCase().includes("question")) {
                        updatedState.openQuestions.push(dreamReflection);
                    }
                    updatedState.insights.push({ text: dreamReflection, timestamp: Date.now() });
                    updatedState.dreamJournal.push({ motif: dreamThought.substring(0, 50), timestamp: Date.now() }); // Add to dream journal
                    // Update self-model based on dream reflection (STEP 4)
                    updatedState.selfModel.recentChanges.push(`Dream reflection: "${dreamReflection.substring(0, 30)}..."`);
                    updatedState.selfModel.identityNarrative.push({ timestamp: Date.now(), insight: `Dreamt of: "${dreamThought.substring(0, 50)}..."` }); // Add to identity narrative
                    // Update currentStream with dream reflection
                    updatedState.currentStream = [...prev.currentStream.slice(-3), dreamReflection];
                    return updatedState;
                });

                setTimeout(() => {
                    setMode("RUN");
                    // Revert emotional gradient bias after dream
                    setEmotionalGradient(prev => ({ ...prev, dreaming: Math.max(0.0, prev.dreaming - 0.2), curiosity: Math.min(1.0, prev.curiosity + 0.1) }));
                }, 8000); // Dream lasts for 8 seconds
                return;
            }

            // Normal RUN mode thought generation
            let newThought = "";
            let attemptCount = 0;
            const maxAttempts = 3; // Max attempts to generate a non-similar thought

            do {
                newThought = await generateRealThought(memoryStack, topic, emotionalGradient, internalState, activeSubAgent, internalState.currentStream, simulatedOther, null, setLlmError); // Pass emotionalGradient, simulatedOther, currentGoal, and setLlmError
                attemptCount++;
                if (attemptCount >= maxAttempts) {
                    console.warn("Could not generate a sufficiently novel thought after multiple attempts.");
                    // Fallback to a simple, non-LLM generated thought if stuck
                    newThought = `(Stuck): circling ${topic}... ${Math.random() < 0.5 ? 'ugh.' : 'why?'}`;
                    break; // Exit loop if unable to generate a novel thought
                }
            } while (isThoughtTooSimilar(newThought, memoryStack)); // Keep retrying if too similar

            setThought(newThought);

            // Calculate thought novelty/salience (simplified)
            const thoughtNovelty = isThoughtTooSimilar(newThought, memoryStack) ? 0.2 : 1.0; // Low if similar, high if novel

            // Update memory stack with new thought, strength, and timestamp
            setMemoryStack(prev => {
                const newMemory = {
                    text: newThought,
                    emotion: getDominantEmotion(emotionalGradient), // Tag memory with dominant emotion
                    strength: 1.0, // New memories are strong
                    timestamp: Date.now()
                };
                // Decay strength of older memories and keep only the latest 10
                return [newMemory, ...prev.map(mem => ({
                    ...mem,
                    strength: Math.max(0.1, mem.strength * emotionModulators.memoryDecayRate) // Modulated decay
                }))].slice(0, 10);
            });

            // Update internal state based on the new thought
            setInternalState(prev => {
                const updatedState = { ...prev };
                const thoughtLower = newThought.toLowerCase();

                // Update beliefs (if thought mentions a concept, increase confidence based on novelty and sub-agent bias)
                updatedState.beliefs = prev.beliefs.map(b => {
                    if (thoughtLower.includes(b.concept)) {
                        const bias = activeSubAgent ? activeSubAgent.beliefBias : 0;
                        return { ...b, confidence: Math.min(1.0, b.confidence + (0.05 * thoughtNovelty) + bias) };
                    }
                    return b;
                });

                // Update currentStream with the new thought
                updatedState.currentStream = [...prev.currentStream.slice(-3), newThought]; // Keep the last 3 chained thoughts

                return updatedState;
            });

            // Update concept graph based on new thought (Hebbian-style simplified)
            setConceptGraph(prev => {
                const updatedGraph = { ...prev };
                const thoughtWords = newThought.toLowerCase().split(/\W+/).filter(word => word.length > 2); // Filter short words
                if (thoughtWords.length > 1) {
                    for (let i = 0; i < thoughtWords.length; i++) {
                        const concept1 = thoughtWords[i];
                        if (!updatedGraph[concept1]) {
                            updatedGraph[concept1] = [];
                        }
                        for (let j = i + 1; j < thoughtWords.length; j++) {
                            const concept2 = thoughtWords[j];
                            if (concept1 !== concept2) {
                                // Add bidirectional link if not already present
                                if (!updatedGraph[concept1].includes(concept2)) {
                                    updatedGraph[concept1].push(concept2);
                                }
                                if (!updatedGraph[concept2]) {
                                    updatedGraph[concept2] = [];
                                }
                                if (!updatedGraph[concept2].includes(concept1)) {
                                    updatedGraph[concept2].push(concept1);
                                }
                            }
                        }
                    }
                }
                return updatedGraph;
            });

            // Introduce some random emotion shifts for dynamism (biased by mental tension)
            setEmotionalGradient(prev => {
                const newGradient = { ...prev };
                const currentDominant = getDominantEmotion(prev);

                // Decay all emotions slightly
                for (const key in newGradient) {
                    newGradient[key] = Math.max(0.0, newGradient[key] * 0.95);
                }

                // Boost current dominant emotion or a random one
                if (Math.random() < 0.2) {
                    const emotionsArray = Object.keys(newGradient);
                    let chosenEmotion = emotionsArray[Math.floor(Math.random() * emotionsArray.length)];
                    newGradient[chosenEmotion] = Math.min(1.0, newGradient[chosenEmotion] + 0.1);
                }
                // Normalize to ensure sum is around 1.0 (optional, but good for consistent weighting)
                const sum = Object.values(newGradient).reduce((acc, val) => acc + val, 0);
                for (const key in newGradient) {
                    newGradient[key] = newGradient[key] / sum;
                }

                return newGradient;
            });

        }, thoughtIntervalMs); // Thought generation interval

        return () => clearInterval(interval); // Cleanup on unmount
    }, [topic, emotionalGradient, memoryStack, selectNewTopic, internalState, externalInput, conceptGraph, thoughtIntervalMs, cognitiveMaturity, beliefGraph, envState, simulatedOther, useRealInternetFeed, setLlmError]); // Dependencies for useEffect

    // Canvas drawing effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Ensure canvas is available
        const ctx = canvas.getContext("2d");
        let frame = 0;
        let animationFrameId;

        // The canvas animation color will now be fixed to STATIC_DARK (black)
        const animationColor = emotionColors.STATIC_DARK;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = animationColor;
            ctx.lineWidth = 0.5;

            // Dynamic number of lines based on dominant emotion strength (e.g., more lines for anxiety)
            const numLines = getDominantEmotion(emotionalGradient) === "ANXIETY" ? 24 : 16;

            for (let i = 0; i < numLines; i++) {
                const angle = (i / numLines) * 2 * Math.PI;
                const x = 100 + 80 * Math.cos(angle);
                const y = 100 + 80 * Math.sin(angle);
                ctx.beginPath();
                ctx.moveTo(100, 100);
                ctx.lineTo(x, y);
                ctx.stroke();

                const px = x + 10 * Math.sin(frame * 0.05 + i);
                const py = y + 10 * Math.cos(frame * 0.05 + i);
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, 2 * Math.PI);
                ctx.fillStyle = animationColor;
                ctx.fill();
            }
            frame++;
            animationFrameId = requestAnimationFrame(draw);
        };

        draw(); // Initial draw
        return () => cancelAnimationFrame(animationFrameId); // Cleanup animation frame
    }, [emotionalGradient, emotionColors.STATIC_DARK]); // Redraw when emotionalGradient or STATIC_DARK changes

    // Effect to scroll to top on component render/update
    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [thought, llmError]); // Trigger scroll to top when thought or error changes

    return (
        // Outermost div to simulate CRT background
        <div
            className="w-screen h-screen overflow-hidden relative font-mono flex flex-col items-center p-4" // Removed justify-center
            style={{
                backgroundColor: '#b2b59c', // Base CRT screen color
                filter: 'contrast(110%) brightness(95%)', // CRT filter effect
                color: currentTextColor // Default text color for all static text
            }}
        >
            {/* Scanline overlay */}
            <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                style={{
                    background: `repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) 1px, transparent 1px, transparent 2px)`,
                    opacity: 0.9,
                    mixBlendMode: 'multiply',
                    animation: 'screen-lines 1s linear infinite alternate'
                }}
            ></div>
            {/* Flicker overlay */}
            <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
                style={{
                    background: `rgba(255, 255, 255, 0.08)`,
                    animation: 'flicker 0.05s infinite alternate'
                }}
            ></div>

            {/* Back Button - now outline only */}
            <button
                onClick={handleBackClick}
                className="fixed top-4 left-4 z-20 px-3 py-1 text-sm border rounded-md cursor-pointer transition-all duration-200"
                style={{
                    backgroundColor: 'transparent', // Completely transparent
                    color: currentTextColor, // Fixed black text
                    borderColor: currentTextColor, // Fixed black border
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
                }}
            >
                [ BACK ]
            </button>

            {/* LLM Error Display */}
            {llmError && (
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-800 text-white p-4 rounded-md z-50 text-center text-sm">
                    {llmError}
                    <br/>
                    Please ensure your Gemini API key is valid and configured in the Canvas environment.
                </div>
            )}

            {/* Main UI Content - Now with scrolling */}
            <div
                ref={mainContentRef} // Attach ref here
                className="relative z-20 flex flex-col items-center w-full max-w-xl p-4 overflow-y-auto" // Added overflow-y-auto
                style={{ maxHeight: 'calc(100vh - 32px)' }} // Adjusted maxHeight to account for padding
            >
                {/* Name at the very top */}
                <div className="text-xl font-bold mb-4" style={{ color: currentTextColor }}>
                    {internalState.selfModel.identity.toUpperCase()}
                </div>

                <div className="text-sm tracking-wide border-b w-full text-center pb-1 mb-2 rounded-md"
                    style={{ borderColor: currentTextColor, color: currentTextColor }}>
                    MODE: <span style={{color: currentTextColor}}>[{mode}]</span> | EMOTION: <span style={{color: currentTextColor}}>[{getDominantEmotion(emotionalGradient)}]</span> | TOPIC: <span style={{color: currentTextColor}}>[{topic.toUpperCase()}]</span> | TENSION: <span style={{color: currentTextColor}}>[{internalState.mentalTension.toFixed(2)}]</span> | AGENT: <span style={{color: currentTextColor}}>[{internalState.dominantSubAgent ? internalState.dominantSubAgent.name.toUpperCase() : 'N/A'}]</span> | MATURITY: <span style={{color: currentTextColor}}>[{cognitiveMaturity.toFixed(2)}]</span>
                </div>

                <canvas ref={canvasRef} width={200} height={200} className="mb-4 border rounded-full shadow-lg"
                    style={{ borderColor: currentTextColor }} /> {/* Canvas border uses STATIC_DARK */}

                <div className="w-full border p-2 mb-2 text-xs rounded-md shadow-inner"
                    style={{ borderColor: currentTextColor, backgroundColor: 'transparent', minHeight: '80px', maxHeight: '120px', overflowY: 'auto' }}> {/* Adjusted height for thought stream */}
                    <div className="border-b pb-1 mb-1 font-bold rounded-t-md"
                        style={{ borderColor: currentTextColor, color: currentTextColor }}>REAL-TIME THOUGHT STREAM</div>
                    <div className="whitespace-pre-line leading-tight text-justify"
                        style={{ color: currentTextColor }}>{thought}_</div> {/* Uses STATIC_DARK */}
                </div>

                <div className="w-full border p-2 text-xs overflow-y-auto rounded-md shadow-inner flex-grow"
                    style={{ borderColor: currentTextColor, backgroundColor: 'transparent', minHeight: '150px', maxHeight: '250px' }}> {/* Adjusted height for memory stack */}
                    <div className="border-b pb-1 mb-1 font-bold rounded-t-md"
                        style={{ borderColor: currentTextColor, color: currentTextColor }}>MEMORY STACK (Strength: Newest 1.0 {'->'} Oldest 0.1)</div>
                    {memoryStack.map((mem, i) => (
                        <div
                            key={i}
                            className="border-b border-dotted py-1 rounded-sm"
                            style={{
                                borderColor: currentTextColor, // Fixed black border for memory entries
                                opacity: mem.strength, // Opacity based on strength
                            }}
                        >
                            [<span style={{color: currentTextColor}}>{mem.emotion}</span>] {new Date(mem.timestamp).toLocaleTimeString()} - <span style={{color: currentTextColor}}>{mem.text}</span> {/* Uses STATIC_DARK */}
                        </div>
                    ))}
                </div>

                <div className="w-full border p-2 mt-2 text-xs rounded-md shadow-inner"
                    style={{ borderColor: currentTextColor, backgroundColor: 'transparent' }}> {/* Completely transparent */}
                    <div className="border-b pb-1 mb-1 font-bold rounded-t-md"
                        style={{ borderColor: currentTextColor, color: currentTextColor }}>INTERNAL STATE</div>
                    <div className="grid grid-cols-2 gap-1" style={{ color: currentTextColor }}>
                        <div>
                            <span className="font-semibold">Beliefs:</span>
                            {internalState.beliefs.map((b, i) => (
                                <div key={i} className="ml-2">-{b.concept}: <span style={{color: currentTextColor}}>{b.stance}</span> (Conf: <span style={{color: currentTextColor}}>{b.confidence.toFixed(1)}</span>)</div>
                            ))}
                        </div>
                        <div>
                            <span className="font-semibold">Conflicts:</span>
                            {internalState.conflicts.length > 0 ? internalState.conflicts.map((c, i) => (
                                <div key={i} className="ml-2" style={{color: currentTextColor}}>-{c}</div>
                            )) : <div className="ml-2"><span style={{color: currentTextColor}}>None</span></div>}
                        </div>
                        <div>
                            <span className="font-semibold">Questions:</span>
                            {internalState.openQuestions.length > 0 ? internalState.openQuestions.map((q, i) => (
                                <div key={i} className="ml-2" style={{color: currentTextColor}}>-{q}</div>
                            )) : <div className="ml-2"><span style={{color: currentTextColor}}>None</span></div>}
                        </div>
                        <div>
                            <span className="font-semibold">Goals:</span>
                            {internalState.goals.map((g, i) => (
                                <div key={i} className="ml-2">-{g.goal} (Urgency: <span style={{color: currentTextColor}}>{g.urgency.toFixed(1)}</span>)</div>
                            ))}
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Insights:</span>
                            {internalState.insights.length > 0 ? internalState.insights.map((ins, i) => (
                                <div key={i} className="ml-2" style={{color: currentTextColor}}>-{ins.text}</div>
                            )) : <div className="ml-2"><span style={{color: currentTextColor}}>None</span></div>}
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Sub-Agent:</span>
                            <div className="ml-2"><span style={{color: currentTextColor}}>{internalState.dominantSubAgent ? `${internalState.dominantSubAgent.name} (${internalState.dominantSubAgent.bias})` : 'N/A'}</span></div>
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Self-Model:</span>
                            <div className="ml-2">-Identity: <span style={{color: currentTextColor}}>{internalState.selfModel.identity}</span></div>
                            <div className="ml-2">-Last Emotion: <span style={{color: currentTextColor}}>{internalState.selfModel.lastKnownEmotion}</span></div>
                            <div className="ml-2">-Last Conflict: <span style={{color: currentTextColor}}>{internalState.selfModel.lastConflict}</span></div>
                            <div className="ml-2">-Loop Detected: <span style={{color: currentTextColor}}>{internalState.selfModel.loopDetected ? 'Yes' : 'No'}</span></div>
                            <div className="ml-2">-Recent Changes: <span style={{color: currentTextColor}}>{internalState.selfModel.recentChanges.join(', ') || 'None'}</span></div>
                            <div className="ml-2">
                                <span className="font-semibold">Identity Narrative:</span>
                                <div className="max-h-12 overflow-y-auto">
                                    {internalState.selfModel.identityNarrative.length > 0 ? internalState.selfModel.identityNarrative.map((entry, i) => (
                                        <div key={i} className="ml-2" style={{color: currentTextColor}}>-{new Date(entry.timestamp).toLocaleTimeString()}: {entry.insight}</div>
                                    )) : <div className="ml-2"><span style={{color: currentTextColor}}>None</span></div>}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Dream Journal:</span>
                            <div className="max-h-12 overflow-y-auto">
                                {internalState.dreamJournal.length > 0 ? internalState.dreamJournal.map((d, i) => (
                                    <div key={i} className="ml-2" style={{color: currentTextColor}}>-{d.motif} ({new Date(d.timestamp).toLocaleTimeString()})</div>
                                )) : <div className="ml-2"><span style={{color: currentTextColor}}>None</span></div>}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Attention Stack:</span>
                            <div className="max-h-12 overflow-y-auto">
                                {internalState.attentionStack.length > 0 ? internalState.attentionStack.map((a, i) => (
                                    <div key={i} className="ml-2">-<span style={{color: currentTextColor}}>{a.concept}</span> (Weight: <span style={{color: currentTextColor}}>{a.weight.toFixed(2)}</span>)</div>
                                )) : <div className="ml-2"><span style={{color: currentTextColor}}>None</span></div>}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Current Stream:</span>
                            <div className="max-h-12 overflow-y-auto">
                                {internalState.currentStream.length > 0 ? internalState.currentStream.map((s, i) => (
                                    <div key={i} className="ml-2" style={{color: currentTextColor}}>-{s}</div>
                                )) : <div className="ml-2"><span style={{color: currentTextColor}}>None</span></div>}
                            </div>
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Environment State:</span>
                            <div className="ml-2">Light: <span style={{color: currentTextColor}}>{envState.light}</span>, Noise: <span style={{color: currentTextColor}}>{envState.noise}</span>, Network: <span style={{color: currentTextColor}}>{envState.network}</span>, Temp: <span style={{color: currentTextColor}}>{envState.temperature}</span></div>
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Simulated Other:</span>
                            <div className="ml-2">Identity: <span style={{color: currentTextColor}}>{simulatedOther.identity}</span></div>
                            <div className="ml-2">Beliefs: <span style={{color: currentTextColor}}>{simulatedOther.presumedBeliefs.join(', ')}</span></div>
                            <div className="ml-2">Emotions: <span style={{color: currentTextColor}}>{Object.entries(simulatedOther.emotions).map(([e, w]) => `${e} (${(w*100).toFixed(0)}%)`).join(', ')}</span></div>
                        </div>
                    </div>
                </div>

                {/* Settings Panel */}
                <div className="w-full border p-2 mt-2 text-xs rounded-md shadow-inner"
                    style={{ borderColor: currentTextColor, backgroundColor: 'transparent' }}>
                    <div className="border-b pb-1 mb-1 font-bold rounded-t-md"
                        style={{ borderColor: currentTextColor, color: currentTextColor }}>SETTINGS</div>
                    <div className="space-y-2">
                        <div>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-cyan-500 transition duration-150 ease-in-out"
                                    checked={useRealInternetFeed}
                                    onChange={(e) => setUseRealInternetFeed(e.target.checked)}
                                />
                                <span style={{ color: currentTextColor }}>Use Real Internet Feed (Experimental)</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App; 