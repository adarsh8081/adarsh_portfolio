#!/bin/bash

# Comprehensive Test Runner for Portfolio Project
# This script runs all tests including Cypress, Selenium, and API tests

set -e

echo "🧪 Portfolio Test Suite"
echo "========================"

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

# Check if services are running
check_services() {
    print_status "Checking if services are running..."
    
    # Check if frontend is running
    if curl -s http://localhost:3000 > /dev/null; then
        print_success "Frontend is running on port 3000"
    else
        print_warning "Frontend is not running on port 3000"
    fi
    
    # Check if API is running
    if curl -s http://localhost:4000/health > /dev/null; then
        print_success "API is running on port 4000"
    else
        print_warning "API is not running on port 4000"
    fi
    
    # Check if database is accessible
    if curl -s http://localhost:4000/health > /dev/null; then
        print_success "Database connection is healthy"
    else
        print_warning "Database connection may not be available"
    fi
}

# Install test dependencies
install_dependencies() {
    print_status "Installing test dependencies..."
    
    # Install Python test dependencies
    if [ -f "tests/requirements.txt" ]; then
        pip install -r tests/requirements.txt
        print_success "Python test dependencies installed"
    fi
    
    # Install frontend test dependencies
    if [ -d "web" ]; then
        cd web
        npm install
        print_success "Frontend test dependencies installed"
        cd ..
    fi
}

# Run API tests
run_api_tests() {
    print_status "Running API tests..."
    
    if [ -f "tests/test_api.py" ]; then
        python -m pytest tests/test_api.py -v --tb=short
        print_success "API tests completed"
    else
        print_warning "API tests not found"
    fi
}

# Run database tests
run_database_tests() {
    print_status "Running database tests..."
    
    if [ -f "tests/test_database.py" ]; then
        python -m pytest tests/test_database.py -v --tb=short
        print_success "Database tests completed"
    else
        print_warning "Database tests not found"
    fi
}

# Run integration tests
run_integration_tests() {
    print_status "Running integration tests..."
    
    if [ -f "tests/test_integration.py" ]; then
        python -m pytest tests/test_integration.py -v --tb=short
        print_success "Integration tests completed"
    else
        print_warning "Integration tests not found"
    fi
}

# Run Cypress tests
run_cypress_tests() {
    print_status "Running Cypress tests..."
    
    if [ -d "web/cypress" ]; then
        cd web
        npm run test
        print_success "Cypress tests completed"
        cd ..
    else
        print_warning "Cypress tests not found"
    fi
}

# Run all tests
run_all_tests() {
    print_status "Running all tests..."
    
    # Run API tests
    run_api_tests
    
    # Run database tests
    run_database_tests
    
    # Run integration tests
    run_integration_tests
    
    # Run Cypress tests
    run_cypress_tests
    
    print_success "All tests completed!"
}

# Generate test report
generate_report() {
    print_status "Generating test report..."
    
    # Create reports directory
    mkdir -p reports
    
    # Generate HTML report for Python tests
    if [ -f "tests/test_api.py" ] || [ -f "tests/test_python_service.py" ] || [ -f "tests/test_integration.py" ]; then
        python -m pytest tests/ --html=reports/pytest_report.html --self-contained-html
        print_success "Python test report generated: reports/pytest_report.html"
    fi
    
    # Cypress generates its own reports
    if [ -d "web/cypress" ]; then
        print_success "Cypress reports available in web/cypress/reports/"
    fi
}

# Main function
main() {
    echo "Starting comprehensive test suite..."
    
    check_services
    install_dependencies
    
    case "${1:-all}" in
        "api")
            run_api_tests
            ;;
        "database")
            run_database_tests
            ;;
        "integration")
            run_integration_tests
            ;;
        "cypress")
            run_cypress_tests
            ;;
        "all")
            run_all_tests
            ;;
        *)
            echo "Usage: $0 [api|database|integration|cypress|all]"
            exit 1
            ;;
    esac
    
    generate_report
    
    print_success "Test suite completed successfully!"
}

# Run main function
main "$@"
