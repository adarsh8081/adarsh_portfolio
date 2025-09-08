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

@app.on_event("startup")
async def startup_event():
    logger.info("Portfolio API starting up...")
    logger.info(f"ML Available: {ML_AVAILABLE}")
    logger.info(f"LLM Available: {LLM_AVAILABLE}")
    logger.info(f"TTS Available: {TTS_AVAILABLE}")
    logger.info(f"Portfolio items: {len(portfolio_data)}")
    logger.info("Portfolio API startup complete!")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:4000",
        "https://*.vercel.app",
        "https://*.railway.app",
        os.getenv("FRONTEND_URL", ""),
        os.getenv("API_URL", "")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyBR9KGPBKtyKc3ZLzppTKFo6Y7S2HfbhI8")
USE_OPENAI = bool(OPENAI_API_KEY)
USE_GEMINI = bool(GEMINI_API_KEY)
MODEL_NAME = "gpt-3.5-turbo"  # or "gpt-4" for better responses
GEMINI_MODEL = "gemini-1.5-flash"  # Fast and efficient Gemini model

# Initialize embedding model
embedding_model = None
if ML_AVAILABLE:
    try:
        embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
    except Exception as e:
        logger.warning(f"Failed to load embedding model: {e}")
        ML_AVAILABLE = False

# Initialize LLM (Gemini, OpenAI, or local Hugging Face)
llm_pipeline = None
gemini_model = None

# Configure Gemini
if USE_GEMINI and LLM_AVAILABLE:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel(GEMINI_MODEL)
        logger.info("Loaded Google Gemini model")
    except Exception as e:
        logger.warning(f"Failed to load Gemini model: {e}")
        USE_GEMINI = False

# Fallback to local model if neither Gemini nor OpenAI is available
if not USE_GEMINI and not USE_OPENAI and LLM_AVAILABLE:
    try:
        # Use a smaller, faster model for local inference
        model_name = "microsoft/DialoGPT-medium"
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        model = AutoModelForCausalLM.from_pretrained(model_name)
        llm_pipeline = pipeline("text-generation", model=model, tokenizer=tokenizer, max_length=512)
        logger.info("Loaded local Hugging Face model")
    except Exception as e:
        logger.warning(f"Failed to load local model: {e}")
        logger.info("Falling back to simple keyword matching")

# Initialize TTS
tts_engine = None
if TTS_AVAILABLE:
    try:
        tts_engine = pyttsx3.init()
        tts_engine.setProperty('rate', 150)  # Speed of speech
        tts_engine.setProperty('volume', 0.8)  # Volume level (0.0 to 1.0)
        # Get available voices
        voices = tts_engine.getProperty('voices')
        if voices:
            tts_engine.setProperty('voice', voices[0].id)  # Use first available voice
    except Exception as e:
        logger.warning(f"TTS initialization failed: {e}")
        TTS_AVAILABLE = False

# Import database manager
try:
    from database import db_manager
    
    def load_portfolio_data():
        """Load real portfolio data from database"""
        try:
            return db_manager.load_portfolio_data()
        except Exception as e:
            logger.error(f"Error loading portfolio data: {e}")
            return []
    
    # Load portfolio data and create embeddings
    portfolio_data = load_portfolio_data()
    logger.info(f"Loaded {len(portfolio_data)} portfolio items from database")
except Exception as e:
    logger.error(f"Error importing database manager: {e}")
    portfolio_data = []
    logger.info("Using fallback mode without database")

# Initialize embeddings and index
embeddings = None
index = None

if portfolio_data and ML_AVAILABLE and embedding_model:
    try:
        # Generate embeddings for portfolio data
        embeddings = embedding_model.encode([
            f"{item['content']} {' '.join(item.get('tags', []))} {item.get('title', '')}"
            for item in portfolio_data
        ])
        
        # Create FAISS index
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatIP(dimension)
        index.add(embeddings.astype('float32'))
        logger.info(f"Created FAISS index with {len(portfolio_data)} items")
    except Exception as e:
        logger.warning(f"Failed to create embeddings: {e}")
        ML_AVAILABLE = False

if not portfolio_data:
    # Fallback to sample data
    portfolio_data = [
        {
            "id": "sample_1",
            "type": "project",
            "title": "AI-Powered Portfolio",
            "content": "Built with Next.js 15, React 19, and Three.js for immersive 3D experiences. Features glassmorphism design, dynamic theming, and smooth scroll animations.",
            "tags": ["Next.js", "React", "Three.js", "TypeScript", "3D", "Animation"]
        },
        {
            "id": "sample_2",
            "type": "project", 
            "title": "Vector Search Engine",
            "content": "AI-powered semantic search using embeddings and vector similarity. Built with Python, FastAPI, and scikit-learn for intelligent content discovery.",
            "tags": ["Python", "FastAPI", "AI", "Vector Search", "Machine Learning"]
        }
    ]
    logger.info("Using fallback sample data")
    
    if ML_AVAILABLE and embedding_model:
        try:
            embeddings = embedding_model.encode([item["content"] + " " + " ".join(item["tags"]) for item in portfolio_data])
            dimension = embeddings.shape[1]
            index = faiss.IndexFlatIP(dimension)
            index.add(embeddings.astype('float32'))
        except Exception as e:
            logger.warning(f"Failed to create embeddings for sample data: {e}")
            ML_AVAILABLE = False

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

