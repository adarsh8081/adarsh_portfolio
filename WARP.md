# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Architecture Overview

This is a full-stack portfolio monorepo with three main services:

### Core Services
- **Express API Backend** (`server/`) - TypeScript + Prisma ORM + SQLite/PostgreSQL
- **FastAPI Python Service** (`app/`) - AI chatbot with RAG capabilities 
- **Frontend** (mentioned in README but not present) - Next.js 15 + React 19 (expected in `web/` directory)

### Service Communication
- Backend API runs on port 4000 with REST endpoints for portfolio data (projects, posts, skills, testimonials, achievements, timeline)
- Python AI service runs on port 8000 with FastAPI for chatbot functionality
- Frontend consumes both APIs via HTTP requests
- All services share the same SQLite database via Prisma

### Data Layer
The application uses Prisma ORM with the following main entities:
- `Project` - Portfolio projects with tech stacks and tags
- `Post` - Blog posts with content and metadata  
- `Service` - Service offerings with pricing
- `Skill` - Technical skills with proficiency levels
- `Testimonial` - Client testimonials with ratings
- `Achievement` - Awards, certifications, milestones
- `TimelineEvent` - Professional timeline events
- `User` - Admin/editor user accounts with role-based access

### Authentication & Authorization
- JWT-based authentication with role-based access control (admin, editor, user)
- Protected endpoints require authentication middleware
- Rate limiting implemented with different limits per endpoint type

## Development Commands

### Backend API (server/)
```bash
# Development
cd server
npm install                    # Install dependencies
npm run dev                   # Start dev server with hot reload
npm run build                 # Build TypeScript to dist/
npm run start                 # Start production server

# Database operations
npx prisma generate           # Generate Prisma client
npx prisma migrate dev        # Run development migrations  
npx prisma migrate deploy     # Deploy migrations to production
npx prisma studio            # Open Prisma Studio GUI
node create-admin.js         # Create default admin user
```

### Python AI Service (app/)
```bash
# Setup virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows activation

# Development  
pip install -r requirements-minimal.txt  # Install minimal dependencies
uvicorn app.main:app --reload --port 8000  # Start with auto-reload
python app/main.py                        # Alternative startup method
```

### Database Management
The application uses SQLite by default with Prisma ORM. For production, it supports PostgreSQL.

```bash
# Switch to PostgreSQL (production)
cd db
docker compose up -d          # Start MySQL/PostgreSQL container

# Update DATABASE_URL in server/.env then:
cd server  
npx prisma generate
npx prisma migrate dev
```

### Testing API Endpoints
```bash
# Health checks
curl http://localhost:4000/health          # Backend health
curl http://localhost:8000/health          # Python service health

# Test main endpoints
curl http://localhost:4000/api/projects    # Get all projects
curl http://localhost:4000/api/posts       # Get all blog posts  
curl http://localhost:4000/api/skills      # Get all skills
curl http://localhost:4000/api/testimonials # Get testimonials
```

## Key Implementation Details

### Rate Limiting Strategy
The backend implements different rate limits:
- General API: 100 requests per 15 minutes
- Authentication: 5 requests per 15 minutes  
- Search: 30 requests per minute
- CMS operations: 200 requests per 15 minutes

### Caching Layer
- In-memory caching for GET requests with 5-minute TTL
- Cache middleware automatically applied to CMS routes
- Cache can be manually cleared via `/api/cache` endpoints

### Content Management System
The CMS routes (`server/src/routes/cms.ts`) provide full CRUD operations for:
- Projects (requires editor/admin role for modifications)
- Blog posts (open for creation, protected for modifications)
- Services, skills, achievements, timeline events
- Testimonials (requires editor/admin role for modifications)

### Environment Configuration
Essential environment variables by service:

**Backend (server/.env):**
- `PORT=4000`
- `DATABASE_URL="file:./dev.db"` 
- `JWT_SECRET=your-secret-key`
- `SMTP_*` variables for email functionality
- `PYTHON_SERVICE_URL=http://localhost:8000`

**Python Service (app/.env):**
- `PORT=8000`
- `OPENAI_API_KEY=your-key` (optional)
- `DATABASE_PATH=../server/prisma/dev.db`

### Deployment Architecture
- Frontend: Vercel (Next.js)
- Backend API: Railway (Express + Prisma)  
- Python Service: Railway (FastAPI)
- Database: Railway PostgreSQL (production)

## Working with the Codebase

### Adding New Features
1. For new API endpoints: Create routes in `server/src/routes/`
2. For database changes: Update `server/prisma/schema.prisma` then run `npx prisma migrate dev`
3. For AI features: Extend `app/main.py` FastAPI application
4. Always apply appropriate rate limiting and authentication middleware

### Database Schema Changes
1. Modify `server/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name descriptive_name`
3. Update TypeScript types with `npx prisma generate`
4. Test with both SQLite (dev) and PostgreSQL (production) if possible

### Authentication Flow
- Admin setup via `node server/create-admin.js` (creates admin@portfolio.com / admin123)
- JWT tokens issued on login with role information
- Protected routes use `authenticateToken` and `requireEditor` middleware
- Role hierarchy: admin > editor > user

### Common Development Tasks
- Add new portfolio project: POST to `/api/projects` with editor+ role
- Add testimonial: POST to `/api/testimonials` with editor+ role  
- Add blog post: POST to `/api/posts` (open endpoint)
- Clear API cache: Use `/api/cache` endpoints
- Monitor service health: Use `/health` endpoints on both services
