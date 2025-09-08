## MyPortfolio Monorepo

This repository contains a full-stack portfolio application organized as a monorepo with separate packages for the frontend (Next.js), backend API (Node/Express + Prisma), a small Python service (FastAPI), and optional DB infrastructure via Docker Compose.

### Structure

- `db/` – Docker Compose for MySQL (optional)
- `server/` – Node.js/Express API with Prisma (SQLite by default)
- `python/` – FastAPI microservice for chatbot-like endpoint
- `web/` – Next.js 15 + React 19 frontend
- `shared/` – Placeholder for shared code (currently empty)

### Prerequisites

- Node.js 20+
- npm 10+
- Python 3.10+
- Docker (optional, only if you want to run MySQL from `db/`)

---

## Backend API (`server/`)

Express API providing CMS-style endpoints for Projects, Posts, Services, and Skills, plus a contact email endpoint.

### Tech

- Express 5, TypeScript
- Prisma 6 with SQLite (default)
- Nodemailer for email sending

### Scripts

```bash
npm run dev           # Start API in watch mode (ts-node-dev)
npm run build         # TypeScript build to dist/
npm run start         # Start compiled server from dist/
npm run prisma:generate
npm run prisma:migrate  # Prisma migrate dev
```

### Environment

Create `server/.env`:

```ini
# Server
PORT=4000
DATABASE_URL="file:./dev.db"

# Email (SMTP)
SMTP_HOST= # e.g. smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Sender and recipient defaults
MAIL_FROM=
MAIL_TO=
```

Defaults:
- API listens on `http://localhost:4000`
- Base API path used by the frontend: `/api`

### Running

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Health check: `GET http://localhost:4000/health` → `{ ok: true }`

### REST API

Base URL: `http://localhost:4000/api`

#### Public Endpoints (No Auth Required)
- `GET /projects` - List all projects
- `GET /posts` - List all blog posts
- `GET /services` - List all services
- `GET /skills` - List all skills
- `GET /testimonials` - List all testimonials
- `GET /achievements` - List all achievements
- `GET /timeline` - List all timeline events
- `POST /contact` - Send contact email

#### Protected Endpoints (Require Authentication)
- `POST /projects` - Create project (Editor/Admin)
- `PUT /projects/:id` - Update project (Editor/Admin)
- `DELETE /projects/:id` - Delete project (Editor/Admin)
- `POST /testimonials` - Create testimonial (Editor/Admin)
- `PUT /testimonials/:id` - Update testimonial (Editor/Admin)
- `DELETE /testimonials/:id` - Delete testimonial (Editor/Admin)
- `POST /achievements` - Create achievement (Editor/Admin)
- `PUT /achievements/:id` - Update achievement (Editor/Admin)
- `DELETE /achievements/:id` - Delete achievement (Editor/Admin)
- `POST /timeline` - Create timeline event (Editor/Admin)
- `PUT /timeline/:id` - Update timeline event (Editor/Admin)
- `DELETE /timeline/:id` - Delete timeline event (Editor/Admin)

#### Authentication Endpoints
- `POST /auth/login` - Login with email/password
- `POST /auth/register` - Register new user (Admin only)
- `GET /auth/me` - Get current user info
- `POST /auth/setup` - Create initial admin user

#### Cache Management (Admin only)
- `POST /cache/clear` - Clear API cache
- `GET /cache/stats` - Get cache statistics

Prisma schema uses SQLite by default (`prisma/dev.db`). If switching to MySQL, set `DATABASE_URL` accordingly and run migrations.

---

## Frontend (`web/`)

Next.js app with multiple pages: `about`, `admin`, `blog/[slug]`, `contact`, `education`, `experience`, `projects`, `services`, `skills`, plus `sitemap` and `robots` endpoints.

### Tech

- Next.js 15 (Turbopack), React 19
- Tailwind CSS v4, PostCSS
- Client libs: `axios`, `swr`, `react-hook-form`, `framer-motion`, `react-markdown`, `rehype-*`, `three` (via `@react-three/*`)

### Scripts

```bash
npm run dev    # Next dev with Turbopack
npm run build  # Next build with Turbopack
npm run start  # Start production server
npm run lint   # ESLint
```

### Environment

Create `web/.env.local`:

```ini
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

The Axios instance (`src/lib/api.ts`) defaults to `http://localhost:4000/api` when the env is not set.

