# Comprehensive Test Runner for Portfolio Project (PowerShell)
# This script runs all tests including Cypress, Selenium, and API tests

param(
    [string]$TestType = "all"
)

Write-Host "🧪 Portfolio Test Suite" -ForegroundColor Blue
Write-Host "========================" -ForegroundColor Blue

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

# Check if services are running
function Test-Services {
    Write-Status "Checking if services are running..."
    
    # Check if frontend is running
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -UseBasicParsing
        Write-Success "Frontend is running on port 3000"
    }
    catch {
        Write-Warning "Frontend is not running on port 3000"
    }
    
    # Check if API is running
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4000/health" -TimeoutSec 5 -UseBasicParsing
        Write-Success "API is running on port 4000"
    }
    catch {
        Write-Warning "API is not running on port 4000"
    }
    
    # Check if Python service is running
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -TimeoutSec 5 -UseBasicParsing
        Write-Success "Python service is running on port 8000"
    }
    catch {
        Write-Warning "Python service is not running on port 8000"
    }
}

# Install test dependencies
function Install-Dependencies {
    Write-Status "Installing test dependencies..."
    
    # Install Python test dependencies
    if (Test-Path "tests/requirements.txt") {
        pip install -r tests/requirements.txt
        Write-Success "Python test dependencies installed"
    }
    
    # Install frontend test dependencies
    if (Test-Path "web") {
        Set-Location web
        npm install
        Write-Success "Frontend test dependencies installed"
        Set-Location ..
    }
}

# Run API tests
function Test-API {
    Write-Status "Running API tests..."
    
    if (Test-Path "tests/test_api.py") {
        python -m pytest tests/test_api.py -v --tb=short
        Write-Success "API tests completed"
    }
    else {
        Write-Warning "API tests not found"
    }
}

# Run Python service tests
function Test-PythonService {
    Write-Status "Running Python service tests..."
    
    if (Test-Path "tests/test_python_service.py") {
        python -m pytest tests/test_python_service.py -v --tb=short
        Write-Success "Python service tests completed"
    }
    else {
        Write-Warning "Python service tests not found"
    }
}

# Run integration tests
function Test-Integration {
    Write-Status "Running integration tests..."
    
    if (Test-Path "tests/test_integration.py") {
        python -m pytest tests/test_integration.py -v --tb=short
        Write-Success "Integration tests completed"
    }
    else {
        Write-Warning "Integration tests not found"
    }
}

# Run Cypress tests
function Test-Cypress {
    Write-Status "Running Cypress tests..."
    
    if (Test-Path "web/cypress") {
        Set-Location web
        npm run test
        Write-Success "Cypress tests completed"
        Set-Location ..
    }
    else {
        Write-Warning "Cypress tests not found"
    }
}

# Run all tests
function Test-All {
    Write-Status "Running all tests..."
    
    # Run API tests
    Test-API
    
    # Run Python service tests
    Test-PythonService
    
    # Run integration tests
    Test-Integration
    
    # Run Cypress tests
    Test-Cypress
    
    Write-Success "All tests completed!"
}

# Generate test report
function New-TestReport {
    Write-Status "Generating test report..."
    
    # Create reports directory
    if (-not (Test-Path "reports")) {
        New-Item -ItemType Directory -Path "reports" | Out-Null
    }
    
    # Generate HTML report for Python tests
    if ((Test-Path "tests/test_api.py") -or (Test-Path "tests/test_python_service.py") -or (Test-Path "tests/test_integration.py")) {
        python -m pytest tests/ --html=reports/pytest_report.html --self-contained-html
        Write-Success "Python test report generated: reports/pytest_report.html"
    }
    
    # Cypress generates its own reports
    if (Test-Path "web/cypress") {
        Write-Success "Cypress reports available in web/cypress/reports/"
    }
}

# Main function
function Start-TestSuite {
    Write-Host "Starting comprehensive test suite..." -ForegroundColor Green
    
    Test-Services
    Install-Dependencies
    
    switch ($TestType) {
        "api" {
            Test-API
        }
        "python" {
            Test-PythonService
        }
        "integration" {
            Test-Integration
        }
        "cypress" {
            Test-Cypress
        }
        "all" {
            Test-All
        }
        default {
            Write-Host "Usage: .\run_tests.ps1 -TestType [api|python|integration|cypress|all]" -ForegroundColor Yellow
            exit 1
        }
    }
    
    New-TestReport
    
    Write-Success "Test suite completed successfully!"
}

# Run main function
Start-TestSuite
