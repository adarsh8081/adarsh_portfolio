import pytest
import httpx
from conftest import TestConfig

class TestDatabaseHealth:
    """Test database health and connectivity"""
    
    def test_database_connection(self, api_client):
        """Test database connection through API"""
        response = api_client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] is True
        # Check if database is mentioned in health response
        assert "database" in data or "db" in data or "status" in data

class TestDatabaseOperations:
    """Test database operations through API"""
    
    def test_projects_endpoint(self, api_client):
        """Test projects endpoint (database read)"""
        response = api_client.get("/api/projects")
        assert response.status_code in [200, 401]  # Should not be 404
        if response.status_code == 200:
            data = response.json()
            assert isinstance(data, (list, dict))
    
    def test_posts_endpoint(self, api_client):
        """Test posts endpoint (database read)"""
        response = api_client.get("/api/posts")
        assert response.status_code in [200, 401]  # Should not be 404
        if response.status_code == 200:
            data = response.json()
            assert isinstance(data, (list, dict))
    
    def test_services_endpoint(self, api_client):
        """Test services endpoint (database read)"""
        response = api_client.get("/api/services")
        assert response.status_code in [200, 401]  # Should not be 404
        if response.status_code == 200:
            data = response.json()
            assert isinstance(data, (list, dict))

class TestDatabasePerformance:
    """Test database performance"""
    
    def test_response_time(self, api_client):
        """Test API response time"""
        import time
        start_time = time.time()
        response = api_client.get("/health")
        end_time = time.time()
        
        response_time = end_time - start_time
        assert response_time < 5.0  # Should respond within 5 seconds
        assert response.status_code == 200
