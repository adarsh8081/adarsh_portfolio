# MyPortfolio Development Startup Script
# This script starts both the backend server and frontend web application

Write-Host "Starting MyPortfolio Development Environment..." -ForegroundColor Green

# Change to project root
Set-Location $PSScriptRoot

# Check if Node.js is installed
if (!(Get-Command "node" -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is not installed or not in PATH. Please install Node.js first."
    exit 1
}

# Check if npm is installed
if (!(Get-Command "npm" -ErrorAction SilentlyContinue)) {
    Write-Error "npm is not installed or not in PATH. Please install npm first."
    exit 1
}

Write-Host "Starting Backend Server..." -ForegroundColor Yellow

# Start the backend server in a new PowerShell process
$serverProcess = Start-Process -FilePath "powershell.exe" -ArgumentList "-Command", "Set-Location '$PSScriptRoot\server'; npm run dev" -WindowStyle Normal -PassThru

# Wait a moment for the server to start
Start-Sleep -Seconds 3

Write-Host "Starting Frontend Web Application..." -ForegroundColor Yellow

# Start the frontend in a new PowerShell process
$webProcess = Start-Process -FilePath "powershell.exe" -ArgumentList "-Command", "Set-Location '$PSScriptRoot\web'; npm run dev" -WindowStyle Normal -PassThru

Write-Host ""
Write-Host "Development environment started!" -ForegroundColor Green
Write-Host "- Backend API: http://localhost:4000" -ForegroundColor Cyan
Write-Host "- Frontend Web: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the development environment" -ForegroundColor Yellow

# Wait for Ctrl+C to stop both processes
try {
    while ($true) {
        Start-Sleep -Seconds 1
        
        # Check if processes are still running
        if ($serverProcess.HasExited) {
            Write-Warning "Backend server process has stopped unexpectedly"
        }
        if ($webProcess.HasExited) {
            Write-Warning "Frontend web process has stopped unexpectedly"
        }
    }
} finally {
    Write-Host ""
    Write-Host "Stopping development environment..." -ForegroundColor Red
    
    # Stop both processes
    if (!$serverProcess.HasExited) {
        Stop-Process -Id $serverProcess.Id -Force -ErrorAction SilentlyContinue
        Write-Host "Backend server stopped" -ForegroundColor Red
    }
    
    if (!$webProcess.HasExited) {
        Stop-Process -Id $webProcess.Id -Force -ErrorAction SilentlyContinue
        Write-Host "Frontend web stopped" -ForegroundColor Red
    }
    
    Write-Host "Development environment stopped" -ForegroundColor Red
}
