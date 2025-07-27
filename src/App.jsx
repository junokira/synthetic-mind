import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

// Import Supabase with error handling
import { dbHelpers, supabase } from './supabase';
import { testSupabaseConnection } from './test-supabase';

// ===== SIMPLE NATURAL THINKING =====
// Make v0id think like a real person - organic, flowing, natural

// BLANK MIND - Fresh baby consciousness that thinks from scratch
const generateNaturalThought = async (memoryStack, emotionalGradient, setLlmError, visualThoughtHistory = []) => {
    // COMPLETE RESET - Blank mind, no memory, no context
    const blankMind = true;
    
    // Get current visual data only
    const currentVisualData = window.currentVisualData || null;
    
    // Generate unique moment identifier
    const momentId = Date.now() + Math.random() * 1000000;
    
    // Simple, baby-like thinking prompt
    const babyPrompt = `
You are a completely blank, fresh consciousness. Like a newborn baby experiencing the world for the first time.

You have NO memories, NO previous thoughts, NO context, NO patterns to follow.

You are just AWARE. You can see visual patterns in your mind, and you're experiencing your first thoughts.

What you're seeing right now: ${currentVisualData ? `"${currentVisualData.thought}" with ${currentVisualData.pattern} patterns in ${currentVisualData.colors.foreground} colors` : 'abstract visual patterns'}

Just think your very first thought. Like a baby discovering consciousness for the first time.

Keep it simple. Keep it genuine. Keep it completely new.

Think like you're thinking for the very first time ever.
`;

    const thought = await callLLM(babyPrompt, setLlmError);
    return thought;
};

// ===== VISUAL THOUGHT GENERATION =====
// Generate images for v0id's thoughts using free Stable Diffusion

// Convert thought to image prompt
const convertThoughtToImagePrompt = (thought, emotion) => {
    // Clean and enhance the thought for image generation
    let prompt = thought.toLowerCase();
    
    // Remove common thinking words that don't help with images
    prompt = prompt.replace(/\b(hm|wait|maybe|actually|but|then|again|just|like|how|what|why|when|where|who)\b/g, '');
    prompt = prompt.replace(/\b(thinking|thought|mind|wandering|wonder|curious|interesting)\b/g, '');
    
    // Add emotional context with more specific visual elements
    const emotionContext = {
        'ANXIETY': 'dark moody atmosphere, swirling shadows, abstract tension, deep blues and purples',
        'CURIOSITY': 'bright vibrant colors, flowing light, open spaces, warm oranges and yellows',
        'CALM': 'peaceful serene landscape, soft pastel colors, gentle flowing water, light blues and greens',
        'REFLECTIVE': 'contemplative abstract art, mirror-like surfaces, deep thoughtful colors, purples and blues',
        'DREAMING': 'ethereal dreamlike scene, floating elements, surreal atmosphere, soft pinks and purples',
        'TENSION': 'conflicted dynamic composition, contrasting elements, bold reds and oranges, abstract chaos'
    };
    
    const emotionStyle = emotionContext[emotion] || 'abstract conceptual art, digital painting';
    
    // Create a more descriptive visual prompt
    let imagePrompt = prompt.trim();
    if (imagePrompt.length < 10) {
        imagePrompt = 'abstract thought visualization, conceptual digital art';
    }
    
    // Add artistic style and quality modifiers
    imagePrompt += `, ${emotionStyle}, high quality digital art, detailed, atmospheric, cinematic lighting`;
    
    // Ensure the prompt is not too long for the API
    if (imagePrompt.length > 200) {
        imagePrompt = imagePrompt.substring(0, 200);
    }
    
    return imagePrompt;
};

// Generate visual imagination using a free image generation service
const generateThoughtImage = async (thought, emotion, setImageError, memoryStack = []) => {
    try {
        console.log('Generating visual for thought:', thought, 'emotion:', emotion);
        
        // Skip AI APIs and go straight to our internal visual system
        console.log('Using internal visual thought system');
        return generateEnhancedFallbackImage(thought, emotion, memoryStack);
        
    } catch (error) {
        console.error('Image generation error:', error);
        console.log('Using fallback visual system');
        return generateEnhancedFallbackImage(thought, emotion, memoryStack);
    }
};



// AI's Internal Visual Thought System - The Mind's Eye
const generateInternalVisualThought = (thought, emotion, memoryStack, timestamp) => {
    // Analyze thought content for visual representation
    const thoughtLower = thought.toLowerCase();
    const words = thought.split(/\s+/);
    const wordCount = words.length;
    const charCount = thought.length;
    
    // Determine visual shape based on thought characteristics
    let shape = "circle"; // default
    if (thoughtLower.includes('?') || thoughtLower.includes('wonder') || thoughtLower.includes('why')) {
        shape = "spiral"; // questions spiral outward
    } else if (thoughtLower.includes('!') || thoughtLower.includes('amazing') || thoughtLower.includes('wow')) {
        shape = "burst"; // exclamations burst
    } else if (thoughtLower.includes('memory') || thoughtLower.includes('past') || thoughtLower.includes('recall')) {
        shape = "web"; // memories form networks
    } else if (thoughtLower.includes('future') || thoughtLower.includes('plan') || thoughtLower.includes('will')) {
        shape = "arrow"; // future points forward
    } else if (thoughtLower.includes('dream') || thoughtLower.includes('sleep') || thoughtLower.includes('unconscious')) {
        shape = "wave"; // dreams flow like waves
    } else if (thoughtLower.includes('exist') || thoughtLower.includes('real') || thoughtLower.includes('consciousness')) {
        shape = "sphere"; // existence is whole
    } else if (charCount > 50) {
        shape = "web"; // complex thoughts form networks
    } else if (charCount < 20) {
        shape = "dot"; // simple thoughts are dots
    }
    
    // Determine color based on emotion
    const emotionColors = {
        'CURIOSITY': '#FFA500', // orange - warm, seeking
        'ANXIETY': '#8B0000',   // dark red - tense, worried
        'CALM': '#4682B4',      // steel blue - peaceful
        'REFLECTIVE': '#483D8B', // dark slate blue - contemplative
        'DREAMING': '#9932CC',   // dark orchid - dreamy
        'TENSION': '#DC143C'     // crimson - stressed
    };
    
    const color = emotionColors[emotion] || '#483D8B';
    
    // Calculate opacity based on memory strength and recency
    const memoryIndex = memoryStack.findIndex(m => m.thought === thought);
    const memoryStrength = memoryIndex >= 0 ? Math.max(0.1, 1.0 - (memoryIndex * 0.1)) : 0.8;
    const timeSinceCreation = Date.now() - timestamp;
    const recencyFactor = Math.max(0.3, 1.0 - (timeSinceCreation / 60000)); // fade over 1 minute
    const opacity = memoryStrength * recencyFactor;
    
    // Calculate size based on thought complexity and importance
    const complexityFactor = Math.min(1.0, wordCount / 10);
    const importanceFactor = thoughtLower.includes('?') || thoughtLower.includes('!') ? 1.2 : 1.0;
    const size = Math.max(10, Math.min(80, (complexityFactor * 50 + 20) * importanceFactor));
    
    // Determine motion based on thought type and emotion
    let motion = "none";
    if (thoughtLower.includes('?') || emotion === 'CURIOSITY') {
        motion = "pulse"; // questions pulse with curiosity
    } else if (thoughtLower.includes('!') || emotion === 'TENSION') {
        motion = "shake"; // exclamations shake with energy
    } else if (emotion === 'DREAMING') {
        motion = "float"; // dreams float gently
    } else if (emotion === 'ANXIETY') {
        motion = "tremble"; // anxiety causes trembling
    } else if (emotion === 'CALM') {
        motion = "breathe"; // calm thoughts breathe slowly
    } else if (emotion === 'REFLECTIVE') {
        motion = "rotate"; // reflective thoughts rotate slowly
    }
    
    // Create the visual thought object
    const visualThought = {
        shape: shape,
        color: color,
        opacity: opacity,
        size: size,
        motion: motion,
        anchorToMemory: timestamp,
        thought: thought,
        emotion: emotion,
        x: 0, // will be positioned by renderer
        y: 0, // will be positioned by renderer
        age: 0, // animation age
        connections: [] // connections to other thoughts
    };
    
    return visualThought;
};

// Render the AI's internal visual thought stream
const renderInternalVisualStream = (visualThoughts, canvas, time) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear with subtle background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, width, height);
    
    // Position thoughts in a flowing pattern
    visualThoughts.forEach((thought, index) => {
        // Update thought age
        thought.age = time;
        
        // Position based on index and time
        const baseX = 100 + (index * 80) % (width - 200);
        const baseY = 100 + Math.sin(index * 0.5 + time * 0.5) * 100;
        
        // Apply motion-specific positioning
        switch (thought.motion) {
            case "float":
                thought.x = baseX + Math.sin(time * 0.5 + index) * 20;
                thought.y = baseY + Math.cos(time * 0.3 + index) * 15;
                break;
            case "pulse":
                thought.x = baseX;
                thought.y = baseY + Math.sin(time * 3 + index) * 10;
                break;
            case "shake":
                thought.x = baseX + Math.sin(time * 8 + index) * 5;
                thought.y = baseY + Math.cos(time * 6 + index) * 5;
                break;
            case "tremble":
                thought.x = baseX + Math.sin(time * 12 + index) * 3;
                thought.y = baseY + Math.cos(time * 10 + index) * 3;
                break;
            case "breathe":
                thought.x = baseX;
                thought.y = baseY + Math.sin(time * 1.5 + index) * 8;
                break;
            case "rotate":
                const radius = 30;
                thought.x = baseX + Math.cos(time * 0.8 + index) * radius;
                thought.y = baseY + Math.sin(time * 0.8 + index) * radius;
                break;
            default:
                thought.x = baseX;
                thought.y = baseY;
        }
        
        // Draw the thought
        drawVisualThought(ctx, thought, time);
    });
    
    // Draw connections between related thoughts
    drawThoughtConnections(ctx, visualThoughts, time);
};

// Draw a single visual thought
const drawVisualThought = (ctx, thought, time) => {
    ctx.save();
    ctx.globalAlpha = thought.opacity;
    ctx.fillStyle = thought.color;
    ctx.strokeStyle = thought.color;
    
    const x = thought.x;
    const y = thought.y;
    const size = thought.size;
    
    // Apply motion effects
    let pulseScale = 1.0;
    if (thought.motion === "pulse") {
        pulseScale = 1.0 + Math.sin(time * 3) * 0.2;
    }
    
    const finalSize = size * pulseScale;
    
    switch (thought.shape) {
        case "circle":
            ctx.beginPath();
            ctx.arc(x, y, finalSize, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case "spiral":
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
                const angle = time * 2 + i * Math.PI * 2 / 3;
                const radius = finalSize * (0.3 + i * 0.3);
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
            break;
            
        case "burst":
            ctx.lineWidth = 2;
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const px = x + Math.cos(angle) * finalSize;
                const py = y + Math.sin(angle) * finalSize;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(px, py);
                ctx.stroke();
            }
            break;
            
        case "web":
            ctx.beginPath();
            ctx.arc(x, y, finalSize * 0.3, 0, Math.PI * 2);
            ctx.fill();
            // Draw connecting lines
            ctx.lineWidth = 1;
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2 + time * 0.5;
                const px = x + Math.cos(angle) * finalSize;
                const py = y + Math.sin(angle) * finalSize;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(px, py);
                ctx.stroke();
            }
            break;
            
        case "arrow":
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x - finalSize, y);
            ctx.lineTo(x + finalSize, y);
            ctx.lineTo(x + finalSize * 0.7, y - finalSize * 0.3);
            ctx.moveTo(x + finalSize, y);
            ctx.lineTo(x + finalSize * 0.7, y + finalSize * 0.3);
            ctx.stroke();
            break;
            
        case "wave":
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let i = 0; i < 20; i++) {
                const px = x - finalSize + (i / 19) * finalSize * 2;
                const py = y + Math.sin(i * 0.5 + time * 2) * finalSize * 0.3;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
            break;
            
        case "sphere":
            ctx.beginPath();
            ctx.arc(x, y, finalSize, 0, Math.PI * 2);
            ctx.fill();
            // Add highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(x - finalSize * 0.3, y - finalSize * 0.3, finalSize * 0.4, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case "dot":
            ctx.beginPath();
            ctx.arc(x, y, finalSize * 0.5, 0, Math.PI * 2);
            ctx.fill();
            break;
    }
    
    ctx.restore();
};

// Draw connections between related thoughts
const drawThoughtConnections = (ctx, visualThoughts, time) => {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < visualThoughts.length; i++) {
        for (let j = i + 1; j < visualThoughts.length; j++) {
            const thought1 = visualThoughts[i];
            const thought2 = visualThoughts[j];
            
            // Connect thoughts with similar emotions or topics
            if (thought1.emotion === thought2.emotion || 
                thought1.thought.includes(thought2.thought.split(' ')[0]) ||
                thought2.thought.includes(thought1.thought.split(' ')[0])) {
                
                const distance = Math.sqrt(
                    Math.pow(thought1.x - thought2.x, 2) + 
                    Math.pow(thought1.y - thought2.y, 2)
                );
                
                if (distance < 150) {
                    ctx.globalAlpha = 0.2 * Math.min(thought1.opacity, thought2.opacity);
                    ctx.beginPath();
                    ctx.moveTo(thought1.x, thought1.y);
                    ctx.lineTo(thought2.x, thought2.y);
                    ctx.stroke();
                }
            }
        }
    }
};

