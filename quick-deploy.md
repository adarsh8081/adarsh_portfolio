# Quick Deployment Guide

## 🚀 One-Click Deployment Options

### Option 1: Vercel (Recommended for Frontend)

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Frontend**:
   - Root Directory: `web`
   - Framework: Next.js (auto-detected)
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-api.railway.app
     NEXT_PUBLIC_CHATBOT_URL=https://your-python.railway.app
     ```

3. **Deploy**: Click "Deploy" - Vercel handles everything!

### Option 2: Railway (Full Stack)

1. **Connect to Railway**:
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"

2. **Deploy Services**:
   - **Database**: Add PostgreSQL service
   - **Backend**: Deploy from `server` folder
   - **Python**: Deploy from `python` folder
   - **Frontend**: Deploy from `web` folder (or use Vercel)

### Option 3: Render (Alternative)

1. **Connect to Render**:
   - Go to [render.com](https://render.com)
   - Sign in with GitHub
   - Create new services

2. **Deploy Services**:
   - **Web Service**: Frontend (Next.js)
   - **Web Service**: Backend API (Node.js)
   - **Web Service**: Python Service (Python)
   - **PostgreSQL**: Database

## 🔧 Environment Variables

### Frontend (Vercel)
```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_CHATBOT_URL=https://your-python.railway.app
```

### Backend (Railway/Render)
```env
PORT=4000
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-super-secret-jwt-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_TO=your-email@gmail.com
PYTHON_SERVICE_URL=https://your-python.railway.app
```

### Python Service (Railway/Render)
```env
DATABASE_URL=postgresql://user:pass@host:port/db
OPENAI_API_KEY=your-openai-key (optional)
GEMINI_API_KEY=your-gemini-key (optional)
PORT=8000
```

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables ready
- [ ] Database credentials obtained
- [ ] SMTP credentials configured
- [ ] API keys obtained (OpenAI/Gemini)
- [ ] Custom domain ready (optional)

## 🚀 Quick Start Commands

### Windows PowerShell
```powershell
# Run deployment script
.\deploy.ps1

# Skip tests
.\deploy.ps1 -SkipTests

# Skip build
.\deploy.ps1 -SkipBuild
```

### Linux/Mac
```bash
# Run deployment script
./deploy.sh

# Make executable
chmod +x deploy.sh
```

## 🔍 Post-Deployment

1. **Test all endpoints**:
   - Frontend: `https://your-site.vercel.app`
   - API: `https://your-api.railway.app/health`
   - Python: `https://your-python.railway.app/health`

2. **Set up monitoring**:
   - Vercel Analytics (automatic)
   - Railway Metrics
   - Custom monitoring

3. **Configure domain**:
   - Add custom domain in Vercel
   - Update DNS records
   - Enable SSL

## 🆘 Troubleshooting

### Common Issues:
- **CORS errors**: Update CORS origins in backend
- **Database connection**: Check DATABASE_URL format
- **Build failures**: Check logs in deployment platform
- **Environment variables**: Ensure all are set correctly

### Debug Commands:
```bash
# Check API health
curl https://your-api.railway.app/health

# Check Python service
curl https://your-python.railway.app/health

# Test database
npx prisma db pull
```

## 📞 Support

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Railway**: [railway.app/support](https://railway.app/support)
- **Render**: [render.com/support](https://render.com/support)

---

**Ready to deploy?** Choose your preferred platform and follow the steps above! 🚀
