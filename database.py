import os
import logging
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self):
        self.database_url = os.getenv("DATABASE_URL")
        self.engine = None
        self.SessionLocal = None
        
        if self.database_url:
            try:
                self.engine = create_engine(self.database_url)
                self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
                logger.info("Connected to PostgreSQL database")
            except Exception as e:
                logger.error(f"Failed to connect to PostgreSQL: {e}")
                self.database_url = None
        else:
            logger.warning("No DATABASE_URL provided, falling back to SQLite")
    
    def get_connection(self):
        """Get database connection"""
        if self.SessionLocal:
            return self.SessionLocal()
        return None
    
    def load_portfolio_data(self) -> List[Dict[str, Any]]:
        """Load portfolio data from database"""
        if not self.engine:
            return self._load_sqlite_data()
        
        portfolio_data = []
        
        try:
            with self.engine.connect() as conn:
                # Load projects
                result = conn.execute(text("""
                    SELECT id, title, description as content, tags, 'project' as type, 
                           technologies, github_url, live_url, featured, created_at
                    FROM "Project"
                """))
                for row in result:
                    tags = row['tags'] if row['tags'] else []
                    portfolio_data.append({
                        "id": f"project_{row['id']}",
                        "type": "project",
                        "title": row['title'],
                        "content": row['content'],
                        "tags": tags,
                        "technologies": row['technologies'],
                        "github_url": row['github_url'],
                        "live_url": row['live_url'],
                        "featured": bool(row['featured']),
                        "created_at": str(row['created_at'])
                    })
                
                # Load posts
                result = conn.execute(text("""
                    SELECT id, title, content, tags, 'post' as type, 
                           excerpt, published, created_at
                    FROM "Post" WHERE published = true
                """))
                for row in result:
                    tags = row['tags'] if row['tags'] else []
                    portfolio_data.append({
                        "id": f"post_{row['id']}",
                        "type": "post",
                        "title": row['title'],
                        "content": row['content'],
                        "tags": tags,
                        "excerpt": row['excerpt'],
                        "created_at": str(row['created_at'])
                    })
                
                # Load skills
                result = conn.execute(text("""
                    SELECT id, name as title, description as content, category, 
                           level, 'skill' as type, created_at
                    FROM "Skill"
                """))
                for row in result:
                    portfolio_data.append({
                        "id": f"skill_{row['id']}",
                        "type": "skill",
                        "title": row['title'],
                        "content": row['content'],
                        "tags": [row['category']] if row['category'] else [],
                        "level": row['level'],
                        "created_at": str(row['created_at'])
                    })
                
                # Load services
                result = conn.execute(text("""
                    SELECT id, name as title, description as content, price, 
                           'service' as type, created_at
                    FROM "Service"
                """))
                for row in result:
                    portfolio_data.append({
                        "id": f"service_{row['id']}",
                        "type": "service",
                        "title": row['title'],
                        "content": row['content'],
                        "tags": ["service"],
                        "price": row['price'],
                        "created_at": str(row['created_at'])
                    })
                
                # Load testimonials
                result = conn.execute(text("""
                    SELECT id, name, content, role, company, rating, 
                           'testimonial' as type, created_at
                    FROM "Testimonial"
                """))
                for row in result:
                    portfolio_data.append({
                        "id": f"testimonial_{row['id']}",
                        "type": "testimonial",
                        "title": f"Testimonial from {row['name']}",
                        "content": row['content'],
                        "tags": ["testimonial", row['role']] if row['role'] else ["testimonial"],
                        "author": row['name'],
                        "role": row['role'],
                        "company": row['company'],
                        "rating": row['rating'],
                        "created_at": str(row['created_at'])
                    })
                
                # Load achievements
                result = conn.execute(text("""
                    SELECT id, title, description as content, category, 
                           'achievement' as type, date, url, created_at
                    FROM "Achievement"
                """))
                for row in result:
                    portfolio_data.append({
                        "id": f"achievement_{row['id']}",
                        "type": "achievement",
                        "title": row['title'],
                        "content": row['content'],
                        "tags": ["achievement", row['category']] if row['category'] else ["achievement"],
                        "category": row['category'],
                        "date": row['date'],
                        "url": row['url'],
                        "created_at": str(row['created_at'])
                    })
                
                logger.info(f"Loaded {len(portfolio_data)} portfolio items from PostgreSQL")
                return portfolio_data
                
        except Exception as e:
            logger.error(f"Error loading portfolio data from PostgreSQL: {e}")
            return self._load_sqlite_data()
    
    def _load_sqlite_data(self) -> List[Dict[str, Any]]:
        """Fallback to SQLite data loading"""
        import sqlite3
        import json
        
        DATABASE_PATH = os.getenv("DATABASE_PATH", "../server/prisma/dev.db")
        
        try:
            conn = sqlite3.connect(DATABASE_PATH)
            conn.row_factory = sqlite3.Row
            portfolio_data = []
            
            # Load projects
            cursor = conn.execute("""
                SELECT id, title, description as content, tags, 'project' as type, 
                       technologies, github_url, live_url, featured, created_at
                FROM Project
            """)
            for row in cursor.fetchall():
                tags = json.loads(row['tags']) if row['tags'] else []
                portfolio_data.append({
                    "id": f"project_{row['id']}",
                    "type": "project",
                    "title": row['title'],
                    "content": row['content'],
                    "tags": tags,
                    "technologies": row['technologies'],
                    "github_url": row['github_url'],
                    "live_url": row['live_url'],
                    "featured": bool(row['featured']),
                    "created_at": row['created_at']
                })
            
            # Similar for other tables...
            conn.close()
            logger.info(f"Loaded {len(portfolio_data)} portfolio items from SQLite")
            return portfolio_data
            
        except Exception as e:
            logger.error(f"Error loading SQLite data: {e}")
            return []

# Global database manager instance
db_manager = DatabaseManager()
