# Portfolio Deployment Script for Windows PowerShell
# This script helps deploy your portfolio to production

param(
    [switch]$SkipTests,
    [switch]$SkipBuild,
    [string]$Environment = "production"
)

Write-Host "🚀 Portfolio Deployment Script" -ForegroundColor Blue
Write-Host "================================" -ForegroundColor Blue

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if required tools are installed
function Test-Dependencies {
    Write-Status "Checking dependencies..."
    
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Error "Node.js is not installed. Please install Node.js 20+"
        exit 1
    }
    
    if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
        Write-Error "npm is not installed. Please install npm"
        exit 1
    }
    
    if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
        Write-Error "Python is not installed. Please install Python 3.10+"
        exit 1
    }
    
    Write-Success "All dependencies are installed"
}

# Build frontend
function Build-Frontend {
    Write-Status "Building frontend..."
    Set-Location web
    
    if (-not (Test-Path "package.json")) {
        Write-Error "package.json not found in web directory"
        exit 1
    }
    
    npm install
    npm run build
    
    Write-Success "Frontend built successfully"
    Set-Location ..
}

# Build backend
function Build-Backend {
    Write-Status "Building backend..."
    Set-Location server
    
    if (-not (Test-Path "package.json")) {
        Write-Error "package.json not found in server directory"
        exit 1
    }
    
    npm install
    npm run build
    
    Write-Success "Backend built successfully"
    Set-Location ..
}

# Build Python service
function Build-Python {
    Write-Status "Building Python service..."
    Set-Location python
    
    if (-not (Test-Path "requirements.txt")) {
        Write-Error "requirements.txt not found in python directory"
        exit 1
    }
    
    python -m venv venv
    & .\venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    
    Write-Success "Python service built successfully"
    Set-Location ..
}

# Run tests
function Test-Application {
    Write-Status "Running tests..."
    
    # Test frontend build
    Set-Location web
    npm run lint
    Set-Location ..
    
    # Test backend build
    Set-Location server
    npm run build
    Set-Location ..
    
    Write-Success "All tests passed"
}

# Create deployment package
function New-DeploymentPackage {
    Write-Status "Creating deployment package..."
    
    # Create deployment directory
    if (Test-Path "deployment") {
        Remove-Item -Recurse -Force deployment
    }
    New-Item -ItemType Directory -Path deployment | Out-Null
    
    # Copy frontend build
    New-Item -ItemType Directory -Path deployment\frontend | Out-Null
    Copy-Item -Path web\.next -Destination deployment\frontend\.next -Recurse
    Copy-Item -Path web\package.json -Destination deployment\frontend\
    Copy-Item -Path web\next.config.ts -Destination deployment\frontend\
    Copy-Item -Path web\vercel.json -Destination deployment\frontend\
    
    # Copy backend build
    New-Item -ItemType Directory -Path deployment\backend | Out-Null
    Copy-Item -Path server\dist -Destination deployment\backend\dist -Recurse
    Copy-Item -Path server\package.json -Destination deployment\backend\
    Copy-Item -Path server\Dockerfile -Destination deployment\backend\
    Copy-Item -Path server\railway.json -Destination deployment\backend\
    Copy-Item -Path server\prisma -Destination deployment\backend\prisma -Recurse
    
    # Copy Python service
    New-Item -ItemType Directory -Path deployment\python | Out-Null
    Copy-Item -Path python\app -Destination deployment\python\app -Recurse
    Copy-Item -Path python\requirements.txt -Destination deployment\python\
    Copy-Item -Path python\Dockerfile -Destination deployment\python\
    Copy-Item -Path python\railway.json -Destination deployment\python\
    Copy-Item -Path python\database.py -Destination deployment\python\
    
    # Copy deployment files
    Copy-Item -Path deploy.md -Destination deployment\
    
    Write-Success "Deployment package created in deployment/ directory"
}

# Main deployment function
function Start-Deployment {
    Write-Host "Starting deployment process..." -ForegroundColor Green
    
    Test-Dependencies
    
    if (-not $SkipBuild) {
        Build-Frontend
        Build-Backend
        Build-Python
    }
    
    if (-not $SkipTests) {
        Test-Application
    }
    
    New-DeploymentPackage
    
    Write-Success "Deployment preparation complete!"
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Push your code to GitHub" -ForegroundColor White
    Write-Host "2. Follow the deployment guide in deploy.md" -ForegroundColor White
    Write-Host "3. Deploy to Vercel (frontend) and Railway (backend + Python service)" -ForegroundColor White
    Write-Host ""
    Write-Host "Deployment files are ready in the deployment/ directory" -ForegroundColor Green
}

# Run main function
Start-Deployment
