# 🚀 MyPortfolio Monorepo

<div align="center">

![Portfolio](https://img.shields.io/badge/Portfolio-Monorepo-blue?style=for-the-badge&logo=github)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.10+-green?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green?style=for-the-badge&logo=fastapi)

*A modern, full-stack portfolio application with AI-powered features and beautiful UI*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Portfolio-brightgreen?style=for-the-badge)](https://your-portfolio-url.com)
[![Documentation](https://img.shields.io/badge/Documentation-Read%20More-orange?style=for-the-badge)](#documentation)
[![Contributing](https://img.shields.io/badge/Contributing-Welcome-purple?style=for-the-badge)](CONTRIBUTING.md)

</div>

---

## ✨ Features

### 🎨 **Modern Frontend**
- **Next.js 15** with React 19 and Turbopack
- **Glassmorphism Design** with interactive 3D elements
- **Dynamic Theming** with multiple accent colors
- **Smooth Animations** using Framer Motion
- **Responsive Design** for all devices

### 🤖 **AI-Powered Features**
- **RAG Chatbot** with Retrieval-Augmented Generation
- **Vector Search** using sentence transformers and FAISS
- **Voice Mode** with Speech-to-Text and Text-to-Speech
- **Real-time Data Sync** with portfolio content

### 🔧 **Backend Services**
- **Express API** with TypeScript and Prisma
- **FastAPI Python Service** for AI capabilities
- **JWT Authentication** with role-based access
- **Rate Limiting** and caching for performance

### 📊 **Admin Dashboard**
- **Content Management** for all portfolio sections
- **User Management** with role-based permissions
- **Analytics Integration** with Google Analytics and PostHog
- **Real-time Monitoring** of all services

---

## 🏗️ Architecture

```mermaid
graph TB
    A[Frontend - Next.js] --> B[Backend API - Express]
    A --> C[Python AI Service - FastAPI]
    B --> D[Database - SQLite/MySQL]
    C --> D
    B --> E[Email Service - Nodemailer]
    A --> F[Admin Dashboard]
    F --> B
    F --> C
```

### 📁 Project Structure

```
myportfolio/
├── 🌐 web/                 # Next.js 15 Frontend
├── ⚙️ server/              # Express API Backend
├── 🐍 python/              # FastAPI AI Service
├── 🗄️ db/                  # Docker MySQL (Optional)
├── 📦 shared/              # Shared utilities
└── 📄 README.md
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+ 
- **npm** 10+
- **Python** 3.10+
- **Docker** (optional, for MySQL)

### 1️⃣ Clone & Install

```bash
git clone https://github.com/adarsh8081/PortFolio.git
cd PortFolio
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd web
npm install
npm run dev
```

### 4️⃣ AI Service Setup

```bash
cd python
python -m venv .venv
.\.venv\Scripts\Activate.ps1  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 5️⃣ Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:4000
- **AI Service**: http://localhost:8000
- **Admin Dashboard**: http://localhost:3000/admin

---

## 🔧 Configuration

### Backend Environment (`server/.env`)

```ini
# Server Configuration
PORT=4000
DATABASE_URL="file:./dev.db"

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# JWT Security
JWT_SECRET=your-super-secret-jwt-key

# AI Service Integration
PYTHON_SERVICE_URL=http://localhost:8000
```

### Frontend Environment (`web/.env.local`)

```ini
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_CHATBOT_URL=http://localhost:8000

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Python Service Environment (`python/.env`)

```ini
# OpenAI Configuration (Optional)
OPENAI_API_KEY=your-openai-api-key

# Database Path
DATABASE_PATH=../server/prisma/dev.db

# TTS Settings
TTS_RATE=150
TTS_VOLUME=0.8
```

---

## 📚 API Documentation

### 🔗 Base URL
```
http://localhost:4000/api
```

### 📖 Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects` | List all projects |
| `GET` | `/posts` | List all blog posts |
| `GET` | `/services` | List all services |
| `GET` | `/skills` | List all skills |
| `GET` | `/testimonials` | List all testimonials |
| `GET` | `/achievements` | List all achievements |
| `GET` | `/timeline` | List all timeline events |
| `POST` | `/contact` | Send contact email |

### 🔒 Protected Endpoints

| Method | Endpoint | Description | Role Required |
|--------|----------|-------------|---------------|
| `POST` | `/projects` | Create project | Editor/Admin |
| `PUT` | `/projects/:id` | Update project | Editor/Admin |
| `DELETE` | `/projects/:id` | Delete project | Editor/Admin |
| `POST` | `/testimonials` | Create testimonial | Editor/Admin |
| `PUT` | `/testimonials/:id` | Update testimonial | Editor/Admin |
| `DELETE` | `/testimonials/:id` | Delete testimonial | Editor/Admin |

### 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Login with email/password |
| `POST` | `/auth/register` | Register new user (Admin only) |
| `GET` | `/auth/me` | Get current user info |
| `POST` | `/auth/setup` | Create initial admin user |

---

## 🤖 AI Chatbot Features

### 🧠 **Intelligent Responses**
- **RAG (Retrieval-Augmented Generation)** using real portfolio data
- **LLM Integration** with OpenAI GPT-3.5/4 or local Hugging Face models
- **Context-Aware** conversation history
- **Source Attribution** showing which portfolio items were used

### 🎤 **Voice Mode**
- **Speech-to-Text** using browser's Web Speech API
- **Text-to-Speech** with customizable voice settings
- **Audio Caching** for efficient performance
- **Voice Controls** with visual indicators

### 🔄 **Real-time Data Sync**
- **Database Integration** with automatic data loading
- **Vector Search** using sentence-transformers and FAISS
- **Auto-refresh** capabilities from admin dashboard
- **Health Monitoring** with real-time status updates

---

## 📊 Admin Dashboard

Access the admin dashboard at `http://localhost:3000/admin`

### 🔑 Demo Credentials
- **Email**: `admin@portfolio.com`
- **Password**: `admin123`

### 📋 Features

#### 📝 Content Management
- **Projects**: Full CRUD with rich text editing and image uploads
- **Blog Posts**: Create and manage content with tags and SEO
- **Services**: Manage offerings with pricing and features
- **Skills**: Track technical skills with proficiency levels
- **Testimonials**: Collect and display client feedback
- **Achievements**: Showcase certifications and awards
- **Timeline**: Create professional timeline events

#### 👥 User Management
- **Role-based Access**: Admin, Editor, and User roles
- **User Profiles**: Manage accounts and permissions
- **Authentication**: Secure JWT-based auth with sessions

#### 🤖 AI Chatbot Management
- **Knowledge Base**: Monitor and refresh AI data
- **Conversation Analytics**: Track usage and quality
- **Voice Controls**: Manage TTS/STT settings
- **Performance Monitoring**: Real-time status checks

#### 📈 Analytics Dashboard
- **Google Analytics**: Track page views and behavior
- **PostHog Integration**: Advanced analytics and A/B testing
- **Real-time Metrics**: Live visitor tracking
- **Content Performance**: Track popular content
- **Custom Events**: Track interactions and conversions

---

## 🛠️ Development

### Available Scripts

#### Backend (`server/`)
```bash
npm run dev           # Start API in watch mode
npm run build         # TypeScript build to dist/
npm run start         # Start compiled server
npm run prisma:generate
npm run prisma:migrate
```

#### Frontend (`web/`)
```bash
npm run dev          # Next dev with Turbopack
npm run build        # Next build with Turbopack
npm run start        # Start production server
npm run lint         # ESLint
```

#### Python Service (`python/`)
```bash
uvicorn app.main:app --reload --port 8000
```

### 🗄️ Database

The application uses **SQLite** by default with Prisma ORM. To switch to MySQL:

1. Start MySQL with Docker:
```bash
cd db
docker compose up -d
```

2. Update `server/.env`:
```ini
DATABASE_URL=mysql://root:root@localhost:3306/portfolio
```

3. Run migrations:
```bash
cd server
npx prisma generate
npx prisma migrate dev
```

---

## 🎨 Technologies Used

### Frontend
- **Next.js 15** - React framework with Turbopack
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Three.js** - 3D graphics library
- **Axios** - HTTP client
- **SWR** - Data fetching library

### Backend
- **Express 5** - Web framework
- **Prisma 6** - Database ORM
- **Nodemailer** - Email service
- **JWT** - Authentication
- **Rate Limiting** - API protection

### AI Service
- **FastAPI** - Python web framework
- **Sentence Transformers** - Text embeddings
- **FAISS** - Vector similarity search
- **OpenAI API** - LLM integration
- **pyttsx3** - Text-to-speech

### Database
- **SQLite** - Default database
- **MySQL** - Optional production database
- **Docker** - Containerization

---

## 📈 Performance Features

- **⚡ Turbopack** for ultra-fast development
- **🚀 Server-side Rendering** with Next.js
- **💾 In-memory Caching** for API responses
- **🔄 Real-time Data Sync** between services
- **📊 Analytics Integration** for performance monitoring
- **🛡️ Rate Limiting** for API protection
- **🎯 Optimized Images** and assets

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment tools
- **OpenAI** for AI capabilities
- **Hugging Face** for open-source models
- **Prisma** for the excellent ORM
- **Tailwind CSS** for the utility-first approach

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/adarsh8081/PortFolio?style=social)](https://github.com/adarsh8081/PortFolio)
[![GitHub forks](https://img.shields.io/github/forks/adarsh8081/PortFolio?style=social)](https://github.com/adarsh8081/PortFolio)
[![GitHub issues](https://img.shields.io/github/issues/adarsh8081/PortFolio?style=social)](https://github.com/adarsh8081/PortFolio)

Made with ❤️ by [Your Name](https://github.com/adarsh8081)

</div>