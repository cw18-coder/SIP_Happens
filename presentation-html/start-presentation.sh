#!/bin/bash

echo
echo "=========================================="
echo "   Mutual Fund Workshop Presentation"
echo "=========================================="
echo
echo "Starting local web server for the presentation..."
echo

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

# Check if Node.js is available first
if command -v node &> /dev/null; then
    echo "Using Node.js to start web server..."
    echo
    echo "Installing serve package..."
    npm install -g serve
    echo
    echo "Presentation will be available at:"
    echo "http://localhost:3000"
    echo
    echo "Press Ctrl+C to stop the server"
    echo
    npx serve . -p 3000
    exit 0
fi

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "Using Python3 to start web server..."
    echo
    echo "Presentation will be available at:"
    echo "http://localhost:8000"
    echo
    echo "Press Ctrl+C to stop the server"
    echo
    python3 -m http.server 8000
    exit 0
elif command -v python &> /dev/null; then
    echo "Using Python to start web server..."
    echo
    echo "Presentation will be available at:"
    echo "http://localhost:8000"
    echo
    echo "Press Ctrl+C to stop the server"
    echo
    python -m http.server 8000
    exit 0
fi

# Fallback to opening file directly
echo
echo "Python and Node.js not found."
echo "Opening presentation directly in browser..."
echo
echo "Note: If slides don't load properly, please:"
echo "1. Install Python or Node.js"
echo "2. Run this script again"
echo "3. Or use VS Code Live Server extension"
echo

# Try different methods to open the browser depending on the OS
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    xdg-open "index.html" &> /dev/null || echo "Could not open browser automatically. Please open index.html manually."
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
    open "index.html" &> /dev/null || echo "Could not open browser automatically. Please open index.html manually."
elif [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
    # Windows (Git Bash, Cygwin, etc.)
    start "index.html" &> /dev/null || echo "Could not open browser automatically. Please open index.html manually."
else
    echo "Could not detect OS. Please open index.html manually in your browser."
fi

echo
echo "Presentation stopped."
echo "Press any key to continue..."
read -n 1 -s
