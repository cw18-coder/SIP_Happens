@echo off
echo.
echo ==========================================
echo   Mutual Fund Workshop Presentation
echo ==========================================
echo.
echo Starting local web server for the presentation...
echo.

REM Check if Node.js is available first
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Node.js to start web server...
    echo.
    echo Installing serve package...
    npm install -g serve
    echo.
    echo Presentation will be available at:
    echo http://localhost:3000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    cd /d "%~dp0"
    npx serve . -p 3000
    goto :end
)

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python to start web server...
    echo.
    echo Presentation will be available at:
    echo http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    cd /d "%~dp0"
    python -m http.server 8000
    goto :end
)

REM Fallback to opening file directly
echo.
echo Python and Node.js not found.
echo Opening presentation directly in browser...
echo.
echo Note: If slides don't load properly, please:
echo 1. Install Python or Node.js
echo 2. Run this script again
echo 3. Or use VS Code Live Server extension
echo.
start "" "index.html"

:end
echo.
echo Presentation stopped.
pause
