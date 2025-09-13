import pytest
import httpx
from conftest import TestConfig

class TestAPIHealth:
    """Test API health endpoints"""
    
    def test_api_health_check(self, api_client):
        """Test API health endpoint"""
        response = api_client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] is True
    
    def test_api_cors_headers(self, api_client):
        """Test CORS headers are present"""
        response = api_client.options("/health")
        assert "access-control-allow-origin" in response.headers
        assert "access-control-allow-methods" in response.headers

class TestAPIAuthentication:
    """Test API authentication endpoints"""
    
    def test_auth_endpoints_exist(self, api_client):
        """Test that auth endpoints exist"""
        # Test login endpoint
        response = api_client.post("/api/auth/login", json={"email": "test@example.com"})
        assert response.status_code in [200, 400, 401]  # Should not be 404
        
        # Test register endpoint
        response = api_client.post("/api/auth/register", json={"email": "test@example.com"})
        assert response.status_code in [200, 400, 401]  # Should not be 404

class TestAPICMS:
    """Test CMS endpoints"""
    
    def test_cms_endpoints_exist(self, api_client):
        """Test that CMS endpoints exist"""
        # Test projects endpoint
        response = api_client.get("/api/projects")
        assert response.status_code in [200, 401]  # Should not be 404
        
        # Test posts endpoint
        response = api_client.get("/api/posts")
        assert response.status_code in [200, 401]  # Should not be 404
        
        # Test services endpoint
        response = api_client.get("/api/services")
        assert response.status_code in [200, 401]  # Should not be 404

class TestAPIEmail:
    """Test email endpoints"""
    
    def test_email_endpoint_exists(self, api_client):
        """Test that email endpoint exists"""
        response = api_client.post("/api/email", json={
            "name": "Test User",
            "email": "test@example.com",
            "message": "Test message"
        })
        assert response.status_code in [200, 400, 500]  # Should not be 404

class TestAPIRateLimiting:
    """Test API rate limiting"""
    
    def test_rate_limiting_works(self, api_client):
        """Test that rate limiting is working"""
        # Make multiple requests quickly
        responses = []
        for _ in range(10):
            response = api_client.get("/health")
            responses.append(response.status_code)
        
        # Should not all be 200 (some should be rate limited)
        assert not all(status == 200 for status in responses)
