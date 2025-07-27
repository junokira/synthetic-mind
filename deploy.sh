#!/bin/bash

echo "🚀 Deploying v0id-mind-app..."

# Build the app
echo "📦 Building app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create a simple server to serve the app
    echo "🌐 Starting server..."
    echo "📱 App will be available at: http://localhost:3000"
    echo "🔄 Press Ctrl+C to stop the server"
    
    # Serve the built app
    npx serve -s build -l 3000
else
    echo "❌ Build failed!"
    exit 1
fi 