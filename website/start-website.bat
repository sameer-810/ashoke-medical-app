@echo off
REM Double-click this file to start the Ashok Medical website.
cd /d "%~dp0"
if not exist "node_modules" call npm install
if not exist "dist\index.html" call npm run build
echo.
echo Website starting at http://localhost:5000  (keep this window open; close it to stop)
echo.
start "" http://localhost:5000
npm start
pause