### Running

```bash
cd web
npm install
npm run dev
# open http://localhost:3000
```

---

## Python Service (`python/`)

FastAPI app with AI-powered vector search capabilities using sentence transformers and FAISS.

### Dependencies

Pinned in `python/requirements.txt` including:
- `sentence-transformers` for embeddings
- `faiss-cpu` for vector similarity search
- `fastapi` with CORS middleware

### Running (Windows PowerShell)

```powershell
cd python
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
cd python
 .\venv\Scripts\Activate.ps1
 python app/main.py

### API Endpoints

- `GET /health` → `{ ok: true }`
- `POST /search` body: `{ query: string, limit?: number }` → `SearchResult[]`
- `POST /chat` body: `{ question: string, context?: string[] }` → `{ answer: string, sources: object[] }`
- `GET /portfolio` → `{ items: PortfolioItem[] }`

### Features

- **Vector Search**: Semantic search using sentence transformers and FAISS
- **AI Chat**: Enhanced chatbot with vector search context
- **Portfolio Data**: Pre-indexed sample data for projects and skills
- **CORS Enabled**: Ready for frontend integration

---

## Database via Docker (`db/`)

Optional MySQL 8 service (not used by default; Prisma is configured for SQLite). Use this if you plan to migrate the backend to MySQL.

```bash
cd db
docker compose up -d
# MySQL on 3306, db name: portfolio, user: root / password: root
```

To use MySQL with Prisma, set in `server/.env`:

```ini
DATABASE_URL=mysql://root:root@localhost:3306/portfolio
```

Then re-generate and migrate:

```bash
cd server
npx prisma generate
npx prisma migrate dev
```

---

## Development Workflow

1) Start Backend API

```bash
cd server; npm install; npm run dev
```

2) Start Frontend

```bash
cd web; npm install; npm run dev
```

3) Start AI Search Service

```bash
cd python && uvicorn app.main:app --reload --port 8000
```

### New Features Added

- **Glassmorphism Hero**: Interactive 3D torus with mouse tracking and glassmorphism design
- **Dynamic Theming**: Multiple accent colors (indigo, violet, emerald, rose) with persistence
- **Smooth Scrolling**: Lenis integration with motion-driven scrollytelling sections
- **AI Search**: Vector-based semantic search with real-time results and keyboard shortcuts (Cmd+/)
- **Enhanced Animations**: Framer Motion with scroll-triggered reveals and parallax effects
- **Expanded CMS**: Testimonials, Achievements, and Timeline management
- **Authentication**: JWT-based auth with role-based access control (Admin/Editor/User)
- **Admin Dashboard**: Complete admin interface at `/admin` with CRUD operations
- **Rate Limiting**: API protection with configurable rate limits
- **Caching**: In-memory caching for improved performance
- **RAG Chatbot**: AI-powered chatbot with Retrieval-Augmented Generation using real portfolio data
- **LLM Integration**: OpenAI GPT-3.5/4 or local Hugging Face models for intelligent responses
- **Voice Mode**: Text-to-Speech (TTS) and Speech-to-Text (STT) capabilities
- **Real-time Data Sync**: Automatic synchronization between backend and AI service

---

## Admin Dashboard

Access the admin dashboard at `http://localhost:3000/admin`

**Demo Credentials:**
- Email: `admin@portfolio.com`
- Password: `admin123`

**Features:**

#### 📊 Content Management
- **Projects**: Full CRUD operations with rich text editing, image uploads, and categorization
- **Blog Posts**: Create and manage blog content with tags, featured posts, and SEO optimization
- **Services**: Manage service offerings with pricing, features, and availability status
- **Skills**: Track technical skills with proficiency levels, years of experience, and project counts
- **Testimonials**: Collect and display client testimonials with ratings and photos
- **Achievements**: Showcase certifications, awards, and professional milestones
- **Timeline**: Create professional timeline with education, work experience, and achievements

#### 👥 User Management
- **Role-based Access**: Admin, Editor, and User roles with different permissions
- **User Profiles**: Manage user accounts, roles, and permissions
- **Authentication**: Secure JWT-based authentication with session management

#### 🤖 AI Chatbot Management
- **Knowledge Base**: Monitor and refresh AI knowledge base with portfolio data
- **Conversation Analytics**: Track chatbot usage, popular questions, and response quality
- **Voice Controls**: Manage TTS/STT settings and voice mode preferences
- **Performance Monitoring**: Real-time status monitoring and health checks

