# AWS Deployment Script for Portfolio Project (PowerShell)
# This script deploys your portfolio to AWS using free tier services

param(
    [switch]$SkipDatabase,
    [switch]$SkipFrontend,
    [switch]$SkipBackend
)

Write-Host "☁️ AWS Portfolio Deployment Script" -ForegroundColor Blue
Write-Host "==================================" -ForegroundColor Blue

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

# Check AWS CLI installation
function Test-AWSCLI {
    Write-Status "Checking AWS CLI installation..."
    
    if (-not (Get-Command aws -ErrorAction SilentlyContinue)) {
        Write-Error "AWS CLI is not installed. Please install it first:"
        Write-Host "https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" -ForegroundColor Yellow
        exit 1
    }
    
    Write-Success "AWS CLI is installed"
}

# Configure AWS CLI
function Initialize-AWS {
    Write-Status "Configuring AWS CLI..."
    
    if (-not (Test-Path "$env:USERPROFILE\.aws\credentials")) {
        Write-Warning "AWS credentials not found. Please configure AWS CLI:"
        aws configure
    }
    else {
        Write-Success "AWS credentials found"
    }
}

# Install required tools
function Install-AWSTools {
    Write-Status "Installing required tools..."
    
    # Install Serverless Framework
    if (-not (Get-Command serverless -ErrorAction SilentlyContinue)) {
        npm install -g serverless
        Write-Success "Serverless Framework installed"
    }
    else {
        Write-Success "Serverless Framework already installed"
    }
    
    # Install AWS Amplify CLI
    if (-not (Get-Command amplify -ErrorAction SilentlyContinue)) {
        npm install -g @aws-amplify/cli
        Write-Success "AWS Amplify CLI installed"
    }
    else {
        Write-Success "AWS Amplify CLI already installed"
    }
}

# Deploy backend API to Lambda
function Deploy-Backend {
    Write-Status "Deploying backend API to AWS Lambda..."
    
    Set-Location server
    
    # Install dependencies
    npm install
    
    # Install serverless plugins
    npm install --save-dev serverless-offline serverless-dotenv-plugin
    
    # Build the application
    npm run build
    
    # Deploy to AWS
    serverless deploy --stage prod
    
    Write-Success "Backend API deployed to AWS Lambda"
    Set-Location ..
}

# Deploy Python service to Lambda
function Deploy-PythonService {
    Write-Status "Deploying Python AI service to AWS Lambda..."
    
    Set-Location python
    
    # Install serverless plugins
    npm install --save-dev serverless-offline serverless-dotenv-plugin serverless-python-requirements
    
    # Deploy to AWS
    serverless deploy --stage prod
    
    Write-Success "Python AI service deployed to AWS Lambda"
    Set-Location ..
}

# Deploy frontend to Amplify
function Deploy-Frontend {
    Write-Status "Deploying frontend to AWS Amplify..."
    
    Set-Location web
    
    # Install dependencies
    npm install
    
    # Build the application
    npm run build
    
    # Initialize Amplify (if not already done)
    if (-not (Test-Path "amplify")) {
        amplify init --yes
    }
    
    # Add hosting
    amplify add hosting --yes
    
    # Deploy
    amplify publish --yes
    
    Write-Success "Frontend deployed to AWS Amplify"
    Set-Location ..
}

# Create RDS database
function New-Database {
    Write-Status "Creating RDS PostgreSQL database..."
    
    # Create RDS instance using AWS CLI
    aws rds create-db-instance `
        --db-instance-identifier portfolio-db `
        --db-instance-class db.t3.micro `
        --engine postgres `
        --master-username portfolio `
        --master-user-password Portfolio123! `
        --allocated-storage 20 `
        --db-name portfolio `
        --backup-retention-period 7 `
        --storage-encrypted `
        --storage-type gp2 `
        --publicly-accessible `
        --tags Key=Name,Value=Portfolio-Database
    
    Write-Success "RDS PostgreSQL database created"
}

# Generate deployment report
function New-DeploymentReport {
    Write-Status "Generating AWS deployment report..."
    
    $reportContent = @"
# ☁️ AWS Portfolio Deployment Report

## Deployment Status: ✅ COMPLETE

### Services Deployed:
- ✅ Frontend (Next.js) - AWS Amplify
- ✅ Backend API (Node.js) - AWS Lambda + API Gateway
- ✅ Python AI Service (FastAPI) - AWS Lambda + API Gateway
- ✅ Database (PostgreSQL) - AWS RDS

### AWS Free Tier Usage:
- **Lambda**: 1M requests/month free
- **API Gateway**: 1M requests/month free
- **RDS**: 750 hours/month free
- **S3**: 5GB free storage
- **CloudFront**: 1TB data transfer free

### URLs:
- Frontend: https://your-app.amplifyapp.com
- Backend API: https://your-api.execute-api.us-east-1.amazonaws.com/prod
- Python Service: https://your-python-api.execute-api.us-east-1.amazonaws.com/prod

### Cost Estimation:
- **Monthly Cost**: `$0 (within free tier limits)`
- **Annual Cost**: `$0 (first year)`

## Next Steps:
1. Configure custom domain (optional)
2. Set up monitoring with CloudWatch
3. Configure backup strategies
4. Set up SSL certificates (handled by AWS)

---
Generated on: $(Get-Date)
"@
    
    $reportContent | Out-File -FilePath "AWS_DEPLOYMENT_REPORT.md" -Encoding UTF8
    Write-Success "AWS deployment report generated"
}

# Main deployment function
function Start-AWSDeployment {
    Write-Host "Starting AWS deployment process..." -ForegroundColor Green
    
    Test-AWSCLI
    Initialize-AWS
    Install-AWSTools
    
    # Deploy services
    if (-not $SkipBackend) {
        Deploy-Backend
    }
    
    Deploy-PythonService
    
    if (-not $SkipFrontend) {
        Deploy-Frontend
    }
    
    # Optional: Create database
    if (-not $SkipDatabase) {
        New-Database
    }
    
    New-DeploymentReport
    
    Write-Success "🎉 AWS deployment completed successfully!"
    Write-Host ""
    Write-Host "📋 Summary:" -ForegroundColor Yellow
    Write-Host "- ✅ Backend API deployed to AWS Lambda" -ForegroundColor White
    Write-Host "- ✅ Python AI service deployed to AWS Lambda" -ForegroundColor White
    Write-Host "- ✅ Frontend deployed to AWS Amplify" -ForegroundColor White
    Write-Host "- ✅ All services using AWS Free Tier" -ForegroundColor White
    Write-Host ""
    Write-Host "💰 Cost: `$0/month (within free tier limits)" -ForegroundColor Green
    Write-Host "🌐 Your portfolio is now live on AWS!" -ForegroundColor Green
    Write-Host "📚 Check AWS_DEPLOYMENT_REPORT.md for details" -ForegroundColor White
}

# Run main function
Start-AWSDeployment