class VoiceRequest(BaseModel):
    text: str
    voice_id: Optional[str] = None

# TTS Queue for background processing
tts_queue = queue.Queue()
audio_cache = {}

def tts_worker():
    """Background worker for TTS processing"""
    while True:
        try:
            item = tts_queue.get()
            if item is None:
                break
            
            text, audio_id = item
            if tts_engine and text:
                # Generate audio
                audio_buffer = io.BytesIO()
                tts_engine.save_to_buffer(audio_buffer, text)
                audio_data = audio_buffer.getvalue()
                
                # Store in cache
                audio_cache[audio_id] = {
                    "data": base64.b64encode(audio_data).decode(),
                    "timestamp": datetime.now()
                }
                
                logger.info(f"Generated TTS audio for ID: {audio_id}")
            
            tts_queue.task_done()
        except Exception as e:
            logger.error(f"TTS worker error: {e}")

# Start TTS worker thread
if tts_engine:
    tts_thread = threading.Thread(target=tts_worker, daemon=True)
    tts_thread.start()

def generate_llm_response(question: str, context: List[str], conversation_history: List[Dict[str, str]] = None) -> str:
    """Generate response using LLM (OpenAI or local model)"""
    
    # Build context string
    context_str = "\n".join([f"- {ctx}" for ctx in context])
    
    # Build conversation history
    history_str = ""
    if conversation_history:
        history_str = "\n".join([f"User: {msg['user']}\nAssistant: {msg['assistant']}" for msg in conversation_history[-3:]])  # Last 3 exchanges
    
    # Create prompt
    system_prompt = """You are Nishu's AI assistant for their portfolio website. You help visitors learn about Nishu's projects, skills, services, and achievements. Be helpful, professional, and concise. Use the provided context to answer questions accurately."""
    
    user_prompt = f"""Context about Nishu's portfolio:
{context_str}

Previous conversation:
{history_str}

User question: {question}

Please provide a helpful answer based on the context. If the question isn't related to Nishu's portfolio, politely redirect to portfolio-related topics."""

    try:
        if USE_GEMINI and gemini_model:
            # Use Google Gemini API
            full_prompt = f"{system_prompt}\n\n{user_prompt}"
            logger.info(f"Gemini prompt: {full_prompt[:200]}...")
            response = gemini_model.generate_content(
                full_prompt,
                generation_config=genai.types.GenerationConfig(
                    max_output_tokens=300,
                    temperature=0.7,
                )
            )
            logger.info(f"Gemini response: {response.text[:200]}...")
            return response.text.strip()
        
        elif USE_OPENAI and openai:
            # Use OpenAI API
            response = openai.ChatCompletion.create(
                model=MODEL_NAME,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                max_tokens=300,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        
        elif llm_pipeline:
            # Use local Hugging Face model
            full_prompt = f"{system_prompt}\n\n{user_prompt}\n\nAssistant:"
            response = llm_pipeline(
                full_prompt,
                max_length=len(full_prompt.split()) + 100,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True,
                pad_token_id=llm_pipeline.tokenizer.eos_token_id
            )
            generated_text = response[0]['generated_text']
            # Extract just the assistant's response
            assistant_response = generated_text.split("Assistant:")[-1].strip()
            return assistant_response
        
        else:
            # Fallback to simple keyword matching
            return generate_fallback_response(question, context)
            
    except Exception as e:
        logger.error(f"LLM generation error: {e}")
        return generate_fallback_response(question, context)

def generate_fallback_response(question: str, context: List[str]) -> str:
    """Fallback response generation using keyword matching"""
    question_lower = question.lower()
    
    # Simple keyword-based responses
    if any(word in question_lower for word in ["project", "portfolio", "work"]):
        for ctx in context:
            if "project" in ctx.lower():
                return f"Based on my portfolio: {ctx}"
    
    if any(word in question_lower for word in ["skill", "technology", "tech"]):
        for ctx in context:
            if "skill" in ctx.lower() or "technology" in ctx.lower():
                return f"Here's what I can tell you about my skills: {ctx}"
    
    if any(word in question_lower for word in ["service", "hire", "work with"]):
        for ctx in context:
            if "service" in ctx.lower():
                return f"Regarding my services: {ctx}"
    
    # Default response
    if context:
        return f"Based on my portfolio: {context[0]}"
    
    return "I can help with questions about my projects, skills, services, and achievements. Feel free to ask about my web development work, AI/ML projects, or any other aspects of my portfolio!"

# API Endpoints
@app.get("/")
def root():
    return {"message": "Portfolio API is running", "status": "ok"}

@app.get("/health")
def health():
    try:
        return {
            "ok": True,
            "ml_available": ML_AVAILABLE,
            "llm_available": USE_OPENAI or (LLM_AVAILABLE and llm_pipeline is not None),
            "tts_available": TTS_AVAILABLE and tts_engine is not None,
            "portfolio_items": len(portfolio_data),
            "mode": "full" if ML_AVAILABLE else "fallback",
            "status": "healthy"
        }
    except Exception as e:
        logger.error(f"Health check error: {e}")
        return {
            "ok": False,
            "error": str(e),
            "status": "unhealthy"
        }

@app.post("/search", response_model=List[SearchResult])
def search(req: SearchRequest):
    """Vector search endpoint"""
    try:
        if not ML_AVAILABLE or not embedding_model or not index:
            # Fallback to simple text search
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
                        score=1.0,  # Simple match score
                        metadata={k: v for k, v in item.items() if k not in ["id", "type", "title", "content", "tags"]}
                    ))
            
            return results[:req.limit]
        
        # Generate embedding for the query
        query_embedding = embedding_model.encode([req.query])
        
        # Search the index
        scores, indices = index.search(query_embedding.astype('float32'), req.limit)
        
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx >= 0 and idx < len(portfolio_data):
                item = portfolio_data[idx]
                results.append(SearchResult(
                    id=item["id"],
                    type=item["type"],
                    title=item["title"],
                    content=item["content"],
                    tags=item.get("tags", []),
                    score=float(score),
                    metadata={k: v for k, v in item.items() if k not in ["id", "type", "title", "content", "tags"]}
                ))
        
        return results
    except Exception as e:
        logger.error(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/portfolio")
def get_portfolio():
    """Get all portfolio data"""
    return {"items": portfolio_data}

@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    """Enhanced RAG chatbot endpoint"""
    try:
        # Search for relevant content
        search_results = search(SearchRequest(query=req.question, limit=5))
        
        # Build context from search results
        context = []
        sources = []
        
        for result in search_results:
            context.append(f"{result.title}: {result.content}")
            sources.append({
                "title": result.title,
                "type": result.type,
                "id": result.id
            })
        
        # Generate LLM response
        answer = generate_llm_response(req.question, context, req.conversation_history)
        
        # Handle voice mode
        audio_url = None
        if req.use_voice and tts_engine:
            audio_id = f"audio_{datetime.now().timestamp()}"
            tts_queue.put((answer, audio_id))
            audio_url = f"/audio/{audio_id}"
        
        return ChatResponse(
            answer=answer,
            sources=sources,
            audio_url=audio_url,
            conversation_id=f"conv_{datetime.now().timestamp()}"
        )
        
    except Exception as e:
        logger.error(f"Chat error: {e}")
        return ChatResponse(
            answer="I apologize, but I'm having trouble processing your request right now. Please try again later.",
            sources=[],
            conversation_id=f"conv_{datetime.now().timestamp()}"
        )

@app.get("/audio/{audio_id}")
def get_audio(audio_id: str):
    """Get generated TTS audio"""
    if audio_id in audio_cache:
        audio_data = audio_cache[audio_id]["data"]
        return StreamingResponse(
            io.BytesIO(base64.b64decode(audio_data)),
            media_type="audio/wav",
            headers={"Content-Disposition": f"inline; filename={audio_id}.wav"}
        )
    else:
        raise HTTPException(status_code=404, detail="Audio not found")

@app.post("/refresh-data")
def refresh_data():
    """Refresh portfolio data from database"""
    global portfolio_data, embeddings, index
    
    try:
        new_data = load_portfolio_data()
        if new_data:
            portfolio_data = new_data
            embeddings = embedding_model.encode([
                f"{item['content']} {' '.join(item.get('tags', []))} {item.get('title', '')}"
                for item in portfolio_data
            ])
            dimension = embeddings.shape[1]
            index = faiss.IndexFlatIP(dimension)
            index.add(embeddings.astype('float32'))
            
            logger.info(f"Refreshed portfolio data: {len(portfolio_data)} items")
            return {"message": f"Successfully refreshed {len(portfolio_data)} portfolio items"}
        else:
            return {"message": "No new data found"}
    except Exception as e:
        logger.error(f"Data refresh error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats")
def get_stats():
    """Get service statistics"""
    return {
        "portfolio_items": len(portfolio_data),
        "llm_provider": "OpenAI" if USE_OPENAI else ("Hugging Face" if llm_pipeline else "Fallback"),
        "tts_available": tts_engine is not None,
        "audio_cache_size": len(audio_cache),
        "embedding_model": "all-MiniLM-L6-v2"
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"Environment PORT: {os.getenv('PORT')}")
    print(f"Starting server on port {port}")
    print(f"ML Available: {ML_AVAILABLE}")
    print(f"LLM Available: {LLM_AVAILABLE}")
    print(f"TTS Available: {TTS_AVAILABLE}")
    print(f"Portfolio items loaded: {len(portfolio_data)}")
    print("Starting uvicorn server...")
    try:
        uvicorn.run(app, host="0.0.0.0", port=port, log_level="info", access_log=True)
    except Exception as e:
        print(f"Failed to start server: {e}")
        raise