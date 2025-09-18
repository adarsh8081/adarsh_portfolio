# 🚀 Portfolio Project - Full Stack AI-Powered Portfolio

A comprehensive, modern portfolio website built with Next.js, Node.js, Python FastAPI, and AI-powered chatbot functionality.

## 🚀 Vercel Deployment
This project is configured for Vercel deployment with the Next.js app in the `web` folder.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Testing](#testing)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## ✨ Features

### Frontend (Next.js)
- 🎨 Modern, responsive design with glassmorphism effects
- 🌙 Dark/Light theme support
- 📱 Mobile-first responsive design
- 🎭 Smooth animations with Framer Motion
- 🎯 3D elements with Three.js
- 🔍 Advanced search functionality
- 📊 Analytics integration

### Backend (Node.js + Express)
- 🔐 JWT-based authentication
- 📧 Email service integration
- 📊 Analytics tracking
- 🗄️ Database management with Prisma
- 🚀 Rate limiting and caching
- 📝 CMS functionality

### AI Features (Frontend)
- 🔍 AI-powered search functionality
- 🎨 Smart content recommendations
- 📊 Intelligent analytics integration
- 🎯 Dynamic content adaptation

### Testing
- 🧪 Comprehensive test suite with Cypress (E2E)
- 🔬 Selenium automation testing
- 🧪 API testing with pytest
- 🔍 Integration testing
- 📊 Test coverage reporting

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber
- **Testing**: Cypress
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + Auth0
- **Email**: Nodemailer
- **Testing**: Jest + Supertest
- **Deployment**: Railway

### AI Features
- **Search**: Intelligent content search
- **Analytics**: Smart data insights
- **Adaptation**: Dynamic content rendering
- **Integration**: Seamless user experience

### DevOps
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoring**: Built-in health checks
- **Security**: Rate limiting, CORS, input validation

## 📁 Project Structure

```
portfolio/
├── web/                    # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
│   ├── cypress/           # E2E tests
│   └── public/            # Static assets
├── server/                # Node.js Backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── prisma.ts      # Database client
│   └── prisma/            # Database schema and migrations
├── tests/                  # Comprehensive test suite
│   ├── test_api.py        # API tests
│   ├── test_database.py   # Database tests
│   └── test_integration.py # Integration tests
├── docker-compose.yml      # Multi-service Docker setup
├── .github/workflows/      # CI/CD pipelines
└── docs/                   # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL 15+
- Docker (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Database Setup

```bash
# Start PostgreSQL (using Docker)
docker run --name portfolio-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=portfolio -p 5432:5432 -d postgres:15

# Or use local PostgreSQL
createdb portfolio
```

### 4. Install Dependencies

```bash
# Install frontend dependencies
cd web && npm install && cd ..

# Install backend dependencies
cd server && npm install && cd ..

# Install Python dependencies
cd python && pip install -r requirements.txt && cd ..

# Install test dependencies
pip install -r tests/requirements.txt
```

### 5. Database Migration

```bash
cd server
npx prisma migrate dev
npx prisma generate
cd ..
```

### 6. Start Services

#### Option A: Docker Compose (Recommended)

```bash
docker-compose up -d
```

#### Option B: PowerShell Script (Windows)

```powershell
# Run the development startup script
.\start-dev.ps1
```

---

## 🚀 Deployment

### Quick Deploy to Vercel (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Import Repository**: `adarsh8081/adarsh_portfolio`
3. **Configure**:
   - Framework: **Next.js**
   - Root Directory: **web**
   - Build Command: **npm run build** (default)
4. **Add Environment Variables** (see `SIMPLE_VERCEL_DEPLOY.md`)
5. **Deploy!** 🎉

**📚 Deployment Guides:**
- `SIMPLE_VERCEL_DEPLOY.md` - Easiest deployment (frontend only)
- `VERCEL_DEPLOYMENT_GUIDE.md` - Complete full-stack deployment
- `FRONTEND_ONLY_VERCEL.md` - Alternative approach

#### Option C: Manual Start

```bash
# Terminal 1: Start Backend API
cd server && npm run dev

# Terminal 2: Start Python Service
cd python && uvicorn app.main:app --reload

# Terminal 3: Start Frontend
cd web && npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **Python Service**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 🧪 Testing

### Run All Tests

```bash
# Using the test runner script
./run_tests.sh

# Or using PowerShell on Windows
.\run_tests.ps1
```

### Run Specific Test Suites

```bash
# Frontend tests (Cypress)
cd web && npm run test

# Backend API tests
cd server && npm test

# Python service tests
cd python && python -m pytest ../tests/test_python_service.py

# Integration tests
python -m pytest tests/test_integration.py

# All Python tests
python -m pytest tests/
```

### Test Reports

- **Cypress**: Reports in `web/cypress/reports/`
- **Python**: HTML report in `reports/pytest_report.html`
- **Coverage**: Coverage reports in `coverage/`

## 🚀 Deployment

### Production Deployment

#### 1. Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from web directory
cd web
vercel --prod
```

#### 2. Backend (Railway)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway deploy
```

#### 3. Python Service (Railway)

```bash
# Deploy Python service
cd python
railway deploy
```

### Environment Variables

Set the following environment variables in your deployment platforms:

#### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_CHATBOT_URL=https://your-python-service.railway.app
```

#### Backend (Railway)
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
PYTHON_SERVICE_URL=https://your-python-service.railway.app
```

#### Python Service (Railway)
```
DATABASE_URL=postgresql://username:password@host:port/database
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

## 📚 API Documentation

### Backend API Endpoints

- `GET /health` - Health check
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/projects` - Get projects
- `POST /api/email` - Send email
- `GET /api/analytics` - Get analytics

### Python Service Endpoints

- `GET /health` - Health check
- `POST /search` - Vector search
- `POST /chat` - AI chatbot
- `GET /portfolio` - Portfolio data
- `GET /stats` - Service statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/portfolio/issues) page
2. Create a new issue with detailed information
3. Contact: your-email@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Railway for backend hosting
- OpenAI and Google for AI services
- The open-source community for amazing tools

---

**Made with ❤️ by [Your Name](https://yourwebsite.com)**