#### 📈 Analytics Dashboard
- **Google Analytics Integration**: Track page views, user behavior, and conversion metrics
- **PostHog Integration**: Advanced user analytics, feature flags, and A/B testing
- **Real-time Metrics**: Live visitor tracking, active users, and page performance
- **Content Performance**: Track which projects, posts, and services are most popular
- **Custom Events**: Track portfolio interactions, downloads, and contact form submissions

#### ⚙️ System Management
- **Settings Panel**: Configure site settings, social links, and feature toggles
- **Cache Management**: Clear and manage application caches for optimal performance
- **Data Export**: Export content and analytics data in CSV format
- **Real-time Sync**: Automatic data synchronization between services
- **Health Monitoring**: Monitor all services and their status in real-time

---

## RAG Chatbot Features

The portfolio includes an advanced AI-powered chatbot with the following capabilities:

### 🤖 Intelligent Responses
- **RAG (Retrieval-Augmented Generation)**: Uses real portfolio data from the database
- **LLM Integration**: Supports OpenAI GPT-3.5/4 or local Hugging Face models
- **Context-Aware**: Maintains conversation history for better responses
- **Source Attribution**: Shows which portfolio items were used to generate answers

### 🎤 Voice Mode
- **Speech-to-Text**: Voice input using browser's Web Speech API
- **Text-to-Speech**: Audio responses using pyttsx3 (Python) or Web Speech API
- **Audio Caching**: Efficient audio generation and caching
- **Voice Controls**: Toggle voice mode on/off with visual indicators

### 🔄 Real-time Data Sync
- **Database Integration**: Automatically loads Projects, Posts, Skills, Services, Testimonials, and Achievements
- **Vector Search**: Uses sentence-transformers and FAISS for semantic search
- **Auto-refresh**: Admin can trigger data refresh from the dashboard
- **Health Monitoring**: Real-time status and statistics in admin panel

### 🎨 Enhanced UI
- **Modern Design**: Glassmorphism interface with smooth animations
- **Conversation History**: Persistent chat history with timestamps
- **Source Display**: Shows relevant portfolio items used in responses
- **Loading States**: Visual feedback during AI processing
- **Error Handling**: Graceful fallbacks and error messages

### 🔧 Configuration
- **Environment Variables**: Configure OpenAI API key, database path, etc.
- **Model Selection**: Choose between OpenAI or local Hugging Face models
- **TTS Settings**: Customizable voice speed, volume, and voice selection
- **Rate Limiting**: Built-in protection against abuse

### 📊 Admin Management
- **AI Service Status**: Monitor LLM availability, TTS status, and portfolio items
- **Data Refresh**: Manually trigger AI data synchronization
- **Statistics**: View embedding model, cache size, and service health
- **Real-time Monitoring**: Live status updates in the admin dashboard

## Environment Variables

### Backend (`server/.env`)
```ini
# Server
PORT=4000
DATABASE_URL="file:./dev.db"

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Python Service
PYTHON_SERVICE_URL=http://localhost:8000
```

### Frontend (`web/.env.local`)
```ini
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CHATBOT_URL=http://localhost:8000
```

### Python Service (`python/.env`)
```ini
# OpenAI (optional - if not set, uses local Hugging Face model)
OPENAI_API_KEY=your-openai-api-key

# Database
DATABASE_PATH=../server/prisma/dev.db

# TTS Settings
TTS_RATE=150
TTS_VOLUME=0.8
```

### Frontend (`web/.env.local`)
```ini
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CHATBOT_URL=http://localhost:8000

# Analytics Configuration (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

## Notes

- The frontend consumes the API at `NEXT_PUBLIC_API_URL`.
- Prisma models: `Project`, `Post`, `Service`, `Skill`, `Testimonial`, `Achievement`, `TimelineEvent`, `User`
- Authentication uses JWT tokens stored in localStorage
- Rate limiting: 100 requests/15min general, 5 auth requests/15min, 30 search requests/min
- Cache TTL: 5 minutes for GET requests
- RAG Chatbot: Requires Python service running on port 8000
- Voice Mode: Requires browser support for Web Speech API
- If you change database provider, update `schema.prisma` and `DATABASE_URL`, then run migrations again


#   P o r t F o l i o  
 