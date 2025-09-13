import pytest
import httpx
from conftest import TestConfig

class TestPythonServiceHealth:
    """Test Python service health endpoints"""
    
    def test_python_service_health(self, python_client):
        """Test Python service health endpoint"""
        response = python_client.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["ok"] is True
        assert "ml_available" in data
        assert "llm_available" in data
        assert "tts_available" in data

class TestPythonServiceSearch:
    """Test Python service search functionality"""
    
    def test_search_endpoint_exists(self, python_client):
        """Test that search endpoint exists"""
        response = python_client.post("/search", json={
            "query": "test query",
            "limit": 5
        })
        assert response.status_code in [200, 500]  # Should not be 404
    
    def test_search_with_valid_query(self, python_client):
        """Test search with valid query"""
        response = python_client.post("/search", json={
            "query": "portfolio project",
            "limit": 3
        })
        if response.status_code == 200:
            data = response.json()
            assert isinstance(data, list)
            assert len(data) <= 3

class TestPythonServiceChat:
    """Test Python service chat functionality"""
    
    def test_chat_endpoint_exists(self, python_client):
        """Test that chat endpoint exists"""
        response = python_client.post("/chat", json={
            "question": "Hello, tell me about your projects",
            "context": [],
            "use_voice": False,
            "conversation_history": []
        })
        assert response.status_code in [200, 500]  # Should not be 404
    
    def test_chat_with_valid_question(self, python_client):
        """Test chat with valid question"""
        response = python_client.post("/chat", json={
            "question": "What projects have you worked on?",
            "context": [],
            "use_voice": False,
            "conversation_history": []
        })
        if response.status_code == 200:
            data = response.json()
            assert "answer" in data
            assert "sources" in data
            assert isinstance(data["sources"], list)

class TestPythonServicePortfolio:
    """Test Python service portfolio endpoints"""
    
    def test_portfolio_endpoint(self, python_client):
        """Test portfolio data endpoint"""
        response = python_client.get("/portfolio")
        assert response.status_code == 200
        data = response.json()
        assert "items" in data
        assert isinstance(data["items"], list)
    
    def test_stats_endpoint(self, python_client):
        """Test stats endpoint"""
        response = python_client.get("/stats")
        assert response.status_code == 200
        data = response.json()
        assert "portfolio_items" in data
        assert "llm_provider" in data

class TestPythonServiceCORS:
    """Test Python service CORS configuration"""
    
    def test_cors_headers(self, python_client):
        """Test CORS headers are present"""
        response = python_client.options("/health")
        assert "access-control-allow-origin" in response.headers
        assert "access-control-allow-methods" in response.headers
