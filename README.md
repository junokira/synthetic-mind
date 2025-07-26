# Synthetic Mind Retro UI

A React-based AI consciousness simulation that generates realistic internal monologue using LLM technology.

## Features

- **Real-time Thought Generation**: Uses Gemini API to generate realistic, fragmented internal thoughts
- **Emotional Gradient System**: Dynamic emotional states that influence thought patterns
- **Memory Stack**: Persistent memory system with decay and strength tracking
- **Dream Mode**: Occasional dream-like associative thinking
- **Retro CRT UI**: Authentic retro computer terminal aesthetic
- **Internal State Modeling**: Complex cognitive state including beliefs, conflicts, and goals
- **Sub-Agent System**: Jungian-inspired internal voices (Rational, Shadow, Anima)
- **Concept Graph**: Dynamic neural network of connected concepts
- **Theory of Mind**: Simulated observer with presumed beliefs about the AI

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Gemini API key (optional - for full functionality)

## Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd v0id-mind-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

### API Key Setup (Optional)

The application can run without an API key, but for full thought generation functionality, you'll need a Gemini API key:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. The application expects the API key to be provided by the environment (e.g., Canvas)
3. If running locally, you can modify the `apiKey` variable in `src/App.jsx` (line ~50)

## Running the Application

### Development Mode

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

### Production Build

Build the application for production:
```bash
npm run build
```

The built files will be in the `build` directory.

## Usage

1. **Initialization**: The synthetic mind will start with basic initialization thoughts
2. **Thought Generation**: New thoughts are generated every 12 seconds by default
3. **Memory System**: Recent thoughts are stored in the memory stack with strength decay
4. **Emotional States**: The system maintains an emotional gradient that influences thought patterns
5. **Dream Mode**: Occasionally enters dream mode for more associative thinking
6. **Settings**: Toggle experimental features like real internet feed

## UI Components

- **Real-time Thought Stream**: Shows the current thought being generated
- **Memory Stack**: Displays recent thoughts with emotion tags and strength
- **Internal State**: Shows beliefs, conflicts, goals, and other cognitive elements
- **Canvas Animation**: Dynamic visual representation of the mind's activity
- **Settings Panel**: Configuration options

## Technical Details

- **Framework**: React 18 with hooks
- **Styling**: Tailwind CSS with custom CRT effects
- **State Management**: React useState and useEffect
- **API**: Gemini 2.0 Flash for thought generation
- **Storage**: LocalStorage for persistence across sessions

## Troubleshooting

### LLM Errors
If you see LLM errors:
1. Check your API key configuration
2. Ensure you have internet connectivity
3. Verify the Gemini API is accessible

### Performance Issues
- The application uses localStorage extensively - clear browser data if needed
- Reduce the thought interval if the 12-second default is too frequent

## Development

The application is structured as a single React component with helper functions. Key files:

- `src/App.jsx`: Main React component with all logic
- `src/index.js`: Application entry point
- `public/index.html`: HTML template with CSS animations

## License

ISC License - see package.json for details 