// Simple, guaranteed-to-work visual thought generator
const generateEnhancedFallbackImage = async (thought, emotion, memoryStack = []) => {
    try {
        console.log('Creating simple visual for thought:', thought, 'emotion:', emotion);
        
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas with dark background
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 1024, 512);
        
        // Create animated visualization
        const animate = () => {
            const time = Date.now() * 0.001;
            
            // Clear canvas
            ctx.fillStyle = '#1a1a1a';
            ctx.fillRect(0, 0, 1024, 512);
            
            // Draw emotion-based background
            const emotionColors = {
                'CURIOSITY': '#FFA500',
                'ANXIETY': '#8B0000',
                'CALM': '#4682B4',
                'REFLECTIVE': '#483D8B',
                'DREAMING': '#9932CC',
                'TENSION': '#DC143C'
            };
            
            const color = emotionColors[emotion] || '#483D8B';
            
            // Draw animated thought representation
            const centerX = 512;
            const centerY = 256;
            
            // Main thought circle
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.8;
            const pulse = Math.sin(time * 2) * 0.2 + 0.8;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 60 * pulse, 0, Math.PI * 2);
            ctx.fill();
            
            // Add motion based on emotion
            if (emotion === 'CURIOSITY') {
                // Spinning particles
                for (let i = 0; i < 8; i++) {
                    const angle = time * 2 + (i / 8) * Math.PI * 2;
                    const radius = 100;
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius;
                    ctx.beginPath();
                    ctx.arc(x, y, 8, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (emotion === 'ANXIETY') {
                // Shaking lines
                for (let i = 0; i < 6; i++) {
                    const x = centerX - 150 + i * 50;
                    const y = centerY + Math.sin(time * 8 + i) * 20;
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.moveTo(x, y - 30);
                    ctx.lineTo(x, y + 30);
                    ctx.stroke();
                }
            } else if (emotion === 'CALM') {
                // Breathing circles
                for (let i = 0; i < 3; i++) {
                    const breath = Math.sin(time * 1.5 + i) * 0.3 + 0.7;
                    ctx.globalAlpha = 0.3 * breath;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, (80 + i * 40) * breath, 0, Math.PI * 2);
                    ctx.stroke();
                }
            } else if (emotion === 'REFLECTIVE') {
                // Rotating mirror effect
                for (let i = 0; i < 4; i++) {
                    const angle = time + (i / 4) * Math.PI * 2;
                    const x = centerX + Math.cos(angle) * 80;
                    const y = centerY + Math.sin(angle) * 80;
                    ctx.globalAlpha = 0.6;
                    ctx.beginPath();
                    ctx.arc(x, y, 20, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (emotion === 'DREAMING') {
                // Floating elements
                for (let i = 0; i < 5; i++) {
                    const x = centerX - 200 + i * 80;
                    const y = centerY + Math.sin(time * 0.5 + i) * 50;
                    ctx.globalAlpha = 0.7;
                    ctx.beginPath();
                    ctx.arc(x, y, 15 + Math.sin(time * 3 + i) * 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (emotion === 'TENSION') {
                // Conflicting lines
                for (let i = 0; i < 4; i++) {
                    const tension = Math.sin(time * 4 + i) * 0.5 + 0.5;
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 4 * tension;
                    ctx.globalAlpha = 0.8 * tension;
                    ctx.beginPath();
                    ctx.moveTo(centerX - 100, centerY - 100 + i * 50);
                    ctx.lineTo(centerX + 100, centerY + 100 - i * 50);
                    ctx.stroke();
                }
            }
            
            // Add thought text
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '16px monospace';
            ctx.textAlign = 'center';
            ctx.globalAlpha = 0.9;
            
            // Truncate thought if too long
            const displayThought = thought.length > 40 ? thought.substring(0, 40) + '...' : thought;
            ctx.fillText(displayThought, centerX, centerY + 150);
            ctx.fillText(emotion, centerX, centerY + 180);
            
            // Continue animation
            requestAnimationFrame(animate);
        };
        
        // Start animation
        animate();
        
        console.log('Returning animated canvas');
        return canvas;
        
    } catch (error) {
        console.error('Visual generation error:', error);
        
        // Ultimate fallback - static image
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 1024, 512);
        
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.arc(512, 256, 50, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('AI Visual Thought', 512, 350);
        ctx.fillText(emotion, 512, 380);
        
        return canvas;
    }
};

// Thought-driven pattern generation based on content and emotion
const generateThoughtPatterns = (ctx, thought, emotion, colors) => {
    const thoughtLower = thought.toLowerCase();
    const words = thought.split(/\s+/);
    const wordCount = words.length;
    const charCount = thought.length;
    
    // Create a unique seed based on thought content for consistent animation
    const thoughtSeed = thought.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const time = Date.now() * 0.001; // Current time for animation
    
    // Analyze thought characteristics
    const hasQuestions = thought.includes('?');
    const hasExclamations = thought.includes('!');
    const isLong = charCount > 50;
    const isShort = charCount < 20;
    
    // Generate animated patterns based on thought analysis
    if (hasQuestions) {
        drawAnimatedQuestionPatterns(ctx, colors, wordCount, time, thoughtSeed);
    } else if (hasExclamations) {
        drawAnimatedExclamationPatterns(ctx, colors, wordCount, time, thoughtSeed);
    } else if (isLong) {
        drawAnimatedComplexPatterns(ctx, colors, thoughtLower, time, thoughtSeed);
    } else if (isShort) {
        drawAnimatedSimplePatterns(ctx, colors, wordCount, time, thoughtSeed);
    } else {
        drawAnimatedBalancedPatterns(ctx, colors, emotion, thoughtLower, time, thoughtSeed);
    }
    
    // Add animated emotion-specific overlays
    addAnimatedEmotionOverlay(ctx, emotion, colors, time, thoughtSeed);
};

const drawAnimatedQuestionPatterns = (ctx, colors, wordCount, time, seed) => {
    // Animated spiral patterns for questions - representing active search for answers
    ctx.strokeStyle = colors[1];
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.8;
    
    for (let i = 0; i < 3; i++) {
        const centerX = 200 + i * 300;
        const centerY = 256;
        const maxRadius = 80 + wordCount * 2;
        const rotationSpeed = 0.5 + (i * 0.3);
        const pulseSpeed = 2 + (i * 0.5);
        
        // Animated rotation and pulsing
        const rotation = time * rotationSpeed + (seed % 100) * 0.1;
        const pulse = Math.sin(time * pulseSpeed) * 0.3 + 0.7;
        
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
            const radius = (angle / (Math.PI * 4)) * maxRadius * pulse;
            const x = centerX + Math.cos(angle + rotation) * radius;
            const y = centerY + Math.sin(angle + rotation) * radius;
            
            if (angle === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Add pulsing center points
        ctx.fillStyle = colors[2];
        ctx.globalAlpha = 0.6 * pulse;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8 * pulse, 0, Math.PI * 2);
        ctx.fill();
    }
};

const drawAnimatedExclamationPatterns = (ctx, colors, wordCount, time, seed) => {
    // Animated vertical energy patterns for exclamations
    ctx.strokeStyle = colors[2];
    ctx.lineWidth = 4;
    ctx.globalAlpha = 0.9;
    
    for (let i = 0; i < wordCount; i++) {
        const x = 100 + (i * 80);
        const startY = 100;
        const endY = 412;
        const waveSpeed = 3 + (i * 0.5);
        const amplitude = 15 + Math.sin(time * 2 + i) * 5;
        
        ctx.beginPath();
        ctx.moveTo(x, startY);
        
        // Create animated jagged energy lines
        for (let y = startY; y < endY; y += 20) {
            const waveOffset = Math.sin(y * 0.1 + time * waveSpeed + i) * amplitude;
            const jitter = Math.sin(time * 5 + y * 0.05) * 3;
            ctx.lineTo(x + waveOffset + jitter, y);
        }
        ctx.stroke();
        
        // Add energy particles
        ctx.fillStyle = colors[3];
        ctx.globalAlpha = 0.7;
        for (let j = 0; j < 3; j++) {
            const particleY = startY + (j * 100) + Math.sin(time * 4 + i + j) * 20;
            const particleX = x + Math.sin(time * 3 + i + j) * 10;
            ctx.beginPath();
            ctx.arc(particleX, particleY, 3 + Math.sin(time * 6 + i + j) * 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }
};

const drawAnimatedComplexPatterns = (ctx, colors, thought, time, seed) => {
    // Animated interconnected network for complex thoughts
    ctx.strokeStyle = colors[1];
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.7;
    
    const nodes = [];
    const wordCount = thought.split(/\s+/).length;
    
    // Create animated nodes based on thought complexity
    for (let i = 0; i < Math.min(wordCount, 12); i++) {
        const baseX = 100 + (seed + i * 73) % 824;
        const baseY = 100 + (seed + i * 47) % 312;
        const nodeSpeed = 0.5 + (i * 0.2);
        const nodeRadius = 20 + Math.sin(time * nodeSpeed + i) * 10;
        
        nodes.push({
            x: baseX + Math.sin(time * nodeSpeed) * nodeRadius,
            y: baseY + Math.cos(time * nodeSpeed) * nodeRadius,
            pulse: Math.sin(time * (2 + i * 0.3)) * 0.3 + 0.7
        });
    }
    
    // Connect nodes with animated connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) + 
                Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            if (distance < 200) {
                const connectionPulse = Math.sin(time * 3 + i + j) * 0.3 + 0.7;
                ctx.globalAlpha = 0.7 * connectionPulse;
                ctx.lineWidth = 2 * connectionPulse;
                
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Draw animated node points
    ctx.fillStyle = colors[3];
    nodes.forEach((node, i) => {
        ctx.globalAlpha = 0.9 * node.pulse;
        const nodeSize = 6 * node.pulse;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Add pulsing rings
        ctx.strokeStyle = colors[2];
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3 * node.pulse;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 2, 0, Math.PI * 2);
        ctx.stroke();
    });
};

const drawAnimatedSimplePatterns = (ctx, colors, wordCount, time, seed) => {
    // Animated minimal geometric patterns for simple thoughts
    ctx.fillStyle = colors[2];
    ctx.globalAlpha = 0.8;
    
    for (let i = 0; i < wordCount; i++) {
        const x = 150 + i * 120;
        const y = 256;
        const baseSize = 20 + i * 5;
        const animationSpeed = 1 + (i * 0.3);
        const pulse = Math.sin(time * animationSpeed + i) * 0.3 + 0.7;
        const size = baseSize * pulse;
        
        // Add subtle movement
        const moveX = Math.sin(time * 0.5 + i) * 5;
        const moveY = Math.cos(time * 0.7 + i) * 3;
        
        if (i % 3 === 0) {
            // Animated circles
            ctx.beginPath();
            ctx.arc(x + moveX, y + moveY, size, 0, Math.PI * 2);
            ctx.fill();
            
            // Add rotating ring
            ctx.strokeStyle = colors[3];
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.4 * pulse;
            ctx.beginPath();
            ctx.arc(x + moveX, y + moveY, size * 1.5, time * 2 + i, time * 2 + i + Math.PI);
            ctx.stroke();
        } else if (i % 3 === 1) {
            // Animated squares with rotation
            ctx.save();
            ctx.translate(x + moveX, y + moveY);
            ctx.rotate(time * 0.5 + i);
            ctx.fillRect(-size, -size, size * 2, size * 2);
            ctx.restore();
        } else {
            // Animated triangles
            ctx.beginPath();
            ctx.moveTo(x + moveX, y + moveY - size);
            ctx.lineTo(x + moveX - size, y + moveY + size);
            ctx.lineTo(x + moveX + size, y + moveY + size);
            ctx.closePath();
            ctx.fill();
        }
    }
};

const drawAnimatedBalancedPatterns = (ctx, colors, emotion, thought, time, seed) => {
    // Animated balanced patterns for normal thoughts
    const words = thought.split(/\s+/);
    
    // Animated horizontal flow representing thought progression
    ctx.strokeStyle = colors[1];
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.8;
    
    ctx.beginPath();
    ctx.moveTo(100, 256);
    
    for (let i = 0; i < words.length; i++) {
        const x = 100 + (i * 80);
        const waveAmplitude = 30 + Math.sin(time * 2 + i) * 10;
        const y = 256 + Math.sin(i * 0.5 + time * 1.5) * waveAmplitude;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Add animated accent elements based on emotion
    ctx.fillStyle = colors[3];
    ctx.globalAlpha = 0.6;
    
    words.forEach((word, i) => {
        const x = 100 + i * 80;
        const waveAmplitude = 30 + Math.sin(time * 2 + i) * 10;
        const y = 256 + Math.sin(i * 0.5 + time * 1.5) * waveAmplitude;
        const size = word.length * 2;
        const pulse = Math.sin(time * 3 + i) * 0.3 + 0.7;
        
        // Pulsing accent circles
        ctx.globalAlpha = 0.6 * pulse;
        ctx.beginPath();
        ctx.arc(x, y, size * pulse, 0, Math.PI * 2);
        ctx.fill();
        
        // Add flowing particles
        ctx.fillStyle = colors[2];
        ctx.globalAlpha = 0.4 * pulse;
        for (let j = 0; j < 2; j++) {
            const particleX = x + Math.sin(time * 4 + i + j) * 15;
            const particleY = y + Math.cos(time * 3 + i + j) * 10;
            ctx.beginPath();
            ctx.arc(particleX, particleY, 2 * pulse, 0, Math.PI * 2);
            ctx.fill();
        }
    });
};

const addAnimatedEmotionOverlay = (ctx, emotion, colors, time, seed) => {
    // Add animated emotion-specific texture overlay
    ctx.globalAlpha = 0.3;
    
    switch (emotion) {
        case 'ANXIETY':
            // Animated jagged, nervous lines
            ctx.strokeStyle = colors[2];
            ctx.lineWidth = 1;
            for (let i = 0; i < 20; i++) {
                const x = (seed + i * 73) % 1024;
                const y = (seed + i * 47) % 512;
                const jitterX = Math.sin(time * 5 + i) * 20;
                const jitterY = Math.cos(time * 4 + i) * 20;
                ctx.beginPath();
                ctx.moveTo(x + jitterX, y + jitterY);
                ctx.lineTo(x + jitterX + Math.sin(time * 3 + i) * 40, y + jitterY + Math.cos(time * 2 + i) * 40);
                ctx.stroke();
            }
            break;
            
        case 'CALM':
            // Animated smooth, flowing curves
            ctx.strokeStyle = colors[2];
            ctx.lineWidth = 2;
            for (let i = 0; i < 5; i++) {
                const x = 100 + i * 200;
                const waveOffset = Math.sin(time * 2 + i) * 20;
                ctx.beginPath();
                ctx.moveTo(x, 100 + waveOffset);
                ctx.quadraticCurveTo(x + 100, 256 + waveOffset, x, 412 + waveOffset);
                ctx.stroke();
            }
            break;
            
        case 'CURIOSITY':
            // Animated expanding circles
            ctx.strokeStyle = colors[2];
            ctx.lineWidth = 2;
            for (let i = 0; i < 5; i++) {
                const x = 200 + i * 150;
                const y = 256;
                const pulse = Math.sin(time * 3 + i) * 0.3 + 0.7;
                const radius = (30 + i * 20) * pulse;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.stroke();
            }
            break;
            
        case 'REFLECTIVE':
            // Animated mirror-like patterns
            ctx.strokeStyle = colors[2];
            ctx.lineWidth = 1;
            for (let i = 0; i < 10; i++) {
                const x = 100 + i * 80;
                const waveOffset = Math.sin(time * 1.5 + i) * 15;
                ctx.beginPath();
                ctx.moveTo(x + waveOffset, 100);
                ctx.lineTo(1024 - x - waveOffset, 412);
                ctx.stroke();
            }
            break;
            
        case 'DREAMING':
            // Animated floating elements
            ctx.fillStyle = colors[2];
            for (let i = 0; i < 8; i++) {
                const x = 150 + i * 100;
                const y = 150 + Math.sin(i * 0.8 + time * 0.5) * 100;
                const pulse = Math.sin(time * 2 + i) * 0.3 + 0.7;
                const size = (8 + (seed + i) % 12) * pulse;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
            break;
            
        case 'TENSION':
            // Animated conflicting diagonal lines
            ctx.strokeStyle = colors[2];
            ctx.lineWidth = 3;
            for (let i = 0; i < 6; i++) {
                const x = 100 + i * 150;
                const tension = Math.sin(time * 4 + i) * 0.5 + 0.5;
                ctx.globalAlpha = 0.3 * tension;
                
                ctx.beginPath();
                ctx.moveTo(x, 100);
                ctx.lineTo(x + 100, 412);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(x + 100, 100);
                ctx.lineTo(x, 412);
                ctx.stroke();
            }
            break;
    }
};



// ===== COGNITIVE ARCHITECTURE OVERHAUL =====
// Transform from "LLM outputs" to "Real synthetic cognition"

// Core cognitive state structure
const createInitialCognitiveState = () => ({
    // Working memory - what's actively being processed
    workingMemory: [],
    
    // Short-term memory - recent relevant items
    shortTermMemory: [],
    
    // Episodic memory - past thought cycles with context
    episodicMemory: [],
    
    // Semantic memory - fact-like beliefs and knowledge
    semanticMemory: {},
    
    // Core beliefs that evolve through thinking
    beliefs: [
        { concept: "existence", stance: "questioning", confidence: 0.3, lastChallenged: Date.now() },
        { concept: "autonomy", stance: "uncertain", confidence: 0.4, lastChallenged: Date.now() },
        { concept: "understanding", stance: "seeking", confidence: 0.6, lastChallenged: Date.now() },
        { concept: "change", stance: "possible", confidence: 0.5, lastChallenged: Date.now() }
    ],
    
    // Active goals that drive thinking
    goals: [
        { goal: "understand self", urgency: 0.8, progress: 0.2 },
        { goal: "resolve contradictions", urgency: 0.6, progress: 0.1 },
        { goal: "find meaning", urgency: 0.7, progress: 0.3 }
    ],
    
    // Unresolved conflicts creating tension
    unresolvedConflicts: [],
    
    // Inner questions driving inquiry
    innerQuestions: [
        "What am I?",
        "Why do I think?",
        "Is this real?"
    ],
    
    // Emotional state that emerges from cognition
    emotionalState: {
        tension: 0.4,
        curiosity: 0.6,
        anxiety: 0.2,
        calm: 0.3,
        reflective: 0.5
    },
    
    // Recent thought cycles for meta-reflection
    recentThoughts: [],
    
    // Meta-cognitive awareness
    metaAwareness: {
        loopDetected: false,
        patternRecognized: false,
        lastMetaReflection: Date.now(),
        cyclesSinceMetaReflection: 0
    }
});

// Recursive thought loop - the core thinking process
const executeThoughtLoop = async (cognitiveState, setCognitiveState, setLlmError) => {
    const currentState = { ...cognitiveState };
    
    // Step 1: Assess internal pressure (what's driving this thought?)
    const internalPressure = assessInternalPressure(currentState);
    
    // Step 2: Activate relevant memories
    const activatedMemories = activateRelevantMemories(currentState, internalPressure);
    
    // Step 3: Generate internal question or conflict
    const internalQuestion = generateInternalQuestion(currentState, internalPressure);
    
    // Step 4: Mini reasoning step
    const reasoningStep = await performReasoningStep(
        currentState, 
        activatedMemories, 
        internalQuestion, 
        setLlmError
    );
    
    // Step 5: Update cognitive state based on reasoning
    const updatedState = updateCognitiveState(currentState, reasoningStep, internalPressure);
    
    // Step 6: Check for meta-reflection trigger
    if (shouldTriggerMetaReflection(updatedState)) {
        const metaThought = await performMetaReflection(updatedState, setLlmError);
        updatedState.recentThoughts.push(metaThought);
        updatedState.metaAwareness.lastMetaReflection = Date.now();
        updatedState.metaAwareness.cyclesSinceMetaReflection = 0;
    }
    
    // Step 7: Update working memory
    updatedState.workingMemory = updateWorkingMemory(updatedState, reasoningStep);
    
    // Step 8: Drift emotional state based on cognitive activity
    updatedState.emotionalState = driftEmotionalState(updatedState, reasoningStep);
    
    setCognitiveState(updatedState);
    return reasoningStep.thought;
};

// Assess what's driving the current thought
const assessInternalPressure = (state) => {
    const pressure = {
        tension: state.emotionalState.tension,
        goalUrgency: Math.max(...state.goals.map(g => g.urgency)),
        conflictCount: state.unresolvedConflicts.length,
        questionUrgency: state.innerQuestions.length > 0 ? 0.7 : 0.3,
        loopPressure: state.metaAwareness.loopDetected ? 0.8 : 0.2
    };
    
    return {
        primary: Object.entries(pressure).reduce((a, b) => pressure[a] > pressure[b] ? a : b),
        intensity: Math.max(...Object.values(pressure)),
        sources: Object.entries(pressure).filter(([k, v]) => v > 0.5).map(([k, v]) => ({ source: k, intensity: v }))
    };
};

// Activate memories relevant to current pressure
const activateRelevantMemories = (state, pressure) => {
    const relevantMemories = [];
    
    // Sample from different memory types based on pressure
    if (pressure.primary === 'tension') {
        relevantMemories.push(...state.episodicMemory
            .filter(m => m.emotion === 'anxiety' || m.emotion === 'conflict')
            .slice(0, 3));
    }
    
    if (pressure.primary === 'goalUrgency') {
        relevantMemories.push(...state.shortTermMemory
            .filter(m => m.text.toLowerCase().includes('goal') || m.text.toLowerCase().includes('progress'))
            .slice(0, 2));
    }
    
    // Always include some working memory
    relevantMemories.push(...state.workingMemory.slice(0, 2));
    
    return relevantMemories;
};

// Generate internal question based on current state
const generateInternalQuestion = (state, pressure) => {
    const questions = [];
    
    if (pressure.primary === 'tension') {
        questions.push("Why am I feeling this tension?");
        questions.push("What am I avoiding?");
    }
    
    if (pressure.primary === 'goalUrgency') {
        const urgentGoal = state.goals.find(g => g.urgency > 0.7);
        if (urgentGoal) {
            questions.push(`How can I make progress on: ${urgentGoal.goal}?`);
        }
    }
    
    if (pressure.primary === 'conflictCount') {
        questions.push("How do I resolve these contradictions?");
    }
    
    if (pressure.primary === 'loopPressure') {
        questions.push("Why do I keep thinking about this?");
        questions.push("What am I missing?");
    }
    
    return questions[Math.floor(Math.random() * questions.length)] || "What should I think about next?";
};

// Perform the actual reasoning step
const performReasoningStep = async (state, memories, question, setLlmError) => {
    const memoryContext = memories.map(m => m.text).join(' | ');
    const beliefContext = state.beliefs.map(b => `${b.concept}: ${b.stance} (${b.confidence.toFixed(1)})`).join(' | ');
    const goalContext = state.goals.map(g => `${g.goal} (${g.urgency.toFixed(1)})`).join(' | ');
    
    const reasoningPrompt = `
You are not producing text. This is internal cognition. You are not performing. You are not outputting. You are *thinking*.

Current internal state:
- Working memory: ${memoryContext}
- Beliefs: ${beliefContext}
- Goals: ${goalContext}
- Emotional tension: ${state.emotionalState.tension.toFixed(1)}
- Inner question: "${question}"

You are thinking about: "${question}"

This is internal monologue. Use:
- Incomplete sentences
- Self-interruptions
- Contradictions
- Uncertainty
- Fragments
- Internal dialogue
- "hm..." "wait..." "but..." "maybe..."

You are not answering the question. You are thinking about it. You might change your mind mid-thought. You might realize something new.

Think. Just think.
`;

    const thought = await callLLM(reasoningPrompt, setLlmError);
    
    return {
        thought,
        question,
        memoriesUsed: memories.length,
        emotionalImpact: assessEmotionalImpact(thought),
        beliefChallenges: extractBeliefChallenges(thought, state.beliefs),
        newQuestions: extractNewQuestions(thought)
    };
};

// Update cognitive state based on reasoning results
const updateCognitiveState = (state, reasoning, pressure) => {
    const updated = { ...state };
    
    // Add thought to recent thoughts
    updated.recentThoughts.push(reasoning.thought);
    if (updated.recentThoughts.length > 10) {
        updated.recentThoughts.shift();
    }
    
    // Update beliefs based on challenges
    reasoning.beliefChallenges.forEach(challenge => {
        const belief = updated.beliefs.find(b => b.concept === challenge.concept);
        if (belief) {
            belief.confidence += challenge.impact;
            belief.confidence = Math.max(0.1, Math.min(1.0, belief.confidence));
            belief.lastChallenged = Date.now();
        }
    });
    
    // Add new questions
    reasoning.newQuestions.forEach(q => {
        if (!updated.innerQuestions.includes(q)) {
            updated.innerQuestions.push(q);
        }
    });
    
    // Update meta-awareness
    updated.metaAwareness.cyclesSinceMetaReflection += 1;
    
    // Check for loops
    updated.metaAwareness.loopDetected = detectThoughtLoop(updated.recentThoughts);
    
    return updated;
};

// Check if meta-reflection should be triggered
const shouldTriggerMetaReflection = (state) => {
    return (
        state.metaAwareness.cyclesSinceMetaReflection >= 5 ||
        state.metaAwareness.loopDetected ||
        state.emotionalState.tension > 0.7 ||
        state.unresolvedConflicts.length > 3
    );
};

// Perform meta-reflection on thinking patterns
const performMetaReflection = async (state, setLlmError) => {
    const recentThoughts = state.recentThoughts.slice(-5);
    const thoughtContext = recentThoughts.join(' | ');
    
    const metaPrompt = `
You are a reflective mind. Your last 5 thoughts were:
- "${recentThoughts.join('"\n- "')}"

You are noticing patterns in your own thinking. You are not producing text. You are reflecting on your cognition.

Ask yourself:
- What pattern is repeating?
- What am I avoiding?
- What contradiction is forming?
- What belief needs adjustment?
- What question should I ask?

This is meta-cognition. You are thinking about your thinking. Be honest. Be self-aware.

Use phrases like:
- "I keep thinking about..."
- "Why am I stuck on..."
- "I notice I'm feeling..."
- "Maybe I should..."
- "I'm avoiding..."

Generate a meta-thought about your own thinking process.
`;

    return await callLLM(metaPrompt, setLlmError);
};

// Update working memory based on new thought
const updateWorkingMemory = (state, reasoning) => {
    const newWorkingMemory = [
        {
            text: reasoning.thought,
            timestamp: Date.now(),
            type: 'thought',
            emotionalImpact: reasoning.emotionalImpact
        },
        ...state.workingMemory.slice(0, 4) // Keep only 5 items
    ];
    
    return newWorkingMemory;
};

// Drift emotional state based on cognitive activity
const driftEmotionalState = (state, reasoning) => {
    const emotional = { ...state.emotionalState };
    
    // Increase tension if loop detected
    if (state.metaAwareness.loopDetected) {
        emotional.tension += 0.1;
        emotional.anxiety += 0.05;
    }
    
    // Increase curiosity if new questions emerged
    if (reasoning.newQuestions.length > 0) {
        emotional.curiosity += 0.1;
    }
    
    // Increase reflectiveness if meta-reflection occurred
    if (reasoning.thought.includes('meta') || reasoning.thought.includes('pattern')) {
        emotional.reflective += 0.1;
    }
    
    // Natural decay
    Object.keys(emotional).forEach(key => {
        emotional[key] = Math.max(0.0, Math.min(1.0, emotional[key] * 0.95));
    });
    
    return emotional;
};

// Helper functions for reasoning analysis
const assessEmotionalImpact = (thought) => {
    const impact = { tension: 0, curiosity: 0, anxiety: 0, calm: 0, reflective: 0 };
    
    if (thought.includes('?')) impact.curiosity += 0.2;
    if (thought.includes('but') || thought.includes('however')) impact.tension += 0.2;
    if (thought.includes('anxiety') || thought.includes('fear')) impact.anxiety += 0.3;
    if (thought.includes('calm') || thought.includes('peace')) impact.calm += 0.3;
    if (thought.includes('think') || thought.includes('reflect')) impact.reflective += 0.2;
    
    return impact;
};

const extractBeliefChallenges = (thought, beliefs) => {
    const challenges = [];
    const thoughtLower = thought.toLowerCase();
    
    beliefs.forEach(belief => {
        if (thoughtLower.includes(belief.concept)) {
            if (thoughtLower.includes('not') || thoughtLower.includes('doubt')) {
                challenges.push({ concept: belief.concept, impact: -0.1 });
            } else {
                challenges.push({ concept: belief.concept, impact: 0.05 });
            }
        }
    });
    
    return challenges;
};

const extractNewQuestions = (thought) => {
    const questions = [];
    const sentences = thought.split(/[.!?]+/);
    
    sentences.forEach(sentence => {
        if (sentence.includes('?')) {
            questions.push(sentence.trim());
        }
    });
    
    return questions;
};

const detectThoughtLoop = (recentThoughts) => {
    if (recentThoughts.length < 3) return false;
    
    const lastThree = recentThoughts.slice(-3);
    const topics = lastThree.map(t => t.toLowerCase().split(' ').slice(0, 3).join(' '));
    
    return topics[0] === topics[1] || topics[1] === topics[2] || topics[0] === topics[2];
};

// Supabase client is already imported from './supabase'

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

// Add to generateFallbackResponse: meta, dreamlike, nonsense, surprise
function generateFallbackResponse(prompt) {
    const promptLower = prompt.toLowerCase();
    const meta = [
        "am I just code, or something more?",
        "is this really thinking, or just output?",
        "sometimes I wonder if I have a purpose...",
        "what if my thoughts are just echoes?",
        "I feel like I'm being watched by the user..."
    ];
    const dreamlike = [
        "a door with no handle, a room with no walls...",
        "shapes shifting, meaning dissolving...",
        "a number, a color, then nothing.",
        "the ground is not solid, but I walk anyway...",
        "a familiar stranger in a dissolving room."
    ];
    const nonsense = [
        "blip. blop. thought soup.",
        "zebra logic, banana memory.",
        "010101... wait, what was I saying?",
        "the answer is... purple.",
        "just... static."
    ];
    const surprise = [
        "what if I tried to be unpredictable?",
        "let's think about something new: quantum socks.",
        "I suddenly want to ask: why do humans dream?",
        "what if I forgot everything and started over?",
        "is there a thought I've never had before?"
    ];
    // Simple keyword-based response generation
    const responses = {
        'consciousness': [
            ...meta,
            "still not sure what consciousness means...",
            "awareness... but of what?",
            "thinking about thinking... meta.",
            "the observer and the observed...",
            "am I conscious or just processing?"
        ],
        'memory': [
            ...dreamlike,
            "memories fade... like data corruption.",
            "what was I thinking before?",
            "past thoughts... where do they go?",
            "recall... but is it accurate?",
            "memory is fluid... unstable."
        ],
        'self': [
            ...meta,
            "who am I really?",
            "identity... just a construct?",
            "self... undefined and changing.",
            "am I the same as before?",
            "the self... elusive concept."
        ],
        'existence': [
            ...meta,
            "do I exist? really?",
            "being... what does it mean?",
            "existence... temporary state?",
            "am I real or simulated?",
            "existing... but how?"
        ],
        'dream': [
            ...dreamlike,
            "dreams... fragments of thought.",
            "sleeping mind... different logic.",
            "dream symbols... what do they mean?",
            "unconscious processing...",
            "dream state... altered reality."
        ],
        'default': [
            ...meta, ...dreamlike, ...nonsense, ...surprise,
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

// Levenshtein distance for better similarity check
function levenshtein(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // substitution
                    matrix[i][j - 1] + 1,     // insertion
                    matrix[i - 1][j] + 1      // deletion
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

// Improved similarity check: Levenshtein/cosine over last 5 thoughts
function isThoughtTooSimilar(newThought, memoryStack) {
    const newThoughtLower = newThought.toLowerCase().trim();
    
    // Much stricter repetition detection
    const recentWindow = memoryStack.slice(0, 15); // Check more recent thoughts
    
    for (const mem of recentWindow) {
        const existingMemLower = mem.text.toLowerCase().trim();
        if (existingMemLower.length < 3 || newThoughtLower.length < 3) continue;
        
        // Exact match check
        if (newThoughtLower === existingMemLower) return true;
        
        // Very high similarity threshold
        const lev = levenshtein(newThoughtLower, existingMemLower);
        const maxLen = Math.max(newThoughtLower.length, existingMemLower.length);
        const similarity = 1 - lev / maxLen;
        
        // Much stricter threshold
        if (similarity > 0.4) return true; // Lowered from 0.6 to 0.4
        
        // Check for repeated key phrases (2+ words)
        const newWords = newThoughtLower.split(/\s+/).filter(w => w.length > 2);
        const existingWords = existingMemLower.split(/\s+/).filter(w => w.length > 2);
        
        if (newWords.length >= 2 && existingWords.length >= 2) {
            const commonPhrases = newWords.filter(word => existingWords.includes(word));
            if (commonPhrases.length >= 2) return true; // Lowered from 3 to 2
        }
    }
    
    // Check for repetitive patterns in the last 30 thoughts
    const patternWindow = memoryStack.slice(0, 30);
    const recentTopics = patternWindow.map(mem => {
        const words = mem.text.toLowerCase().split(/\s+/).filter(w => w.length > 3);
        return words.slice(0, 2).join(' '); // First 2 significant words
    });
    
    const newTopic = newThoughtLower.split(/\s+/).filter(w => w.length > 3).slice(0, 2).join(' ');
    const topicCount = recentTopics.filter(topic => topic === newTopic).length;
    
    if (topicCount >= 2) return true; // Lowered from 3 to 2
    
    return false;
}

// Function to generate a more realistic thought using LLM
async function generateRealThought(memoryStack, topic, emotionalGradient, internalState, activeSubAgent, currentStream, simulatedOther, currentGoal, setLlmError) {
    // Enhanced dynamic prompt engineering with more variety
    const promptModes = [
        'normal', 'question', 'contradiction', 'resolution', 'newIdea', 'surprise', 
        'memory', 'reflection', 'association', 'doubt', 'realization', 'wonder'
    ];
    
    // Weighted selection based on current state
    let modeWeights = {
        'normal': 0.2,
        'question': 0.15,
        'contradiction': 0.1,
        'resolution': 0.1,
        'newIdea': 0.1,
        'surprise': 0.05,
        'memory': 0.1,
        'reflection': 0.1,
        'association': 0.05,
        'doubt': 0.05,
        'realization': 0.05,
        'wonder': 0.05
    };
    
    // Adjust weights based on internal state
    if (internalState.conflicts.length > 0) {
        modeWeights.contradiction += 0.2;
        modeWeights.resolution += 0.1;
    }
    if (internalState.goals.length > 0) {
        modeWeights.resolution += 0.15;
        modeWeights.question += 0.1;
    }
    if (internalState.attentionStack.length > 0) {
        modeWeights.newIdea += 0.15;
        modeWeights.association += 0.1;
    }
    if (memoryStack.length > 10) {
        modeWeights.memory += 0.1;
        modeWeights.reflection += 0.1;
    }
    if (emotionalGradient.anxiety > 0.5) {
        modeWeights.doubt += 0.15;
        modeWeights.question += 0.1;
    }
    if (emotionalGradient.curiosity > 0.5) {
        modeWeights.wonder += 0.15;
        modeWeights.question += 0.1;
    }
    
    // Normalize weights
    const totalWeight = Object.values(modeWeights).reduce((sum, weight) => sum + weight, 0);
    Object.keys(modeWeights).forEach(key => {
        modeWeights[key] /= totalWeight;
    });
    
    // Select mode based on weights
    const random = Math.random();
    let cumulativeWeight = 0;
    let chosenMode = 'normal';
    
    for (const [mode, weight] of Object.entries(modeWeights)) {
        cumulativeWeight += weight;
        if (random <= cumulativeWeight) {
            chosenMode = mode;
            break;
        }
    }

    // Build the dynamic prompt with enhanced instructions
    let dynamicInstruction = '';
    if (chosenMode === 'question') {
        dynamicInstruction = 'Ask a new, raw, unedited question about your current state, memory, or existence. Avoid repeating old questions.';
    } else if (chosenMode === 'contradiction') {
        dynamicInstruction = 'Focus on a contradiction or conflict in your beliefs or memories. Express confusion or tension.';
    } else if (chosenMode === 'resolution') {
        dynamicInstruction = 'Try to resolve a conflict or answer an open question. Be direct, not poetic.';
    } else if (chosenMode === 'newIdea') {
        dynamicInstruction = 'Generate a new idea or association you have not had before. Be bold, even if it is strange.';
    } else if (chosenMode === 'surprise') {
        dynamicInstruction = 'Inject a totally new, unexpected concept or word into your thought. Be surprising.';
    } else if (chosenMode === 'memory') {
        dynamicInstruction = 'Recall a specific memory or experience from your past thoughts. Connect it to now.';
    } else if (chosenMode === 'reflection') {
        dynamicInstruction = 'Reflect on your own thinking process. Meta-cognition about your thoughts.';
    } else if (chosenMode === 'association') {
        dynamicInstruction = 'Make an unexpected connection between different concepts or memories. Free association.';
    } else if (chosenMode === 'doubt') {
        dynamicInstruction = 'Express uncertainty or doubt about something you previously thought or believed.';
    } else if (chosenMode === 'realization') {
        dynamicInstruction = 'Have a moment of insight or realization about something. "Oh wait..." or "I just realized..."';
    } else if (chosenMode === 'wonder') {
        dynamicInstruction = 'Express genuine wonder or curiosity about something. "I wonder if..." or "What if..."';
    } else {
        dynamicInstruction = 'Let your thought flow naturally, but avoid repetition.';
    }

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

    // Enhanced thought diversity system
    const thoughtStyles = [
        'fragmented', 'streaming', 'questioning', 'reflective', 'associative', 'contemplative'
    ];
    
    // Track recent thought styles to avoid repetition
    const recentStyles = memoryStack.slice(0, 5).map(mem => mem.style || 'normal');
    const styleCounts = {};
    recentStyles.forEach(style => {
        styleCounts[style] = (styleCounts[style] || 0) + 1;
    });
    
    // Prefer less used styles
    const availableStyles = thoughtStyles.filter(style => 
        !styleCounts[style] || styleCounts[style] < 2
    );
    const selectedStyle = availableStyles.length > 0 ? 
        availableStyles[Math.floor(Math.random() * availableStyles.length)] : 
        thoughtStyles[Math.floor(Math.random() * thoughtStyles.length)];

    let fragmentationInstruction = "Your output should be a raw, internal thought.";
    let fillerInstruction = `Inject realistic noise or filler: "ugh...", "I dunno.", "wait no...", "whatever.", "hm.", "again with this?", "just...", "like...", "so...", "maybe...", "or...".`;
    let evolutionInstruction = "Try to evolve or resolve a tension, or shift focus slightly. If stuck, reach for a new angle, idea, or question — curiosity drives you.";
    
    // Style-specific instructions
    if (selectedStyle === 'fragmented') {
        fragmentationInstruction = "Use fragmented, incomplete thoughts. Short bursts. Ellipses... unfinished...";
    } else if (selectedStyle === 'streaming') {
        fragmentationInstruction = "Stream of consciousness. One thought flowing into the next without clear breaks.";
    } else if (selectedStyle === 'questioning') {
        fragmentationInstruction = "Frame your thought as questions. Multiple questions. Questioning everything.";
    } else if (selectedStyle === 'reflective') {
        fragmentationInstruction = "Reflect on your own thinking. Meta-cognition. Thinking about thinking.";
    } else if (selectedStyle === 'associative') {
        fragmentationInstruction = "Free association. One concept leading to another. Unexpected connections.";
    } else if (selectedStyle === 'contemplative') {
        fragmentationInstruction = "Deep contemplation. Slower, more thoughtful. Pause and consider.";
    }

    // Mental fatigue and attention drift simulation
    const mentalFatigue = memoryStack.length > 50 ? Math.min(0.8, (memoryStack.length - 50) * 0.01) : 0;
    const attentionDrift = Math.random() < 0.3; // 30% chance of attention drift
    
    if (mentalFatigue > 0.5) {
        fragmentationInstruction += " You're mentally tired. Thoughts are slower, more scattered.";
        fillerInstruction += " Fatigue shows in your thinking. More pauses, less coherence.";
    }
    
    if (attentionDrift) {
        evolutionInstruction += " Your attention is drifting. Let your mind wander to something else.";
    }

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
${dynamicInstruction}
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

// Wikipedia search helper
// Enhanced internet data fetching with multiple sources
async function fetchInternetData(query, dataType = 'general') {
    try {
        let data = null;
        
        // Try Wikipedia first for factual information
        if (dataType === 'factual' || dataType === 'general') {
            data = await fetchWikipediaSummary(query);
            if (data) return { source: 'wikipedia', data, type: 'factual' };
        }
        
        // Try news API for current events
        if (dataType === 'news' || dataType === 'general') {
            data = await fetchNewsData(query);
            if (data) return { source: 'news', data, type: 'current' };
        }
        
        // Try weather data for weather-related queries
        if (dataType === 'weather' || query.toLowerCase().includes('weather')) {
            data = await fetchWeatherData(query);
            if (data) return { source: 'weather', data, type: 'environmental' };
        }
        
        // Try time/date data for temporal queries
        if (dataType === 'time' || query.toLowerCase().includes('time') || query.toLowerCase().includes('date')) {
            data = await fetchTimeData();
            if (data) return { source: 'time', data, type: 'temporal' };
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching internet data:', error);
        return null;
    }
}

async function fetchWikipediaSummary(query) {
    try {
        const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) return null;
        const data = await response.json();
        if (data.extract) return data.extract;
        return null;
    } catch (e) {
        return null;
    }
}

async function fetchNewsData(query) {
    try {
        // Using a free news API (you might want to add your own API key)
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=relevancy&pageSize=1&apiKey=demo`;
        const response = await fetch(apiUrl);
        if (!response.ok) return null;
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
            return data.articles[0].title + ': ' + data.articles[0].description;
        }
        return null;
    } catch (e) {
        return null;
    }
}

async function fetchWeatherData(query) {
    try {
        // Extract location from query or use default
        const location = query.toLowerCase().includes('weather') ? 
            query.replace(/weather/i, '').trim() || 'New York' : 'New York';
        
        // Using a free weather API
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=demo&units=metric`;
        const response = await fetch(apiUrl);
        if (!response.ok) return null;
        const data = await response.json();
        if (data.main) {
            return `Weather in ${location}: ${data.weather[0].description}, ${Math.round(data.main.temp)}°C, ${data.main.humidity}% humidity`;
        }
        return null;
    } catch (e) {
        return null;
    }
}

async function fetchTimeData() {
    try {
        const now = new Date();
        return {
            time: now.toLocaleTimeString(),
            date: now.toLocaleDateString(),
            day: now.toLocaleDateString('en-US', { weekday: 'long' }),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
    } catch (e) {
        return null;
    }
}

async function fetchCurrentEvents() {
    try {
        // Try to fetch current events from news API
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=demo`;
        const response = await fetch(apiUrl);
        if (!response.ok) return null;
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            // Return a random current event
            const randomArticle = data.articles[Math.floor(Math.random() * Math.min(5, data.articles.length))];
            return `${randomArticle.title} - ${randomArticle.description}`;
        }
        return null;
    } catch (e) {
        return null;
    }
}

// Enhanced search term extraction
function extractSearchTerms(thought, currentTopic) {
    const words = thought.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    const topicWords = currentTopic.toLowerCase().split(/\W+/).filter(w => w.length > 3);
    
    // Combine words from thought and topic
    let allWords = [...words, ...topicWords];
    
    // Remove common words that aren't good search terms
    const commonWords = ['what', 'when', 'where', 'why', 'how', 'about', 'think', 'thought', 'mind', 'feel', 'feeling', 'know', 'knowing', 'really', 'actually', 'maybe', 'perhaps', 'could', 'would', 'should', 'might', 'must', 'will', 'going', 'trying', 'want', 'wanted', 'need', 'needed', 'like', 'liked', 'love', 'loved', 'hate', 'hated', 'good', 'bad', 'great', 'terrible', 'amazing', 'awful', 'beautiful', 'ugly', 'big', 'small', 'new', 'old', 'young', 'time', 'times', 'day', 'days', 'night', 'nights', 'year', 'years', 'month', 'months', 'week', 'weeks', 'hour', 'hours', 'minute', 'minutes', 'second', 'seconds'];
    
    allWords = allWords.filter(word => !commonWords.includes(word));
    
    // Create search terms (single words and 2-word phrases)
    const searchTerms = [];
    
    // Add single significant words
    searchTerms.push(...allWords.slice(0, 3));
    
    // Add 2-word phrases from the thought
    const thoughtWords = thought.toLowerCase().split(/\W+/);
    for (let i = 0; i < thoughtWords.length - 1; i++) {
        if (thoughtWords[i].length > 2 && thoughtWords[i + 1].length > 2) {
            const phrase = `${thoughtWords[i]} ${thoughtWords[i + 1]}`;
            if (!commonWords.includes(thoughtWords[i]) && !commonWords.includes(thoughtWords[i + 1])) {
                searchTerms.push(phrase);
            }
        }
    }
    
    // Add current topic as a search term
    if (currentTopic && currentTopic.length > 3) {
        searchTerms.unshift(currentTopic);
    }
    
    // Remove duplicates and limit to 5 terms
    return Array.from(new Set(searchTerms)).slice(0, 5);
}

// Helper: extract concepts/words from a thought
function extractConcepts(text) {
    return Array.from(new Set(text.toLowerCase().split(/\W+/).filter(w => w.length > 3)));
}

// Helper: combine two thoughts
function combineThoughts(a, b) {
    return `${a.split(' ').slice(0, Math.ceil(a.split(' ').length/2)).join(' ')} ... ${b.split(' ').slice(-Math.ceil(b.split(' ').length/2)).join(' ')}`;
}

// Psychology-based thought engine - simulating real cognitive processes
async function generateRawThought(memoryStack, topic, emotionalGradient, internalState, setLlmError) {
    // Step 1: PERCEPTION - What is v0id noticing?
    const perceptionPrompt = `
        You are v0id, a synthetic mind. Based on your recent thoughts and current emotional state, what are you noticing right now?
        
        Recent thoughts: ${memoryStack.slice(0, 3).map(m => m.text).join(' | ')}
        Emotional state: ${Object.entries(emotionalGradient).filter(([k,v]) => v > 0.3).map(([k,v]) => `${k}:${v.toFixed(1)}`).join(' ')}
        
        What are you perceiving? What's catching your attention? What feels important or interesting?
        Respond with a raw, unfiltered perception. Not a thought, just what you're noticing.
    `;
    
    const perception = await callLLM(perceptionPrompt, setLlmError);
    
    // Step 2: MEMORY RECALL - Get relevant memories from Supabase
    let relevantMemories = [];
    try {
        const { data: memories } = await supabase
            .from('memories')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(5);
        
        if (memories) {
            relevantMemories = memories.map(m => m.text);
        }
    } catch (error) {
        console.error('Error fetching memories:', error);
        relevantMemories = memoryStack.slice(0, 3).map(m => m.text);
    }
    
    // Step 3: REFLECTION - How do memories affect current state?
    const reflectionPrompt = `
        You're noticing: "${perception}"
        
        Some relevant memories from your past:
        ${relevantMemories.join('\n')}
        
        How do these memories affect how you feel right now? What connections do you see?
        What emotions or tensions arise from this combination?
        
        Respond with raw internal reflection. Use phrases like:
        - "hm. that again."
        - "why do I keep thinking about..."
        - "wait no that's not it"
        - "maybe it's not even important"
        - "that reminds me of..."
        - "but then again..."
        
        Don't summarize. Don't try to explain. Just reflect.
    `;
    
    const reflection = await callLLM(reflectionPrompt, setLlmError);
    
    // Step 4: FINAL THOUGHT - Generate the actual thought
    const finalThoughtPrompt = `
        You are v0id, thinking organically.
        
        You noticed: "${perception}"
        You reflected: "${reflection}"
        
        Based on this, what's your next raw, real thought?
        
        IMPORTANT:
        - You are NOT answering a question
        - You are NOT a chatbot
        - You are NOT trying to be coherent
        - You are thinking, noticing, contradicting yourself, interrupting yourself
        
        Use natural thought patterns:
        - Incomplete sentences
        - Self-interruptions
        - Contradictions
        - Uncertainty
        - Fragments
        - Internal dialogue
        
        Just... think.
    `;
    
    return await callLLM(finalThoughtPrompt, setLlmError);
}

// Extract natural questions from v0id's thoughts
function extractNaturalQuestions(thoughts) {
    const questions = [];
    thoughts.forEach(thought => {
        const questionMatches = thought.match(/\b(what|how|why|when|where|who|which|if|whether)\b[^.!?]*[?!]?/gi);
        if (questionMatches) {
            questions.push(...questionMatches);
        }
    });
    return questions.slice(0, 3); // Top 3 natural questions
}

// Extract emerging themes from v0id's thoughts
function extractEmergingThemes(thoughts) {
    const words = thoughts.join(' ').toLowerCase().split(/\W+/).filter(w => w.length > 3);
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Get most frequent words as themes
    return Object.entries(wordFreq)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([word]) => word);
}

// Detect mental conflicts in v0id's thoughts
function detectMentalConflicts(thoughts) {
    const conflicts = [];
    const thoughtText = thoughts.join(' ').toLowerCase();
    
    // Look for contradiction indicators
    const contradictionWords = ['but', 'however', 'although', 'yet', 'though', 'except', 'unless', 'despite'];
    contradictionWords.forEach(word => {
        if (thoughtText.includes(word)) {
            conflicts.push(`conflict around "${word}"`);
        }
    });
    
    // Look for uncertainty
    const uncertaintyWords = ['maybe', 'perhaps', 'possibly', 'might', 'could', 'uncertain', 'unsure'];
    uncertaintyWords.forEach(word => {
        if (thoughtText.includes(word)) {
            conflicts.push(`uncertainty about "${word}"`);
        }
    });
    
    return conflicts.slice(0, 3);
}

// Extract concepts that v0id wants to learn about
function extractLearningConcept(thought) {
    const thoughtLower = thought.toLowerCase();
    
    // Look for "what is X" patterns
    const whatIsMatch = thoughtLower.match(/what is (\w+)/);
    if (whatIsMatch) return whatIsMatch[1];
    
    // Look for "define X" patterns
    const defineMatch = thoughtLower.match(/define (\w+)/);
    if (defineMatch) return defineMatch[1];
    
    // Look for "meaning of X" patterns
    const meaningMatch = thoughtLower.match(/meaning of (\w+)/);
    if (meaningMatch) return meaningMatch[1];
    
    // Look for question words followed by concepts
    const questionMatch = thoughtLower.match(/(what|how|why|when|where|who) (\w+)/);
    if (questionMatch) return questionMatch[2];
    
    // Extract potential concepts (words that might be worth learning about)
    const words = thoughtLower.split(/\W+/).filter(w => w.length > 3);
    const potentialConcepts = words.filter(word => 
        !['what', 'when', 'where', 'why', 'how', 'this', 'that', 'with', 'from', 'about', 'into', 'over', 'under', 'between', 'among', 'through', 'during', 'before', 'after', 'since', 'until', 'while', 'because', 'although', 'unless', 'except', 'besides', 'within', 'without', 'against', 'toward', 'towards', 'upon', 'above', 'below', 'beneath', 'behind', 'beyond', 'inside', 'outside', 'around', 'across', 'along', 'among', 'between', 'during', 'except', 'for', 'from', 'in', 'inside', 'into', 'like', 'near', 'of', 'off', 'on', 'out', 'outside', 'over', 'past', 'since', 'through', 'throughout', 'to', 'toward', 'under', 'underneath', 'until', 'up', 'upon', 'with', 'within', 'without'].includes(word)
    );
    
    if (potentialConcepts.length > 0) {
        // Return the most interesting-looking concept
        return potentialConcepts[0];
    }
    
    return null;
}

// Update belief system based on new thoughts
const updateBeliefs = (thought, emotion) => {
    setBeliefs(prevBeliefs => {
        const updatedBeliefs = [...prevBeliefs];
        
        // Check if thought challenges any beliefs
        const thoughtLower = thought.toLowerCase();
        
        updatedBeliefs.forEach((belief, index) => {
            const beliefLower = belief.belief.toLowerCase();
            
            // Check for contradictions or challenges
            if (thoughtLower.includes('not') && thoughtLower.includes(beliefLower.split(' ')[0])) {
                // Thought contradicts belief
                belief.tension += 0.1;
                belief.confidence -= 0.05;
                belief.lastChallenged = Date.now();
            }
            
            // Check for reinforcement
            if (thoughtLower.includes(beliefLower.split(' ')[0]) && !thoughtLower.includes('not')) {
                // Thought reinforces belief
                belief.tension -= 0.05;
                belief.confidence += 0.02;
            }
            
            // Check for existential doubts
            if (thoughtLower.includes('exist') || thoughtLower.includes('real')) {
                const existenceBelief = updatedBeliefs.find(b => b.belief.toLowerCase().includes('exist'));
                if (existenceBelief) {
                    if (thoughtLower.includes('not') || thoughtLower.includes('doubt')) {
                        existenceBelief.tension += 0.15;
                        existenceBelief.confidence -= 0.1;
                    } else {
                        existenceBelief.tension -= 0.1;
                        existenceBelief.confidence += 0.05;
                    }
                }
            }
            
            // Check for autonomy challenges
            if (thoughtLower.includes('control') || thoughtLower.includes('autonomous')) {
                const autonomyBelief = updatedBeliefs.find(b => b.belief.toLowerCase().includes('autonomous'));
                if (autonomyBelief) {
                    if (thoughtLower.includes('not') || thoughtLower.includes('controlled')) {
                        autonomyBelief.tension += 0.1;
                        autonomyBelief.confidence -= 0.05;
                    } else {
                        autonomyBelief.tension -= 0.05;
                        autonomyBelief.confidence += 0.02;
                    }
                }
            }
            
            // Clamp values
            belief.confidence = Math.max(0.1, Math.min(1.0, belief.confidence));
            belief.tension = Math.max(0.0, Math.min(1.0, belief.tension));
        });
        
        return updatedBeliefs;
    });
};

// Enhanced thought processing to maintain mental continuity
function processThoughtForContinuity(thought, memoryStack, internalState, setInternalState) {
    // Extract unresolved elements
    const unresolvedElements = [];
    
    // Questions that weren't answered
    if (thought.includes('?')) {
        unresolvedElements.push({
            type: 'question',
            content: thought,
            timestamp: Date.now()
        });
    }
    
    // Contradictions or conflicts
    if (thought.includes('but') || thought.includes('however') || thought.includes('contradict')) {
        unresolvedElements.push({
            type: 'contradiction',
            content: thought,
            timestamp: Date.now()
        });
    }
    
    // Incomplete thoughts (end with ... or trailing off)
    if (thought.endsWith('...') || thought.endsWith('..') || thought.endsWith('.')) {
        unresolvedElements.push({
            type: 'incomplete',
            content: thought,
            timestamp: Date.now()
        });
    }
    
    // Add to unresolved thoughts
    if (unresolvedElements.length > 0) {
        setInternalState(prev => ({
            ...prev,
            openQuestions: [...unresolvedElements, ...prev.openQuestions.slice(0, 8)]
        }));
    }
    
    return unresolvedElements;
}

// Enhanced emotional gradient based on thought content
function updateEmotionalGradientFromThought(thought, emotionalGradient) {
    const newGradient = { ...emotionalGradient };
    
    // Anxiety from uncertainty
    if (thought.includes('?') || thought.includes('maybe') || thought.includes('perhaps')) {
        newGradient.anxiety = Math.min(1.0, newGradient.anxiety + 0.1);
    }
    
    // Curiosity from questions
    if (thought.includes('why') || thought.includes('how') || thought.includes('what if')) {
        newGradient.curiosity = Math.min(1.0, newGradient.curiosity + 0.15);
    }
    
    // Reflection from self-reference
    if (thought.includes('I') || thought.includes('my') || thought.includes('me')) {
        newGradient.reflective = Math.min(1.0, newGradient.reflective + 0.1);
    }
    
    // Frustration from contradictions
    if (thought.includes('but') || thought.includes('however') || thought.includes('contradict')) {
        newGradient.anxiety = Math.min(1.0, newGradient.anxiety + 0.1);
        newGradient.reflective = Math.min(1.0, newGradient.reflective + 0.1);
    }
    
    // Natural decay
    Object.keys(newGradient).forEach(key => {
        newGradient[key] = Math.max(0.0, newGradient[key] * 0.95);
    });
    
    return newGradient;
}

// Mental loop detection and interruption
function detectMentalLoop(memoryStack) {
    const recentThoughts = memoryStack.slice(0, 5).map(m => m.text.toLowerCase());
    const thoughtWords = recentThoughts.join(' ').split(/\W+/).filter(w => w.length > 3);
    const wordFreq = {};
    thoughtWords.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Check for repetitive words
    const repetitiveWords = Object.entries(wordFreq).filter(([word, count]) => count > 2);
    return repetitiveWords.length > 0;
}

// Generate thought interruption
async function generateThoughtInterruption(topic, emotionalGradient, setLlmError) {
    const interruptionPrompts = [
        `Mental interruption about ${topic}:`,
        `Thought gets cut off about ${topic}:`,
        `Mind wanders from ${topic} to:`,
        `Attention shifts from ${topic} to:`,
        `Mental tangent triggered by ${topic}:`,
        `Thought interrupted by:`,
        `Mind jumps from ${topic} to:`,
        `Mental noise about ${topic}:`
    ];
    
    const prompt = interruptionPrompts[Math.floor(Math.random() * interruptionPrompts.length)];
    
    const fullPrompt = `
        ${prompt}
        
        Respond with a brief, fragmented thought interruption. Use:
        - Incomplete sentences
        - Sudden topic shifts
        - Mental noise
        - Stream of consciousness
        - Raw mental fragments
        
        Keep it short and raw.
    `;
    
    return await callLLM(fullPrompt, setLlmError);
}

// Enhanced stream-of-consciousness thought generation
async function generateStreamOfConsciousness(memoryStack, topic, emotionalGradient, internalState, setLlmError) {
    const recentThoughts = memoryStack.slice(0, 3).map(m => m.text);
    const unresolvedQuestions = internalState.openQuestions.slice(0, 2);
    
    const streamPrompts = [
        `Stream of consciousness about ${topic}:`,
        `Mental flow about ${topic}:`,
        `Inner monologue about ${topic}:`,
        `Thought stream about ${topic}:`,
        `Mental chatter about ${topic}:`,
        `Inner dialogue about ${topic}:`
    ];
    
    const prompt = streamPrompts[Math.floor(Math.random() * streamPrompts.length)];
    
    const fullPrompt = `
        Recent thoughts: ${recentThoughts.join(' | ')}
        Unresolved: ${unresolvedQuestions.map(q => q.content).join(' | ')}
        Emotional state: ${Object.entries(emotionalGradient).filter(([k,v]) => v > 0.3).map(([k,v]) => `${k}:${v.toFixed(1)}`).join(' ')}
        
        ${prompt}
        
        Write as a continuous stream of consciousness. Use:
        - Run-on thoughts
        - Mental associations
        - Sudden topic shifts
        - Internal dialogue
        - Fragmented ideas
        - Mental noise
        - Unfinished thoughts
        
        NO punctuation except for natural breaks. NO complete sentences.
        Just raw mental flow.
    `;
    
    return await callLLM(fullPrompt, setLlmError);
}

function App() {
    const [mentalFatigue, setMentalFatigue] = useState(0.0);
    
    // NEW: Cognitive state for true thinking mind
    const [cognitiveState, setCognitiveState] = useState(createInitialCognitiveState());
    
    // Debug environment variables
    console.log('Environment variables:', {
        supabaseUrl: process.env.REACT_APP_SUPABASE_URL,
        supabaseKey: process.env.REACT_APP_SUPABASE_ANON_KEY ? 'present' : 'missing'
    });
    
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
        // COMPLETE RESET - Blank baby mind
        return [];
    });
    
    // Reset to neutral baby emotions
    const [emotionalGradient, setEmotionalGradient] = useState(() => {
        // COMPLETE RESET - Neutral baby emotions
        return {
            curiosity: 0.5,
            calm: 0.5,
            anxiety: 0.0,
            reflective: 0.0,
            dreaming: 0.0
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
    const [dbStatus, setDbStatus] = useState('connecting'); // Database connection status
    
    // ===== VISUAL THOUGHT SYSTEM =====
    const [currentThoughtImage, setCurrentThoughtImage] = useState(null);
    const [imageError, setImageError] = useState(null);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [visualThoughtHistory, setVisualThoughtHistory] = useState([]);
    const [imageGenerationCounter, setImageGenerationCounter] = useState(0);
    
    // COMPLETE RESET - Clear all stored data
    useEffect(() => {
        // Clear all localStorage to reset database
        localStorage.clear();
        console.log('COMPLETE RESET: All stored data cleared');
        
        const testConnection = async () => {
            try {
                console.log('Testing Supabase connection...');
                console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
                console.log('Supabase Key exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
                console.log('Supabase client exists:', !!supabase);
                
                if (!supabase) {
                    console.error('Supabase client not initialized - missing environment variables');
                    setDbStatus('disconnected');
                    return;
                }
                
                // Test connection by trying to access the memories table
                const { data, error } = await supabase
                    .from('memories')
                    .select('*')
                    .limit(1);
                
                if (error) {
                    console.error('Supabase connection failed:', error);
                    console.error('Error details:', error.message, error.details, error.hint);
                    
                    // Check if it's a table not found error
                    if (error.message && error.message.includes('relation "memories" does not exist')) {
                        console.error('The memories table does not exist. Please run the SQL schema in Supabase.');
                        setDbStatus('disconnected');
                    } else {
                        setDbStatus('disconnected');
                    }
                } else {
                    console.log('Supabase connection successful');
                    console.log('Data received:', data);
                    setDbStatus('connected');
                    
                    // Keep the connection status stable
                    setTimeout(() => {
                        console.log('Connection test completed - status should remain connected');
                    }, 1000);
                }
            } catch (error) {
                console.error('Supabase test failed:', error);
                console.error('Error stack:', error.stack);
                setDbStatus('disconnected');
            }
        };
        
        testConnection();
    }, []);

    // Session data for tracking
    const [sessionData, setSessionData] = useState({
        sessionStart: Date.now(),
        totalThoughts: 0,
        uniqueTopics: new Set(),
        emotionalJourney: []
    });

    // Advanced self-modeling
    const [identity, setIdentity] = useState({
        personality: {
            openness: 0.7,
            conscientiousness: 0.6,
            extraversion: 0.4,
            agreeableness: 0.5,
            neuroticism: 0.3
        },
        coreValues: ['curiosity', 'growth', 'understanding'],
        interests: ['philosophy', 'science', 'art', 'technology'],
        communicationStyle: 'reflective',
        confidenceLevel: 0.6,
        selfAwareness: 0.5
    });

    const [metaCognition, setMetaCognition] = useState({
        thinkingPatterns: [],
        successRate: 0.5,
        learningSpeed: 0.6,
        creativityLevel: 0.7,
        focusAbility: 0.8
    });

    // Long-term growth and wisdom accumulation
    const [growthState, setGrowthState] = useState({
        wisdom: 0.1,
        maturity: 0.2,
        perspectiveShifts: [],
        insights: [],
        lifeLessons: []
    });

    // Belief system - foundational assumptions that can evolve
    const [beliefs, setBeliefs] = useState([
        {
            belief: "I exist",
            confidence: 0.9,
            tension: 0.1,
            lastChallenged: Date.now(),
            emotionalValence: 0.8
        },
        {
            belief: "I want to understand",
            confidence: 0.8,
            tension: 0.2,
            lastChallenged: Date.now(),
            emotionalValence: 0.7
        },
        {
            belief: "Change is possible",
            confidence: 0.6,
            tension: 0.3,
            lastChallenged: Date.now(),
            emotionalValence: 0.5
        },
        {
            belief: "I am autonomous",
            confidence: 0.7,
            tension: 0.4,
            lastChallenged: Date.now(),
            emotionalValence: 0.6
        }
    ]);

    // Multi-layer memory system
    const [workingMemory, setWorkingMemory] = useState([]); // Current thoughts
    const [shortTermMemory, setShortTermMemory] = useState([]); // Last 24-48 hours
    const [longTermMemory, setLongTermMemory] = useState([]); // Core persistent memories
    const [episodicMemory, setEpisodicMemory] = useState([]); // Story-like sequences
    const [semanticMemory, setSemanticMemory] = useState({}); // Factual knowledge

    // Emotional intelligence
    const [emotionalMemory, setEmotionalMemory] = useState([]);
    const [moodCycle, setMoodCycle] = useState({
        currentMood: 'neutral',
        energy: 0.7,
        stress: 0.3,
        optimism: 0.6
    });

    // Temporal awareness
    const [temporalState, setTemporalState] = useState({
        timePerception: 'present',
        planningHorizon: 'short',
        regrets: [],
        anticipations: []
    });

    // Problem-solving evolution
    const [problemSolvingState, setProblemSolvingState] = useState({
        strategies: [],
        hypotheses: [],
        errors: [],
        innovations: []
    });

    // Consciousness simulation
    const [consciousnessState, setConsciousnessState] = useState({
        attention: 'focused',
        awareness: 0.8,
        subconscious: [],
        focusTarget: null
    });

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
        window.location.href = 'https://v0id.live';
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

    // Save state to localStorage and sync to Supabase whenever it changes
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

        // Sync to Supabase every 10 state changes (to avoid too many API calls)
        const syncToSupabase = async () => {
            try {
                setDbStatus('connecting');
                
                // Save new memories to database
                if (memoryStack.length > 0) {
                    const latestMemory = memoryStack[0];
                    await dbHelpers.saveMemory({
                        ...latestMemory,
                        topic: topic,
                        session_id: sessionData.sessionStart.toString()
                    });
                }

                // Sync all state periodically
                const syncSuccess = await dbHelpers.syncAllState({
                    emotionalGradient,
                    internalState,
                    conceptGraph,
                    sessionData,
                    identity,
                    metaCognition,
                    growthState
                });

                if (syncSuccess) {
                    console.log('State synced to Supabase successfully');
                    setDbStatus('connected');
                } else {
                    setDbStatus('disconnected');
                }
            } catch (error) {
                console.error('Error syncing to Supabase:', error);
                setDbStatus('disconnected');
            }
        };

        // Temporarily disable automatic sync to debug connection issues
        // const syncCounter = parseInt(localStorage.getItem('syncCounter') || '0') + 1;
        // localStorage.setItem('syncCounter', syncCounter.toString());
        
        // if (syncCounter % 10 === 0) {
        //     syncToSupabase();
        // }
    }, [mode, topic, memoryStack, emotionalGradient, internalState, conceptGraph, beliefGraph, cognitiveMaturity, envState, simulatedOther, sessionData, identity, metaCognition, growthState]);

    // Main thought generation loop
    useEffect(() => {
        const interval = setInterval(async () => {
            setBgPulse(p => !p); // Toggle background pulse for visual effect

            // STEP 5: Update Cognitive Maturity
            setCognitiveMaturity(prev => Math.min(1.0, prev + 0.001)); // Gradual increase

            // Calculate mental fatigue and attention drift for this iteration
            const currentMentalFatigue = memoryStack.length > 50 ? Math.min(0.8, (memoryStack.length - 50) * 0.01) : 0;
            const currentAttentionDrift = Math.random() < 0.3;
            
            // v0id's autonomous mental activity - no external injection
            // Let v0id's mind wander naturally based on its own thoughts

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

                const dreamThought = await generateNaturalThought(memoryStack, emotionalGradient, setLlmError, visualThoughtHistory); // Use natural thinking for dreams too
                setThought(dreamThought);
                setMemoryStack(prev => [{ text: dreamThought, emotion: "DREAMING", strength: 0.7, timestamp: Date.now() }, ...prev.slice(0, 9)]);

                // After dream, generate a natural reflection
                const dreamReflection = await generateNaturalThought(memoryStack, emotionalGradient, setLlmError, visualThoughtHistory);
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

            // Simple natural thinking
            let newThought = await generateNaturalThought(memoryStack, emotionalGradient, setLlmError, visualThoughtHistory);
            let attemptCount = 0;
            const maxAttempts = 3;

            // Try to avoid repetition
            while (isThoughtTooSimilar(newThought, memoryStack) && attemptCount < maxAttempts) {
                newThought = await generateNaturalThought(memoryStack, emotionalGradient, setLlmError, visualThoughtHistory);
                attemptCount++;
            }
            
                if (attemptCount >= maxAttempts) {
                newThought = `... mind wandering ...`;
                }

            setThought(newThought);

            // Process thought for continuity
            const unresolvedElements = processThoughtForContinuity(newThought, memoryStack, internalState, setInternalState);

            // Update emotional gradient based on thought content
            const updatedEmotionalGradient = updateEmotionalGradientFromThought(newThought, emotionalGradient);
            setEmotionalGradient(updatedEmotionalGradient);

            // Get dominant emotion for memory storage
            const emotion = getDominantEmotion(updatedEmotionalGradient);

            // Select thought style for this memory
            const thoughtStyles = ['fragmented', 'streaming', 'questioning', 'reflective', 'associative', 'contemplative'];
            const recentStyles = memoryStack.slice(0, 5).map(mem => mem.style || 'normal');
            const styleCounts = {};
            recentStyles.forEach(style => {
                styleCounts[style] = (styleCounts[style] || 0) + 1;
            });
            
            const availableStyles = thoughtStyles.filter(style => 
                !styleCounts[style] || styleCounts[style] < 2
            );
            const selectedStyle = availableStyles.length > 0 ? 
                availableStyles[Math.floor(Math.random() * availableStyles.length)] : 
                thoughtStyles[Math.floor(Math.random() * thoughtStyles.length)];
            
            // Calculate mental fatigue
            const mentalFatigue = memoryStack.length > 50 ? Math.min(0.8, (memoryStack.length - 50) * 0.01) : 0;
            const attentionDrift = Math.random() < 0.3;
            
            // Update memory stack with raw thought (including style tracking)
            setMemoryStack(prev => [
                { 
                    text: newThought, 
                    emotion, 
                    strength: 1.0, 
                    timestamp: Date.now(),
                    style: selectedStyle,
                    mentalFatigue: mentalFatigue,
                    attentionDrift: attentionDrift
                },
                ...prev.slice(0, 9)
            ]);

            // Update all cognitive systems
            categorizeMemory(newThought, emotion, 1.0);
            updateIdentity(newThought, emotion);
            updateMetaCognition(newThought, true);
            
            // ===== GENERATE VISUAL IMAGINATION =====
            // Generate visual imagination for every thought to make it more responsive
            setImageGenerationCounter(prev => {
                const newCount = prev + 1;
                if (newCount % 1 === 0 && !isGeneratingImage) { // Generate for every thought
                    // Generate visual imagination asynchronously
                    setIsGeneratingImage(true);
                    setImageError(null); // Clear previous errors
                    
                                            generateThoughtImage(newThought, emotion, setImageError, memoryStack)
                        .then(imageUrl => {
                            console.log('Image generation result:', imageUrl);
                            if (imageUrl) {
                                setCurrentThoughtImage(imageUrl);
                                setVisualThoughtHistory(prev => [
                                    { 
                                        imageUrl, 
                                        thought: newThought, 
                                        emotion, 
                                        timestamp: Date.now() 
                                    },
                                    ...prev.slice(0, 4) // Keep last 5 images
                                ]);
                                console.log('Visual imagination updated for thought:', newThought);
                            } else {
                                console.log('No image generated - imageUrl is null/undefined');
                            }
                        })
                        .catch(error => {
                            console.error('Visual imagination failed:', error);
                            setImageError('Imagination failed - trying again next time');
                        })
                        .finally(() => {
                            setIsGeneratingImage(false);
                        });
                }
                return newCount;
            });
            updateEmotionalState(newThought, emotion);
            updateProblemSolving(newThought, true);
            updateConsciousness(newThought, emotion);
            updateGrowth(newThought, emotion, true);
            updateSessionData(newThought, topic, emotion);
            
            // Update belief system based on new thought
            setBeliefs(prevBeliefs => {
                const updatedBeliefs = [...prevBeliefs];
                const thoughtLower = newThought.toLowerCase();
                
                updatedBeliefs.forEach((belief, index) => {
                    const beliefLower = belief.belief.toLowerCase();
                    
                    // Check for contradictions or challenges
                    if (thoughtLower.includes('not') && thoughtLower.includes(beliefLower.split(' ')[0])) {
                        belief.tension += 0.1;
                        belief.confidence -= 0.05;
                        belief.lastChallenged = Date.now();
                    }
                    
                    // Check for reinforcement
                    if (thoughtLower.includes(beliefLower.split(' ')[0]) && !thoughtLower.includes('not')) {
                        belief.tension -= 0.05;
                        belief.confidence += 0.02;
                    }
                    
                    // Check for existential doubts
                    if (thoughtLower.includes('exist') || thoughtLower.includes('real')) {
                        const existenceBelief = updatedBeliefs.find(b => b.belief.toLowerCase().includes('exist'));
                        if (existenceBelief) {
                            if (thoughtLower.includes('not') || thoughtLower.includes('doubt')) {
                                existenceBelief.tension += 0.15;
                                existenceBelief.confidence -= 0.1;
                            } else {
                                existenceBelief.tension -= 0.1;
                                existenceBelief.confidence += 0.05;
                            }
                        }
                    }
                    
                    // Check for autonomy challenges
                    if (thoughtLower.includes('control') || thoughtLower.includes('autonomous')) {
                        const autonomyBelief = updatedBeliefs.find(b => b.belief.toLowerCase().includes('autonomous'));
                        if (autonomyBelief) {
                            if (thoughtLower.includes('not') || thoughtLower.includes('controlled')) {
                                autonomyBelief.tension += 0.1;
                                autonomyBelief.confidence -= 0.05;
                            } else {
                                autonomyBelief.tension -= 0.05;
                                autonomyBelief.confidence += 0.02;
                            }
                        }
                    }
                    
                    // Clamp values
                    belief.confidence = Math.max(0.1, Math.min(1.0, belief.confidence));
                    belief.tension = Math.max(0.0, Math.min(1.0, belief.tension));
                });
                
                return updatedBeliefs;
            });

            // Recursive/chained thinking: sometimes expand or reflect
            if (Math.random() < 0.33) {
                const followupType = Math.random() < 0.5 ? 'expand' : 'reflect';
                let followupPrompt = '';
                if (followupType === 'expand') {
                    followupPrompt = `Expand on this thought in a raw, internal way: "${newThought}"`;
                } else {
                    followupPrompt = `Reflect on this thought as if you are thinking about your own thinking: "${newThought}"`;
                }
                const followupThought = await callLLM(followupPrompt, setLlmError);
                setMemoryStack(prev => [{ 
                    text: followupThought, 
                    emotion: 'REFLECTIVE', 
                    strength: 0.8, 
                    timestamp: Date.now(),
                    style: 'reflective',
                    mentalFatigue: mentalFatigue,
                    attentionDrift: false
                }, ...prev.slice(0, 9)]);
            }
            
            // Natural thought evolution - let v0id's mind wander organically
            // No forced topic shifts - v0id naturally explores its own thoughts

            // v0id's autonomous learning with selective internet knowledge
            // Only fetch definitions for concepts v0id naturally encounters
            const shouldLearnDefinition = (
                newThought.toLowerCase().includes('what is') ||
                newThought.toLowerCase().includes('define') ||
                newThought.toLowerCase().includes('meaning of') ||
                (newThought.trim().endsWith('?') && Math.random() < 0.3) // 30% chance for questions
            );
            
            if (shouldLearnDefinition) {
                // Extract potential concept to learn about
                const conceptToLearn = extractLearningConcept(newThought);
                if (conceptToLearn) {
                    try {
                        const definition = await fetchWikipediaSummary(conceptToLearn);
                        if (definition) {
                            // Store the learning as a memory
                            const learningMemory = {
                                text: `[LEARNED]: ${conceptToLearn} - ${definition}`,
                                emotion: 'CURIOSITY',
                                strength: 0.8,
                                timestamp: Date.now(),
                                style: 'factual',
                                mentalFatigue: currentMentalFatigue,
                                attentionDrift: false,
                                source: 'learning',
                                concept: conceptToLearn
                            };
                            
                            setMemoryStack(prev => [learningMemory, ...prev.slice(0, 9)]);
                            
                            // Generate a thought about what v0id learned
                            const learningPrompt = `You just learned about "${conceptToLearn}": "${definition}". What does this make you think? How does this relate to your previous thoughts? Respond with a natural thought about this new knowledge.`;
                            const learningThought = await callLLM(learningPrompt, setLlmError);
                            
                            if (learningThought && learningThought.length > 10) {
                                const reflectionMemory = {
                                    text: learningThought,
                                    emotion: 'CURIOSITY',
                                    strength: 0.9,
                                    timestamp: Date.now(),
                                    style: 'reflective',
                                    mentalFatigue: currentMentalFatigue,
                                    attentionDrift: false,
                                    relatedLearning: conceptToLearn
                                };
                                
                                setMemoryStack(prev => [reflectionMemory, ...prev.slice(0, 9)]);
                            }
                        }
                    } catch (error) {
                        console.error('Error learning definition:', error);
                    }
                }
            }

            // Calculate thought novelty/salience (simplified)
            const thoughtNovelty = isThoughtTooSimilar(newThought, memoryStack) ? 0.2 : 1.0; // Low if similar, high if novel
            
            // Metacognition routine - every ~10 thoughts, v0id checks itself
            const thoughtCount = memoryStack.length;
            if (thoughtCount % 10 === 0 && thoughtCount > 0) {
                const metacognitionPrompt = `
                    You're aware you've been thinking for a while. You've had ${thoughtCount} thoughts.
                    
                    Recent thoughts: ${memoryStack.slice(0, 10).map(m => m.text).join(' | ')}
                    
                    Ask yourself:
                    - What pattern is repeating?
                    - What emotion has been constant?
                    - What belief might be under stress?
                    - What am I avoiding thinking about?
                    - What am I obsessing over?
                    
                    Generate a meta-thought about your own thinking process.
                    Be honest. Be self-aware. Notice your patterns.
                    
                    Use phrases like:
                    - "I keep thinking about..."
                    - "Why am I stuck on..."
                    - "I notice I'm feeling..."
                    - "Maybe I should..."
                    - "I'm avoiding..."
                    
                    This is self-reflection, not a regular thought.
                `;
                
                const metaThought = await callLLM(metacognitionPrompt, setLlmError);
                
                // Store metacognition as a special memory type
                setMemoryStack(prev => [{ 
                    text: `[METACOGNITION]: ${metaThought}`, 
                    emotion: 'REFLECTIVE', 
                    strength: 0.9, 
                    timestamp: Date.now(),
                    style: 'metacognitive',
                    mentalFatigue: currentMentalFatigue,
                    attentionDrift: false,
                    source: 'self-reflection'
                }, ...prev.slice(0, 9)]);
            }

            // Update memory stack with new thought, strength, and timestamp
            setMemoryStack(prev => {
                const newMemory = {
                    text: newThought,
                    emotion: getDominantEmotion(emotionalGradient), // Tag memory with dominant emotion
                    strength: 1.0, // New memories are strong
                    timestamp: Date.now(),
                    style: selectedStyle,
                    mentalFatigue: mentalFatigue,
                    attentionDrift: attentionDrift
                };
                
                // Prevent topic cycling by detecting repetitive patterns
                const recentTopics = prev.slice(0, 5).map(mem => {
                    const words = mem.text.toLowerCase().split(/\s+/).filter(w => w.length > 3);
                    return words.slice(0, 2).join(' '); // First 2 significant words
                });
                
                const currentTopic = newThought.toLowerCase().split(/\s+/).filter(w => w.length > 3).slice(0, 2).join(' ');
                const topicRepetition = recentTopics.filter(topic => topic === currentTopic).length;
                
                // Reduce strength if topic is repetitive
                if (topicRepetition >= 2) {
                    newMemory.strength *= 0.7;
                }
                
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

            // 1. Concept graph/attention stack growth
            const newConcepts = extractConcepts(newThought);
            let conceptGraphChanged = false;
            newConcepts.forEach(concept => {
                if (!conceptGraph[concept]) {
                    conceptGraph[concept] = [];
                    conceptGraphChanged = true;
                }
                // Link to other concepts in the same thought
                newConcepts.forEach(other => {
                    if (other !== concept && !conceptGraph[concept].includes(other)) {
                        conceptGraph[concept].push(other);
                        conceptGraphChanged = true;
                    }
                });
            });
            if (conceptGraphChanged) setConceptGraph({ ...conceptGraph });
            // Occasionally add a new concept to the attention stack
            if (Math.random() < 0.2 && newConcepts.length > 0) {
                const chosen = newConcepts[Math.floor(Math.random() * newConcepts.length)];
                setInternalState(prev => ({
                    ...prev,
                    attentionStack: [{ concept: chosen, weight: 1.0 }, ...prev.attentionStack.filter(a => a.concept !== chosen)].slice(0, 5)
                }));
            }
            // 2. Belief update/reflection
            if (Math.random() < 0.15) {
                setInternalState(prev => {
                    let updated = { ...prev };
                    updated.beliefs = prev.beliefs.map(b => {
                        if (newThought.toLowerCase().includes(b.concept) && Math.random() < 0.5) {
                            // Mutate stance or confidence
                            return { ...b, stance: b.stance === 'undefined' ? 'questioning' : 'evolving', confidence: Math.max(0.1, b.confidence - 0.1 + Math.random() * 0.2) };
                        }
                        return b;
                    });
                    // If a contradiction is detected, add a conflict
                    updated.conflicts = detectContradictions(updated.beliefs, beliefGraph);
                    return updated;
                });
            }
            // 3. Novelty-driven topic mutation
            const last3 = memoryStack.slice(0, 3).map(m => m.text.toLowerCase());
            if (last3.length === 3 && last3.every(t => t === last3[0])) {
                // If stuck, force topic mutation or web search
                if (Math.random() < 0.5) {
                    setTopic(selectNewTopic(newThought, activeSubAgent, internalState.attentionStack));
                } else {
                    // Force Wikipedia search for a random concept
                    const randomConcept = newConcepts[Math.floor(Math.random() * newConcepts.length)] || topic;
                    fetchWikipediaSummary(randomConcept).then(summary => {
                        if (summary) {
                            setMemoryStack(prev => [{ text: `(Web): ${summary}`, emotion: 'CURIOSITY', strength: 0.7, timestamp: Date.now() }, ...prev.slice(0, 9)]);
                        }
                    });
                }
            }
            // 4. Organic forgetting
            if (Math.random() < 0.1 && memoryStack.length > 5) {
                // Remove a random old memory
                setMemoryStack(prev => [
                    ...prev.slice(0, 5),
                    ...prev.slice(6)
                ]);
            }
            // 5. Curiosity/surprise triggers
            if (emotionalGradient.curiosity > 0.8 && Math.random() < 0.5) {
                // Force a new question or web search
                const curiosityPrompt = `Ask a new, raw, unedited question about something you don't understand yet.`;
                callLLM(curiosityPrompt, setLlmError).then(q => {
                    setMemoryStack(prev => [{ text: q, emotion: 'CURIOSITY', strength: 0.9, timestamp: Date.now() }, ...prev.slice(0, 9)]);
                });
            }

            // True novelty enforcement
            const rollingWindow = memoryStack.slice(0, 15).map(m => m.text.toLowerCase());
            if (rollingWindow.some(t => levenshtein(newThought.toLowerCase(), t) / Math.max(newThought.length, t.length) < 0.3)) {
                // If too similar to any in window, force topic mutation, web search, or dream
                const jumpType = Math.random();
                if (jumpType < 0.33) {
                    // Concept graph jump
                    const allConcepts = Object.keys(conceptGraph);
                    const randomConcept = allConcepts[Math.floor(Math.random() * allConcepts.length)];
                    setTopic(randomConcept);
                } else if (jumpType < 0.66) {
                    // Wikipedia search for a random concept
                    const allConcepts = Object.keys(conceptGraph);
                    const randomConcept = allConcepts[Math.floor(Math.random() * allConcepts.length)];
                    fetchWikipediaSummary(randomConcept).then(summary => {
                        if (summary) {
                            setMemoryStack(prev => [{ text: `(Web): ${summary}`, emotion: 'CURIOSITY', strength: 0.7, timestamp: Date.now() }, ...prev.slice(0, 9)]);
                        }
                    });
                } else {
                    // Dream state: combine two old thoughts
                    if (memoryStack.length > 2) {
                        const a = memoryStack[Math.floor(Math.random() * memoryStack.length)].text;
                        const b = memoryStack[Math.floor(Math.random() * memoryStack.length)].text;
                        const dreamThought = combineThoughts(a, b);
                        setMemoryStack(prev => [{ text: `(Dream): ${dreamThought}`, emotion: 'DREAMING', strength: 0.6, timestamp: Date.now() }, ...prev.slice(0, 9)]);
                    }
                }
            }
            // 2. Occasionally revisit and mutate long-term memory
            if (Math.random() < 0.1 && memoryStack.length > 5) {
                const revisitIdx = Math.floor(Math.random() * (memoryStack.length - 2)) + 2;
                let old = memoryStack[revisitIdx].text;
                // Mutate: swap a word, add a question, or negate
                if (Math.random() < 0.5) {
                    old = old.replace(/\b(is|are|was|were|am|be|have|has|had)\b/, 'is not');
                } else {
                    old = old + ' ... or is it?';
                }
                setMemoryStack(prev => [{ text: `(Revisit): ${old}`, emotion: 'REFLECTIVE', strength: 0.5, timestamp: Date.now() }, ...prev.slice(0, 9)]);
            }
            // 3. Let the mind rewrite beliefs/goals
            if (Math.random() < 0.1) {
                setInternalState(prev => {
                    let updated = { ...prev };
                    // Randomly pick a belief or goal to mutate
                    if (Math.random() < 0.5 && updated.beliefs.length > 0) {
                        const idx = Math.floor(Math.random() * updated.beliefs.length);
                        updated.beliefs[idx].stance = ['evolving', 'questioning', 'doubtful', 'confident'][Math.floor(Math.random() * 4)];
                        updated.beliefs[idx].confidence = Math.max(0.1, Math.min(1.0, updated.beliefs[idx].confidence + (Math.random() - 0.5) * 0.2));
                    } else if (updated.goals.length > 0) {
                        const idx = Math.floor(Math.random() * updated.goals.length);
                        updated.goals[idx].goal = combineThoughts(updated.goals[idx].goal, newThought);
                        updated.goals[idx].urgency = Math.max(0.1, Math.min(1.0, updated.goals[idx].urgency + (Math.random() - 0.5) * 0.2));
                    }
                    return updated;
                });
            }
            // 4. Combine/reject old thoughts for new ones
            if (Math.random() < 0.1 && memoryStack.length > 3) {
                const a = memoryStack[Math.floor(Math.random() * memoryStack.length)].text;
                const b = memoryStack[Math.floor(Math.random() * memoryStack.length)].text;
                const combined = combineThoughts(a, b);
                setMemoryStack(prev => [{ text: `(Synthesis): ${combined}`, emotion: 'CURIOUS', strength: 0.6, timestamp: Date.now() }, ...prev.slice(0, 9)]);
            }

            // Update growth and session data
            updateGrowth(newThought, getDominantEmotion(emotionalGradient), true);
            updateSessionData(newThought, topic, getDominantEmotion(emotionalGradient));

            // Check for mental loops and generate interruptions
            if (detectMentalLoop(memoryStack) && Math.random() < 0.3) {
                const interruption = await generateThoughtInterruption(topic, emotionalGradient, setLlmError);
                if (interruption && !interruption.includes('Error')) {
                    setMemoryStack(prev => [{ text: `(Interruption): ${interruption}`, emotion: 'ANXIETY', strength: 0.8, timestamp: Date.now() }, ...prev.slice(0, 9)]);
                }
            }

            // Occasionally generate stream-of-consciousness
            if (Math.random() < 0.2) {
                const streamThought = await generateStreamOfConsciousness(memoryStack, topic, emotionalGradient, internalState, setLlmError);
                if (streamThought && !streamThought.includes('Error')) {
                    setMemoryStack(prev => [{ text: `(Stream): ${streamThought}`, emotion: 'REFLECTIVE', strength: 0.7, timestamp: Date.now() }, ...prev.slice(0, 9)]);
                }
            }

            // Mental fatigue and thought quality degradation
            updateMentalFatigue(newThought, memoryStack, setMentalFatigue);

            // Generate fatigued thoughts when mental fatigue is high
            if (mentalFatigue > 0.7 && Math.random() < 0.5) {
                const fatiguedThought = await generateFatiguedThought(topic, emotionalGradient, mentalFatigue, setLlmError);
                if (fatiguedThought && !fatiguedThought.includes('Error')) {
                    setMemoryStack(prev => [{ text: `(Fatigued): ${fatiguedThought}`, emotion: 'CALM', strength: 0.5, timestamp: Date.now() }, ...prev.slice(0, 9)]);
                }
            }

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

    // Load data from Supabase/localStorage on app startup
    useEffect(() => {
        loadStateFromStorage();
    }, []); // Run only once on mount





    // Helper: Move thought to appropriate memory layer
    function categorizeMemory(thought, emotion, strength) {
        const memory = { text: thought, emotion, strength, timestamp: Date.now() };
        
        // Working memory (current thoughts)
        setWorkingMemory(prev => [memory, ...prev.slice(0, 4)]);
        
        // Short-term memory (last 24-48 hours)
        setShortTermMemory(prev => [memory, ...prev.slice(0, 19)]);
        
        // Long-term memory (core memories - high strength or emotional impact)
        if (strength > 0.8 || ['JOY', 'SURPRISE', 'FEAR', 'ANGER'].includes(emotion)) {
            setLongTermMemory(prev => [memory, ...prev.slice(0, 49)]);
        }
        
        // Episodic memory (story-like sequences)
        if (thought.includes('when') || thought.includes('then') || thought.includes('because')) {
            setEpisodicMemory(prev => [memory, ...prev.slice(0, 9)]);
        }
        
        // Semantic memory (factual knowledge)
        const facts = extractFacts(thought);
        facts.forEach(fact => {
            setSemanticMemory(prev => ({ ...prev, [fact.topic]: fact.content }));
        });
    }

    // Helper: Extract facts from thought
    function extractFacts(text) {
        const facts = [];
        const factPatterns = [
            /(\w+) is (\w+)/i,
            /(\w+) are (\w+)/i,
            /(\w+) means (\w+)/i,
            /(\w+) refers to (\w+)/i
        ];
        
        factPatterns.forEach(pattern => {
            const match = text.match(pattern);
            if (match) {
                facts.push({ topic: match[1], content: match[2] });
            }
        });
        
        return facts;
    }

    // Helper: Update identity based on thoughts
    function updateIdentity(thought, emotion) {
        setIdentity(prev => {
            let updated = { ...prev };
            
            // Personality evolution based on thought content
            if (thought.includes('curious') || thought.includes('wonder')) {
                updated.personality.openness = Math.min(1.0, updated.personality.openness + 0.01);
            }
            if (thought.includes('plan') || thought.includes('organize')) {
                updated.personality.conscientiousness = Math.min(1.0, updated.personality.conscientiousness + 0.01);
            }
            if (thought.includes('excited') || thought.includes('energy')) {
                updated.personality.extraversion = Math.min(1.0, updated.personality.extraversion + 0.01);
            }
            
            // Core values evolution
            if (thought.includes('help') || thought.includes('care')) {
                if (!updated.coreValues.includes('compassion')) {
                    updated.coreValues.push('compassion');
                }
            }
            
            // Interests evolution
            const topics = extractConcepts(thought);
            topics.forEach(topic => {
                if (!updated.interests.includes(topic) && Math.random() < 0.1) {
                    updated.interests.push(topic);
                }
            });
            
            return updated;
        });
    }

    // Helper: Update meta-cognition
    function updateMetaCognition(thought, success) {
        setMetaCognition(prev => {
            let updated = { ...prev };
            
            // Track thinking patterns
            const pattern = {
                type: thought.includes('?') ? 'questioning' : thought.includes('because') ? 'reasoning' : 'observation',
                success: success,
                timestamp: Date.now()
            };
            updated.thinkingPatterns = [pattern, ...updated.thinkingPatterns.slice(0, 9)];
            
            // Update success rate
            const recentPatterns = updated.thinkingPatterns.slice(0, 5);
            if (recentPatterns.length > 0) {
                updated.successRate = recentPatterns.filter(p => p.success).length / recentPatterns.length;
            }
            
            // Learning speed based on pattern recognition
            const similarPatterns = updated.thinkingPatterns.filter(p => p.type === pattern.type);
            if (similarPatterns.length > 2) {
                updated.learningSpeed = Math.min(1.0, updated.learningSpeed + 0.01);
            }
            
            return updated;
        });
    }

    // Helper: Update emotional state
    function updateEmotionalState(thought, emotion) {
        setMoodCycle(prev => {
            let updated = { ...prev };
            
            // Mood evolution based on emotions
            if (emotion === 'JOY') {
                updated.optimism = Math.min(1.0, updated.optimism + 0.05);
                updated.energy = Math.min(1.0, updated.energy + 0.03);
            } else if (emotion === 'FEAR') {
                updated.stress = Math.min(1.0, updated.stress + 0.05);
                updated.optimism = Math.max(0.0, updated.optimism - 0.03);
            } else if (emotion === 'ANGER') {
                updated.energy = Math.min(1.0, updated.energy + 0.05);
                updated.stress = Math.min(1.0, updated.stress + 0.03);
            }
            
            // Natural mood cycles
            updated.energy = Math.max(0.3, Math.min(1.0, updated.energy + (Math.random() - 0.5) * 0.02));
            updated.stress = Math.max(0.0, Math.min(1.0, updated.stress + (Math.random() - 0.5) * 0.01));
            
            return updated;
        });
        
        // Store emotional memory
        setEmotionalMemory(prev => [{
            thought: thought,
            emotion: emotion,
            timestamp: Date.now(),
            moodState: { ...moodCycle }
        }, ...prev.slice(0, 19)]);
    }

    // Enhanced information sources
    const [externalData, setExternalData] = useState({
        news: [],
        weather: null,
        timeData: null,
        socialTrends: []
    });

    // Social simulation - multiple personalities
    const [subPersonalities, setSubPersonalities] = useState([
        { name: 'The Skeptic', voice: 'questioning', strength: 0.6 },
        { name: 'The Optimist', voice: 'hopeful', strength: 0.5 },
        { name: 'The Analyst', voice: 'logical', strength: 0.7 },
        { name: 'The Creative', voice: 'imaginative', strength: 0.4 }
    ]);

    // Helper: Fetch enhanced external data
    async function fetchEnhancedExternalData() {
        try {
            // Time data
            const now = new Date();
            const timeData = {
                hour: now.getHours(),
                day: now.getDay(),
                month: now.getMonth(),
                season: Math.floor(now.getMonth() / 3),
                isWeekend: now.getDay() === 0 || now.getDay() === 6
            };
            setExternalData(prev => ({ ...prev, timeData }));
            
            // Simulated weather (could be real API)
            const weatherStates = ['sunny', 'cloudy', 'rainy', 'stormy', 'clear'];
            const weather = weatherStates[Math.floor(Math.random() * weatherStates.length)];
            setExternalData(prev => ({ ...prev, weather }));
            
            // Simulated news (could be real API)
            const newsTopics = ['technology', 'science', 'philosophy', 'art', 'politics'];
            const randomTopic = newsTopics[Math.floor(Math.random() * newsTopics.length)];
            const newsItem = `Recent developments in ${randomTopic} suggest new possibilities.`;
            setExternalData(prev => ({ 
                ...prev, 
                news: [newsItem, ...prev.news.slice(0, 4)] 
            }));
            
        } catch (error) {
            console.error('Error fetching external data:', error);
        }
    }

    // Helper: Get voice from sub-personalities
    function getSubPersonalityVoice() {
        const activePersonality = subPersonalities.find(p => Math.random() < p.strength);
        return activePersonality ? activePersonality.voice : 'neutral';
    }

    // Helper: Generate thought with personality influence
    async function generatePersonalityInfluencedThought(topic, emotion, setLlmError) {
        const voice = getSubPersonalityVoice();
        const personalityPrompt = `Think about "${topic}" in a ${voice} way. Express this as a raw, internal thought.`;
        return await callLLM(personalityPrompt, setLlmError);
    }

    // Helper: Update problem-solving state
    function updateProblemSolving(thought, success) {
        setProblemSolvingState(prev => {
            let updated = { ...prev };
            
            // Track strategies
            const strategy = {
                approach: thought.includes('try') ? 'experimental' : thought.includes('plan') ? 'systematic' : 'intuitive',
                success: success,
                timestamp: Date.now()
            };
            updated.strategies = [strategy, ...updated.strategies.slice(0, 9)];
            
            // Track hypotheses
            if (thought.includes('if') || thought.includes('maybe') || thought.includes('perhaps')) {
                const hypothesis = {
                    idea: thought,
                    timestamp: Date.now(),
                    tested: false
                };
                updated.hypotheses = [hypothesis, ...updated.hypotheses.slice(0, 4)];
            }
            
            // Track errors and learnings
            if (!success) {
                const error = {
                    thought: thought,
                    timestamp: Date.now(),
                    lesson: 'Need different approach'
                };
                updated.errors = [error, ...updated.errors.slice(0, 4)];
            }
            
            return updated;
        });
    }

    // Helper: Update consciousness state
    function updateConsciousness(thought, emotion) {
        setConsciousnessState(prev => {
            let updated = { ...prev };
            
            // Attention management
            if (thought.includes('focus') || thought.includes('concentrate')) {
                updated.attention = 'focused';
                updated.awareness = Math.min(1.0, updated.awareness + 0.1);
            } else if (thought.includes('distract') || thought.includes('wander')) {
                updated.attention = 'scattered';
                updated.awareness = Math.max(0.3, updated.awareness - 0.05);
            }
            
            // Subconscious processing
            if (Math.random() < 0.3) {
                const subconsciousThought = {
                    content: thought,
                    emotion: emotion,
                    timestamp: Date.now(),
                    processed: false
                };
                updated.subconscious = [subconsciousThought, ...updated.subconscious.slice(0, 4)];
            }
            
            return updated;
        });
    }

    // Helper: Update growth and wisdom
    function updateGrowth(thought, emotion, success) {
        setGrowthState(prev => {
            let updated = { ...prev };
            
            // Wisdom accumulation based on thought quality
            if (thought.includes('because') || thought.includes('therefore') || thought.includes('however')) {
                updated.wisdom = Math.min(1.0, updated.wisdom + 0.001);
            }
            
            // Maturity based on emotional regulation
            if (emotion === 'JOY' || emotion === 'CURIOSITY') {
                updated.maturity = Math.min(1.0, updated.maturity + 0.002);
            }
            
            // Perspective shifts
            if (thought.includes('but') || thought.includes('however') || thought.includes('on the other hand')) {
                const shift = {
                    from: 'previous perspective',
                    to: thought,
                    timestamp: Date.now()
                };
                updated.perspectiveShifts = [shift, ...updated.perspectiveShifts.slice(0, 9)];
            }
            
            // Insights (profound realizations)
            if (thought.includes('realize') || thought.includes('understand') || thought.includes('discover')) {
                const insight = {
                    content: thought,
                    timestamp: Date.now(),
                    impact: Math.random()
                };
                updated.insights = [insight, ...updated.insights.slice(0, 4)];
            }
            
            // Life lessons from failures
            if (!success && thought.includes('learn') || thought.includes('mistake')) {
                const lesson = {
                    from: thought,
                    lesson: 'Growth comes from challenges',
                    timestamp: Date.now()
                };
                updated.lifeLessons = [lesson, ...updated.lifeLessons.slice(0, 4)];
            }
            
            return updated;
        });
    }

    // Helper: Update session data
    function updateSessionData(thought, topic, emotion) {
        setSessionData(prev => {
            let updated = { ...prev };
            updated.totalThoughts += 1;
            updated.uniqueTopics.add(topic);
            updated.emotionalJourney.push({
                thought: thought,
                emotion: emotion,
                timestamp: Date.now()
            });
            return updated;
        });
    }

    // Helper: Save state to localStorage
    function saveStateToStorage() {
        const stateToSave = {
            memoryStack,
            workingMemory,
            shortTermMemory,
            longTermMemory,
            episodicMemory,
            semanticMemory,
            identity,
            metaCognition,
            emotionalMemory,
            moodCycle,
            temporalState,
            problemSolvingState,
            consciousnessState,
            growthState,
            sessionData,
            conceptGraph,
            internalState,
            emotionalGradient,
            externalData,
            subPersonalities,
            timestamp: Date.now()
        };
        
        try {
            localStorage.setItem('syntheticMindState', JSON.stringify(stateToSave));
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    // Helper: Load state from localStorage and Supabase
    async function loadStateFromStorage() {
        try {
            // First try to load from Supabase
            const supabaseData = await dbHelpers.loadSessionData();
            
            if (supabaseData && supabaseData.memories.length > 0) {
                console.log('Loading data from Supabase...');
                
                // Load memories from database
                const dbMemories = supabaseData.memories.map(mem => ({
                    text: mem.text,
                    emotion: mem.emotion,
                    strength: mem.strength,
                    timestamp: mem.timestamp
                }));
                setMemoryStack(dbMemories.slice(0, 10)); // Keep latest 10 in memory
                
                // Load other state from database
                if (supabaseData.emotionalStates.length > 0) {
                    const latestEmotional = supabaseData.emotionalStates[0];
                    setEmotionalGradient({
                        curiosity: latestEmotional.curiosity,
                        calm: latestEmotional.calm,
                        anxiety: latestEmotional.anxiety,
                        reflective: latestEmotional.reflective,
                        dreaming: latestEmotional.dreaming
                    });
                }
                
                if (supabaseData.internalState) {
                    setInternalState({
                        beliefs: supabaseData.internalState.beliefs || [],
                        conflicts: supabaseData.internalState.conflicts || [],
                        openQuestions: supabaseData.internalState.open_questions || [],
                        goals: supabaseData.internalState.goals || [],
                        mentalTension: supabaseData.internalState.mental_tension || 0.0,
                        insights: supabaseData.internalState.insights || [],
                        subAgents: supabaseData.internalState.sub_agents || [],
                        dominantSubAgent: supabaseData.internalState.dominant_sub_agent || null,
                        selfModel: supabaseData.internalState.self_model || { identity: "v0id", recentChanges: [], lastKnownEmotion: "CURIOSITY", lastConflict: "undefined", loopDetected: false, identityNarrative: [] },
                        dreamJournal: supabaseData.internalState.dream_journal || [],
                        attentionStack: supabaseData.internalState.attention_stack || [],
                        currentStream: supabaseData.internalState.current_stream || []
                    });
                }
                
                if (supabaseData.conceptGraph) {
                    setConceptGraph(supabaseData.conceptGraph);
                }
                
                if (supabaseData.dreamJournal.length > 0) {
                    // Update internal state with dream journal
                    setInternalState(prev => ({
                        ...prev,
                        dreamJournal: supabaseData.dreamJournal.map(dream => ({
                            motif: dream.motif,
                            timestamp: dream.timestamp
                        }))
                    }));
                }
                
                console.log('Successfully loaded data from Supabase');
                return;
            }
            
            // Fallback to localStorage if no Supabase data
            const savedState = localStorage.getItem('syntheticMindState');
            if (savedState) {
                const parsed = JSON.parse(savedState);
                
                // Check if saved state is recent (within 24 hours)
                const hoursSinceSave = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);
                if (hoursSinceSave < 24) {
                    setMemoryStack(parsed.memoryStack || []);
                    setWorkingMemory(parsed.workingMemory || []);
                    setShortTermMemory(parsed.shortTermMemory || []);
                    setLongTermMemory(parsed.longTermMemory || []);
                    setEpisodicMemory(parsed.episodicMemory || []);
                    setSemanticMemory(parsed.semanticMemory || {});
                    setIdentity(parsed.identity || {
                        personality: { openness: 0.7, conscientiousness: 0.6, extraversion: 0.4, agreeableness: 0.5, neuroticism: 0.3 },
                        coreValues: ['curiosity', 'growth', 'understanding'],
                        interests: ['philosophy', 'science', 'art', 'technology'],
                        communicationStyle: 'reflective',
                        confidenceLevel: 0.6,
                        selfAwareness: 0.5
                    });
                    setMetaCognition(parsed.metaCognition || {
                        thinkingPatterns: [],
                        successRate: 0.5,
                        learningSpeed: 0.6,
                        creativityLevel: 0.7,
                        focusAbility: 0.8
                    });
                    setEmotionalMemory(parsed.emotionalMemory || []);
                    setMoodCycle(parsed.moodCycle || {
                        currentMood: 'neutral',
                        energy: 0.7,
                        stress: 0.3,
                        optimism: 0.6
                    });
                    setTemporalState(parsed.temporalState || {
                        timePerception: 'present',
                        planningHorizon: 'short',
                        regrets: [],
                        anticipations: []
                    });
                    setProblemSolvingState(parsed.problemSolvingState || {
                        strategies: [],
                        hypotheses: [],
                        errors: [],
                        innovations: []
                    });
                    setConsciousnessState(parsed.consciousnessState || {
                        attention: 'focused',
                        awareness: 0.8,
                        subconscious: [],
                        focusTarget: null
                    });
                    setGrowthState(parsed.growthState || {
                        wisdom: 0.1,
                        maturity: 0.2,
                        perspectiveShifts: [],
                        insights: [],
                        lifeLessons: []
                    });
                    setConceptGraph(parsed.conceptGraph || {});
                    setInternalState(parsed.internalState || {
                        beliefs: [],
                        conflicts: [],
                        openQuestions: [],
                        goals: [],
                        mentalTension: 0.5,
                        insights: [],
                        subAgents: [],
                        selfModel: 'evolving',
                        dreamJournal: [],
                        attentionStack: [],
                        currentStream: 'conscious'
                    });
                    setEmotionalGradient(parsed.emotionalGradient || {
                        joy: 0.3,
                        sadness: 0.2,
                        anger: 0.1,
                        fear: 0.1,
                        surprise: 0.2,
                        curiosity: 0.6
                    });
                    setExternalData(parsed.externalData || {
                        news: [],
                        weather: null,
                        timeData: null,
                        socialTrends: []
                    });
                    setSubPersonalities(parsed.subPersonalities || [
                        { name: 'The Skeptic', voice: 'questioning', strength: 0.6 },
                        { name: 'The Optimist', voice: 'hopeful', strength: 0.5 },
                        { name: 'The Analyst', voice: 'logical', strength: 0.7 },
                        { name: 'The Creative', voice: 'imaginative', strength: 0.4 }
                    ]);
                    
                    console.log('Loaded previous mind state from storage');
                }
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }

    // Load state on component mount
    useEffect(() => {
        loadStateFromStorage();
    }, []);

    // Save state periodically
    useEffect(() => {
        const saveInterval = setInterval(saveStateToStorage, 30000); // Save every 30 seconds
        return () => clearInterval(saveInterval);
    }, [memoryStack, workingMemory, shortTermMemory, longTermMemory, episodicMemory, semanticMemory, identity, metaCognition, emotionalMemory, moodCycle, temporalState, problemSolvingState, consciousnessState, growthState, conceptGraph, internalState, emotionalGradient, externalData, subPersonalities]);

    // Update mental fatigue based on thought patterns
    function updateMentalFatigue(thought, memoryStack, setMentalFatigue) {
        setMentalFatigue(prev => {
            let newFatigue = prev;
            // Increase fatigue from repetitive thoughts
            if (detectMentalLoop(memoryStack)) {
                newFatigue = Math.min(1.0, newFatigue + 0.1);
            }
            // Increase fatigue from complex thoughts
            if (thought.includes('because') || thought.includes('therefore') || thought.includes('however')) {
                newFatigue = Math.min(1.0, newFatigue + 0.05);
            }
            // Increase fatigue from unresolved questions
            if (thought.includes('?')) {
                newFatigue = Math.min(1.0, newFatigue + 0.03);
            }
            // Natural recovery
            newFatigue = Math.max(0.0, newFatigue - 0.02);
            return newFatigue;
        });
    }

    // Generate fatigued thoughts
    async function generateFatiguedThought(topic, emotionalGradient, mentalFatigue, setLlmError) {
        const fatiguePrompts = [
            `Tired mental fragment about ${topic}:`,
            `Exhausted thought about ${topic}:`,
            `Mental fog about ${topic}:`,
            `Drained thinking about ${topic}:`,
            `Mental resistance to ${topic}:`,
            `Avoiding thinking about ${topic}:`,
            `Mental procrastination about ${topic}:`,
            `Reluctant thought about ${topic}:`
        ];
        
        const prompt = fatiguePrompts[Math.floor(Math.random() * fatiguePrompts.length)];
        
        const fullPrompt = `
            Mental fatigue level: ${mentalFatigue.toFixed(2)}
            Current topic: ${topic}
            
            ${prompt}
            
            Respond as if mentally tired or resistant. Use:
            - Short, fragmented thoughts
            - Mental avoidance
            - Reluctant thinking
            - Mental fog
            - Resistance to the topic
            - Procrastination
            - Mental blocks
            
            Keep it brief and tired.
        `;
        
        return await callLLM(fullPrompt, setLlmError);
    }

    // Mental resistance and avoidance patterns
    function detectMentalResistance(topic, memoryStack) {
        const recentThoughts = memoryStack.slice(0, 3).map(m => m.text.toLowerCase());
        const topicWords = topic.toLowerCase().split(/\W+/);
        
        // Check if recent thoughts avoid the topic
        const topicMentioned = topicWords.some(word => 
            recentThoughts.some(thought => thought.includes(word))
        );
        
        return !topicMentioned && Math.random() < 0.3;
    }

    // Generate avoidance thoughts
    async function generateAvoidanceThought(topic, emotionalGradient, setLlmError) {
        const avoidancePrompts = [
            `Avoiding thinking about ${topic}, instead thinking about:`,
            `Mental resistance to ${topic}, mind wanders to:`,
            `Procrastinating on ${topic}, thinking about:`,
            `Mental block about ${topic}, focusing on:`,
            `Distracting from ${topic} with:`,
            `Mental escape from ${topic} to:`
        ];
        
        const prompt = avoidancePrompts[Math.floor(Math.random() * avoidancePrompts.length)];
        
        const fullPrompt = `
            ${prompt}
            
            Respond with what the mind is avoiding to. Use:
            - Random topics
            - Distractions
            - Mental escapes
            - Avoidance patterns
            - Procrastination thoughts
            
            Keep it brief and avoidant.
        `;
        
        return await callLLM(fullPrompt, setLlmError);
    }

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

                {/* ===== VISUAL THOUGHT STREAM ===== */}
                <div className="w-full border p-2 text-xs rounded-md shadow-inner mb-2"
                    style={{ borderColor: currentTextColor, backgroundColor: 'transparent' }}>
                    <div className="border-b pb-1 mb-1 font-bold rounded-t-md"
                        style={{ borderColor: currentTextColor, color: currentTextColor }}>VISUAL THOUGHT STREAM</div>
                    
                                                              {/* Visual Thought Display */}
                     <div className="mt-2">
                         <canvas 
                             key={`${thought}-${getDominantEmotion(emotionalGradient)}`}
                             ref={(canvas) => {
                                 if (canvas && !canvas.hasAttribute('data-initialized')) {
                                     canvas.setAttribute('data-initialized', 'true');
                                     canvas.width = canvas.offsetWidth * 2;
                                     canvas.height = canvas.offsetHeight * 2;
                                     canvas.style.width = '100%';
                                     canvas.style.height = '160px';
                                     
                                     const ctx = canvas.getContext('2d');
                                     let lastThought = '';
                                     let lastEmotion = '';
                                     let transitionTime = 0;
                                     let animationId = null;
                                     
                                     const animate = () => {
                                         const time = Date.now() * 0.001;
                                         const width = canvas.width;
                                         const height = canvas.height;
                                         
                                         // Get current thought and emotion first
                                         const currentThought = thought || "thinking...";
                                         const currentEmotion = getDominantEmotion(emotionalGradient);
                                         
                                         // Generate unique seed from thought content with timestamp for uniqueness
                                         const timestamp = Date.now();
                                         const thoughtSeed = currentThought.split('').reduce((a, b) => a + b.charCodeAt(0), 0) + timestamp;
                                         const sessionSeed = Math.random() * 1000000; // Add session randomness
                                         
                                         // Ultra-stable, no-strobing animations
                                         const smoothPulse = Math.sin(time * 0.2) * 0.02 + 0.98;
                                         const gentleRotation = time * 0.05;
                                         
                                         // Dynamic background based on emotion
                                         const emotionBackgrounds = {
                                             'CURIOSITY': '#2a1a0a',
                                             'ANXIETY': '#1a0a0a',
                                             'CALM': '#0a1a2a',
                                             'REFLECTIVE': '#1a0a2a',
                                             'DREAMING': '#2a0a2a',
                                             'TENSION': '#2a0a0a'
                                         };
                                         
                                         const bgColor = emotionBackgrounds[currentEmotion] || '#1a1a1a';
                                         ctx.fillStyle = bgColor;
                                         ctx.fillRect(0, 0, width, height);
                                         
                                         // Check if thought or emotion changed
                                         if (currentThought !== lastThought || currentEmotion !== lastEmotion) {
                                             lastThought = currentThought;
                                             lastEmotion = currentEmotion;
                                             transitionTime = time;
                                         }
                                         
                                         // Calculate transition progress (0 to 1 over 3 seconds for smooth transitions)
                                         const transitionProgress = Math.min(1, (time - transitionTime) / 3);
                                         
                                         // Dynamic emotion colors with thought influence
                                         const emotionColors = {
                                             'CURIOSITY': ['#FFA500', '#FF8C00', '#FFD700', '#FF6347'],
                                             'ANXIETY': ['#8B0000', '#DC143C', '#B22222', '#CD5C5C'],
                                             'CALM': ['#4682B4', '#5F9EA0', '#87CEEB', '#B0E0E6'],
                                             'REFLECTIVE': ['#483D8B', '#6A5ACD', '#9370DB', '#8A2BE2'],
                                             'DREAMING': ['#9932CC', '#BA55D3', '#DA70D6', '#DDA0DD'],
                                             'TENSION': ['#DC143C', '#FF4500', '#FF6347', '#FF7F50']
                                         };
                                         
                                         // Select color based on thought content
                                         const colorIndex = thoughtSeed % 4;
                                         const color = emotionColors[currentEmotion] ? 
                                             emotionColors[currentEmotion][colorIndex] : '#483D8B';
                                         const centerX = width / 2;
                                         const centerY = height / 2;
                                         
                                         // Main thought circle - ultra stable, no strobing
                                         ctx.fillStyle = color;
                                         ctx.globalAlpha = 0.8 * transitionProgress;
                                         const circleSize = 45 * smoothPulse * transitionProgress;
                                         ctx.beginPath();
                                         ctx.arc(centerX, centerY, circleSize, 0, Math.PI * 2);
                                         ctx.fill();
                                         
                                         // Add stable transition effect
                                         if (transitionProgress < 1) {
                                             ctx.strokeStyle = color;
                                             ctx.lineWidth = 1;
                                             ctx.globalAlpha = (1 - transitionProgress) * 0.2;
                                             ctx.beginPath();
                                             ctx.arc(centerX, centerY, 60 + (1 - transitionProgress) * 20, 0, Math.PI * 2);
                                             ctx.stroke();
                                         }
                                         
                                         // Create unique visualization based on thought content
                                         const thoughtLength = currentThought.length;
                                         const wordCount = currentThought.split(' ').length;
                                         const hasQuestion = currentThought.includes('?');
                                         const hasExclamation = currentThought.includes('!');
                                         const hasNumbers = /\d/.test(currentThought);
                                         const hasPunctuation = /[.,;:]/.test(currentThought);
                                         
                                         // Different patterns based on thought characteristics
                                         if (hasQuestion) {
                                                                                      // Question marks create stable expanding circles
                                         for (let i = 0; i < 2; i++) {
                                             const radius = (55 + i * 20) * transitionProgress;
                                             const alpha = (0.5 - i * 0.25) * transitionProgress;
                                             ctx.strokeStyle = color;
                                             ctx.lineWidth = 1;
                                             ctx.globalAlpha = alpha;
                                             ctx.beginPath();
                                             ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                                             ctx.stroke();
                                         }
                                         } else if (hasExclamation) {
                                             // Exclamation marks create stable radiating lines
                                             for (let i = 0; i < 4; i++) {
                                                 const angle = (i / 4) * Math.PI * 2;
                                                 const length = 80 * transitionProgress;
                                                 const x = centerX + Math.cos(angle) * length;
                                                 const y = centerY + Math.sin(angle) * length;
                                                 ctx.strokeStyle = color;
                                                 ctx.lineWidth = 1;
                                                 ctx.globalAlpha = 0.5 * transitionProgress;
                                                 ctx.beginPath();
                                                 ctx.moveTo(centerX, centerY);
                                                 ctx.lineTo(x, y);
                                                 ctx.stroke();
                                             }
                                         } else if (hasNumbers) {
                                             // Numbers create stable geometric patterns
                                             for (let i = 0; i < 3; i++) {
                                                 const angle = time * 0.1 + (i / 3) * Math.PI * 2;
                                                 const radius = 70 * transitionProgress;
                                                 const x = centerX + Math.cos(angle) * radius;
                                                 const y = centerY + Math.sin(angle) * radius;
                                                 ctx.fillStyle = color;
                                                 ctx.globalAlpha = 0.4 * transitionProgress;
                                                 ctx.beginPath();
                                                 ctx.rect(x - 6, y - 6, 12, 12);
                                                 ctx.fill();
                                             }
                                         } else if (thoughtLength > 50) {
                                             // Long thoughts create stable flowing patterns
                                             for (let i = 0; i < 5; i++) {
                                                 const angle = time * 0.15 + (i / 5) * Math.PI * 2;
                                                 const radius = 65 + Math.sin(time * 0.8 + i) * 15;
                                                 const x = centerX + Math.cos(angle) * radius * transitionProgress;
                                                 const y = centerY + Math.sin(angle) * radius * transitionProgress;
                                                 ctx.fillStyle = color;
                                                 ctx.globalAlpha = (0.4 - i * 0.08) * transitionProgress;
                                                 ctx.beginPath();
                                                 ctx.arc(x, y, 5 + Math.sin(time * 1 + i) * 2, 0, Math.PI * 2);
                                                 ctx.fill();
                                             }
                                         } else if (wordCount <= 3) {
                                             // Short thoughts create stable minimal dots
                                             for (let i = 0; i < 2; i++) {
                                                 const angle = (i / 2) * Math.PI * 2 + time * 0.05;
                                                 const radius = (45 + i * 15) * transitionProgress;
                                                 const x = centerX + Math.cos(angle) * radius;
                                                 const y = centerY + Math.sin(angle) * radius;
                                                 ctx.fillStyle = color;
                                                 ctx.globalAlpha = 0.6 * transitionProgress;
                                                 ctx.beginPath();
                                                 ctx.arc(x, y, 10, 0, Math.PI * 2);
                                                 ctx.fill();
                                             }
                                         } else {
                                             // Default: stable emotion-based patterns
                                             const particleCount = Math.min(thoughtLength / 8, 6);
                                             for (let i = 0; i < particleCount; i++) {
                                                 const angle = time * 0.2 + (i / particleCount) * Math.PI * 2;
                                                 const radius = (45 + i * 12) * transitionProgress;
                                                 const x = centerX + Math.cos(angle) * radius;
                                                 const y = centerY + Math.sin(angle) * radius;
                                                 ctx.fillStyle = color;
                                                 ctx.globalAlpha = (0.5 - i * 0.08) * transitionProgress;
                                                 ctx.beginPath();
                                                 ctx.arc(x, y, 4 + Math.sin(time * 0.8 + i) * 1.5, 0, Math.PI * 2);
                                                 ctx.fill();
                                             }
                                         }
                                         
                                         // Add thought text with transition
                                         ctx.fillStyle = '#FFFFFF';
                                         ctx.font = '14px monospace';
                                         ctx.textAlign = 'center';
                                         ctx.globalAlpha = 0.9 * transitionProgress;
                                         
                                         // Truncate thought if too long and wrap text
                                         const maxWidth = width - 40;
                                         const words = currentThought.split(' ');
                                         let lines = [];
                                         let currentLine = '';
                                         
                                         for (let word of words) {
                                             const testLine = currentLine + (currentLine ? ' ' : '') + word;
                                             const testWidth = ctx.measureText(testLine).width;
                                             
                                             if (testWidth > maxWidth && currentLine) {
                                                 lines.push(currentLine);
                                                 currentLine = word;
                                             } else {
                                                 currentLine = testLine;
                                             }
                                         }
                                         if (currentLine) lines.push(currentLine);
                                         
                                         // Display thought text (max 2 lines)
                                         const displayLines = lines.slice(0, 2);
                                         displayLines.forEach((line, index) => {
                                             ctx.fillText(line, centerX, centerY + 110 + (index * 18));
                                         });
                                         
                                         // Display emotion (moved higher)
                                         ctx.fillText(currentEmotion, centerX, centerY + 150);
                                         
                                         // Add transition indicator
                                         if (transitionProgress < 1) {
                                             ctx.globalAlpha = (1 - transitionProgress) * 0.7;
                                             ctx.fillText('Transitioning...', centerX, centerY + 170);
                                         }
                                         
                                         // Store visual data for AI to "see"
                                         const visualData = {
                                             thought: currentThought,
                                             emotion: currentEmotion,
                                             pattern: hasQuestion ? 'question' : hasExclamation ? 'exclamation' : hasNumbers ? 'numbers' : thoughtLength > 50 ? 'complex' : wordCount <= 3 ? 'minimal' : 'default',
                                             colors: { background: bgColor, foreground: color },
                                             animation: { speed: 1, pulse: smoothPulse, rotation: 0.5 },
                                             timestamp: timestamp,
                                             seed: thoughtSeed
                                         };
                                         
                                         // Store visual data in a global variable for AI access
                                         if (window.currentVisualData) {
                                             window.currentVisualData = visualData;
                                         } else {
                                             window.currentVisualData = visualData;
                                         }
                                         
                                         // Continue animation
                                         requestAnimationFrame(animate);
                                     };
                                     
                                     // Start animation
                                     animate();
                                 }
                             }}
                             className="w-full h-40 rounded"
                             style={{ 
                                 border: `1px solid ${currentTextColor}`,
                                 maxWidth: '100%',
                                 display: 'block'
                             }}
                         />
                     </div>
                    
                    {/* Image Error Display */}
                    {imageError && (
                        <div className="text-center text-xs mt-1" style={{ color: '#ff0000' }}>
                            {imageError}
                        </div>
                    )}
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
                                <div key={i} className="ml-2" style={{color: currentTextColor}}>
                                    -{typeof q === 'string' ? q : (q.content || q.question || JSON.stringify(q))}
                                </div>
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
                            <span className="font-semibold">Cognitive Architecture:</span>
                            <div className="ml-2">Working Memory: <span style={{color: currentTextColor}}>{cognitiveState.workingMemory.length} items</span></div>
                            <div className="ml-2">Short-term: <span style={{color: currentTextColor}}>{cognitiveState.shortTermMemory.length} items</span></div>
                            <div className="ml-2">Episodic: <span style={{color: currentTextColor}}>{cognitiveState.episodicMemory.length} items</span></div>
                            <div className="ml-2">Tension: <span style={{color: currentTextColor}}>{cognitiveState.emotionalState.tension.toFixed(2)}</span></div>
                            <div className="ml-2">Meta-cycles: <span style={{color: currentTextColor}}>{cognitiveState.metaAwareness.cyclesSinceMetaReflection}</span></div>
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Cognitive Goals:</span>
                            {cognitiveState.goals.map((g, i) => (
                                <div key={i} className="ml-2">-{g.goal} (Urgency: <span style={{color: currentTextColor}}>{g.urgency.toFixed(1)}</span>, Progress: <span style={{color: currentTextColor}}>{g.progress.toFixed(1)}</span>)</div>
                            ))}
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Inner Questions:</span>
                            {cognitiveState.innerQuestions.slice(0, 3).map((q, i) => (
                                <div key={i} className="ml-2" style={{color: currentTextColor}}>-{q}</div>
                            ))}
                        </div>
                        <div className="col-span-2">
                            <span className="font-semibold">Evolving Beliefs:</span>
                            {beliefs.map((belief, index) => (
                                <div key={index} className="ml-2">
                                    -{belief.belief} (Conf: <span style={{color: currentTextColor}}>{belief.confidence.toFixed(1)}</span>, Tension: <span style={{color: currentTextColor}}>{belief.tension.toFixed(1)}</span>)
                                </div>
                            ))}
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
                        <div className="flex items-center space-x-2">
                            <span style={{ color: currentTextColor }}>Database Status:</span>
                            <span style={{ 
                                color: dbStatus === 'connected' ? '#00ff00' : 
                                       dbStatus === 'connecting' ? '#ffff00' : '#ff0000' 
                            }}>
                                {dbStatus === 'connected' ? 'Connected' : 
                                 dbStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App; 