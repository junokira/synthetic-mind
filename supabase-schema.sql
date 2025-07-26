-- Synthetic Mind Database Schema (Fixed)
-- Run this in your Supabase SQL editor

-- Create tables for synthetic mind data

-- Memories table
CREATE TABLE IF NOT EXISTS memories (
    id BIGSERIAL PRIMARY KEY,
    thought TEXT NOT NULL,
    emotion VARCHAR(50) NOT NULL,
    strength DECIMAL(3,2) DEFAULT 1.0,
    topic VARCHAR(100),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    session_id VARCHAR(100),
    mode VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Emotional states table
CREATE TABLE IF NOT EXISTS emotional_states (
    id BIGSERIAL PRIMARY KEY,
    emotional_gradient JSONB NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Internal states table
CREATE TABLE IF NOT EXISTS internal_states (
    id BIGSERIAL PRIMARY KEY,
    beliefs JSONB,
    conflicts JSONB,
    open_questions JSONB,
    goals JSONB,
    mental_tension DECIMAL(3,2),
    insights JSONB,
    sub_agents JSONB,
    self_model JSONB,
    dream_journal JSONB,
    attention_stack JSONB,
    current_stream JSONB,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Concept graphs table
CREATE TABLE IF NOT EXISTS concept_graphs (
    id BIGSERIAL PRIMARY KEY,
    concepts JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
    id BIGSERIAL PRIMARY KEY,
    session_start TIMESTAMPTZ NOT NULL,
    total_thoughts INTEGER DEFAULT 0,
    unique_topics JSONB,
    emotional_journey JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Identities table
CREATE TABLE IF NOT EXISTS identities (
    id BIGSERIAL PRIMARY KEY,
    personality JSONB,
    core_values JSONB,
    interests JSONB,
    communication_style VARCHAR(50),
    confidence_level DECIMAL(3,2),
    self_awareness DECIMAL(3,2),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meta-cognition table
CREATE TABLE IF NOT EXISTS meta_cognition (
    id BIGSERIAL PRIMARY KEY,
    thinking_patterns JSONB,
    success_rate DECIMAL(3,2),
    learning_speed DECIMAL(3,2),
    creativity_level DECIMAL(3,2),
    focus_ability DECIMAL(3,2),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Growth states table
CREATE TABLE IF NOT EXISTS growth_states (
    id BIGSERIAL PRIMARY KEY,
    wisdom DECIMAL(3,2),
    maturity DECIMAL(3,2),
    perspective_shifts JSONB,
    insights JSONB,
    life_lessons JSONB,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_memories_timestamp ON memories(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_memories_session_id ON memories(session_id);
CREATE INDEX IF NOT EXISTS idx_emotional_states_timestamp ON emotional_states(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_internal_states_timestamp ON internal_states(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_session_start ON sessions(session_start DESC);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotional_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_graphs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE identities ENABLE ROW LEVEL SECURITY;
ALTER TABLE meta_cognition ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_states ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
-- In production, you'd want more restrictive policies

-- Memories policies
CREATE POLICY "Allow public read access to memories" ON memories
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to memories" ON memories
    FOR INSERT WITH CHECK (true);

-- Emotional states policies
CREATE POLICY "Allow public read access to emotional_states" ON emotional_states
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to emotional_states" ON emotional_states
    FOR INSERT WITH CHECK (true);

-- Internal states policies
CREATE POLICY "Allow public read access to internal_states" ON internal_states
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to internal_states" ON internal_states
    FOR INSERT WITH CHECK (true);

-- Concept graphs policies
CREATE POLICY "Allow public read access to concept_graphs" ON concept_graphs
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to concept_graphs" ON concept_graphs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to concept_graphs" ON concept_graphs
    FOR UPDATE USING (true);

-- Sessions policies
CREATE POLICY "Allow public read access to sessions" ON sessions
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to sessions" ON sessions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to sessions" ON sessions
    FOR UPDATE USING (true);

-- Identities policies
CREATE POLICY "Allow public read access to identities" ON identities
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to identities" ON identities
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to identities" ON identities
    FOR UPDATE USING (true);

-- Meta-cognition policies
CREATE POLICY "Allow public read access to meta_cognition" ON meta_cognition
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to meta_cognition" ON meta_cognition
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to meta_cognition" ON meta_cognition
    FOR UPDATE USING (true);

-- Growth states policies
CREATE POLICY "Allow public read access to growth_states" ON growth_states
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to growth_states" ON growth_states
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access to growth_states" ON growth_states
    FOR UPDATE USING (true); 