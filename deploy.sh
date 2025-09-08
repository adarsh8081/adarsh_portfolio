#!/bin/bash

# Portfolio Deployment Script
# This script helps deploy your portfolio to production

set -e

echo "🚀 Portfolio Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20+"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm"
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.10+"
        exit 1
    fi
    
    print_success "All dependencies are installed"
}

# Build frontend
build_frontend() {
    print_status "Building frontend..."
    cd web
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in web directory"
        exit 1
    fi
    
    npm install
    npm run build
    
    print_success "Frontend built successfully"
    cd ..
}

# Build backend
build_backend() {
    print_status "Building backend..."
    cd server
    
    if [ ! -f "package.json" ]; then
        print_error "package.json not found in server directory"
        exit 1
    fi
    
    npm install
    npm run build
    
    print_success "Backend built successfully"
    cd ..
}

# Build Python service
build_python() {
    print_status "Building Python service..."
    cd python
    
    if [ ! -f "requirements.txt" ]; then
        print_error "requirements.txt not found in python directory"
        exit 1
    fi
    
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    
    print_success "Python service built successfully"
    cd ..
}

# Run tests
run_tests() {
    print_status "Running tests..."
    
    # Test frontend build
    cd web
    npm run lint
    cd ..
    
    # Test backend build
    cd server
    npm run build
    cd ..
    
    print_success "All tests passed"
}

# Create deployment package
create_deployment_package() {
    print_status "Creating deployment package..."
    
    # Create deployment directory
    mkdir -p deployment
    
    # Copy frontend build
    cp -r web/.next deployment/frontend
    cp web/package.json deployment/frontend/
    cp web/next.config.ts deployment/frontend/
    cp web/vercel.json deployment/frontend/
    
    # Copy backend build
    cp -r server/dist deployment/backend
    cp server/package.json deployment/backend/
    cp server/Dockerfile deployment/backend/
    cp server/railway.json deployment/backend/
    cp -r server/prisma deployment/backend/
    
    # Copy Python service
    cp -r python/app deployment/python
    cp python/requirements.txt deployment/python/
    cp python/Dockerfile deployment/python/
    cp python/railway.json deployment/python/
    cp python/database.py deployment/python/
    
    # Copy deployment files
    cp deploy.md deployment/
    
    print_success "Deployment package created in deployment/ directory"
}

# Main deployment function
main() {
    echo "Starting deployment process..."
    
    check_dependencies
    build_frontend
    build_backend
    build_python
    run_tests
    create_deployment_package
    
    print_success "Deployment preparation complete!"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Follow the deployment guide in deploy.md"
    echo "3. Deploy to Vercel (frontend) and Railway (backend + Python service)"
    echo ""
    echo "Deployment files are ready in the deployment/ directory"
}

# Run main function
main "$@"
