from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import json
import os
import sqlite3
import asyncio
import io
import base64
from datetime import datetime
import logging
import requests

# Optional ML imports with fallbacks
try:
    import numpy as np
    from sentence_transformers import SentenceTransformer
    import faiss
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False
    print("ML libraries not available, using fallback mode")

# LLM Integration
try:
    import openai
    import google.generativeai as genai
    from transformers import pipeline, AutoTokenizer, AutoModelForCausalLM
    import torch
    LLM_AVAILABLE = True
except ImportError:
    LLM_AVAILABLE = False
    print("LLM libraries not available, using fallback mode")

# TTS Integration
try:
    import pyttsx3
    import threading
    import queue
    TTS_AVAILABLE = True
except ImportError:
    TTS_AVAILABLE = False
    print("TTS libraries not available, using fallback mode")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio RAG Chatbot API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyBR9KGPBKtyKc3ZLzppTKFo6Y7S2HfbhI8")
USE_OPENAI = bool(OPENAI_API_KEY)
USE_GEMINI = bool(GEMINI_API_KEY)

# Initialize variables
embedding_model = None
llm_pipeline = None
gemini_model = None
tts_engine = None
portfolio_data = []
embeddings = None
index = None

# Load portfolio data
try:
    from database import db_manager
    portfolio_data = db_manager.load_portfolio_data()
    logger.info(f"Loaded {len(portfolio_data)} portfolio items from database")
except Exception as e:
    logger.error(f"Error loading database: {e}")
    portfolio_data = [
        {
            "id": "sample_1",
            "type": "project",
            "title": "AI-Powered Portfolio",
            "content": "Built with Next.js 15, React 19, and Three.js for immersive 3D experiences.",
            "tags": ["Next.js", "React", "Three.js", "TypeScript", "3D", "Animation"]
        }
    ]
    logger.info("Using fallback sample data")

# Pydantic models
class SearchRequest(BaseModel):
    query: str
    limit: int = 5

class SearchResult(BaseModel):
    id: str
    type: str
    title: str
    content: str
    tags: List[str]
    score: float
    metadata: Optional[Dict[str, Any]] = None

class ChatRequest(BaseModel):
    question: str
    context: List[str] = []
    use_voice: bool = False
    conversation_history: List[Dict[str, str]] = []

class ChatResponse(BaseModel):
    answer: str
    sources: List[Dict[str, str]]
    audio_url: Optional[str] = None
    conversation_id: Optional[str] = None

# API Endpoints
@app.get("/")
def root():
    return {"message": "Portfolio API is running", "status": "ok", "version": "1.0.0"}

@app.get("/health")
def health():
    return {
        "ok": True,
        "status": "healthy",
        "ml_available": ML_AVAILABLE,
        "llm_available": USE_OPENAI or (LLM_AVAILABLE and llm_pipeline is not None),
        "tts_available": TTS_AVAILABLE and tts_engine is not None,
        "portfolio_items": len(portfolio_data),
        "mode": "full" if ML_AVAILABLE else "fallback"
    }

@app.get("/portfolio")
def get_portfolio():
    return {"items": portfolio_data}

@app.post("/search", response_model=List[SearchResult])
def search(req: SearchRequest):
    """Simple text search endpoint"""
    try:
        results = []
        query_lower = req.query.lower()
        for item in portfolio_data:
            content_match = query_lower in item.get("content", "").lower()
            title_match = query_lower in item.get("title", "").lower()
            tags_match = any(query_lower in tag.lower() for tag in item.get("tags", []))
            
            if content_match or title_match or tags_match:
                results.append(SearchResult(
                    id=item["id"],
                    type=item["type"],
                    title=item["title"],
                    content=item["content"],
                    tags=item.get("tags", []),
                    score=1.0,
                    metadata={k: v for k, v in item.items() if k not in ["id", "type", "title", "content", "tags"]}
                ))
        
        return results[:req.limit]
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    """Simple chat endpoint"""
    try:
        # Simple keyword-based response
        answer = f"I can help you learn about my portfolio. You asked: '{req.question}'. Here are some relevant projects: {', '.join([item['title'] for item in portfolio_data[:3]])}"
        
        return ChatResponse(
            answer=answer,
            sources=[{"title": item["title"], "type": item["type"], "id": item["id"]} for item in portfolio_data[:3]],
            conversation_id=f"conv_{datetime.now().timestamp()}"
        )
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return ChatResponse(
            answer="I apologize, but I'm having trouble processing your request right now. Please try again later.",
            sources=[],
            conversation_id=f"conv_{datetime.now().timestamp()}"
        )

@app.get("/stats")
def get_stats():
    """Get service statistics"""
    return {
        "portfolio_items": len(portfolio_data),
        "ml_available": ML_AVAILABLE,
        "llm_available": USE_OPENAI or (LLM_AVAILABLE and llm_pipeline is not None),
        "tts_available": TTS_AVAILABLE and tts_engine is not None,
        "mode": "full" if ML_AVAILABLE else "fallback"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    logger.info(f"Starting server on port {port}")
    uvicorn.run(app, host="0.0.0.0", port=port, log_level="info")