import pytest
import requests
import httpx
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Test configuration
API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:4000")
PYTHON_SERVICE_URL = os.getenv("PYTHON_SERVICE_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

class TestConfig:
    """Test configuration and utilities"""
    
    @staticmethod
    def get_api_url(endpoint: str) -> str:
        """Get full API URL for endpoint"""
        return f"{API_BASE_URL}{endpoint}"
    
    @staticmethod
    def get_python_service_url(endpoint: str) -> str:
        """Get full Python service URL for endpoint"""
        return f"{PYTHON_SERVICE_URL}{endpoint}"
    
    @staticmethod
    def get_frontend_url(path: str = "") -> str:
        """Get full frontend URL for path"""
        return f"{FRONTEND_URL}{path}"

@pytest.fixture
def api_client():
    """HTTP client for API testing"""
    return httpx.Client(base_url=API_BASE_URL, timeout=30.0)

@pytest.fixture
def python_client():
    """HTTP client for Python service testing"""
    return httpx.Client(base_url=PYTHON_SERVICE_URL, timeout=30.0)

@pytest.fixture
def frontend_client():
    """HTTP client for frontend testing"""
    return httpx.Client(base_url=FRONTEND_URL, timeout=30.0)
