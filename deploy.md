# Portfolio Deployment Guide

This guide will help you deploy your full-stack portfolio application to production.

## 🚀 Deployment Architecture

- **Frontend (Next.js)**: Vercel
- **Backend API (Node.js)**: Railway
- **Python Service (FastAPI)**: Railway
- **Database**: Railway PostgreSQL

## 📋 Prerequisites

1. **Vercel Account**: [vercel.com](https://vercel.com)
2. **Railway Account**: [railway.app](https://railway.app)
3. **GitHub Repository**: Your code should be in a GitHub repo
4. **Domain (Optional)**: For custom domain setup

## 🗄️ Step 1: Database Setup (Railway)

1. Go to [Railway](https://railway.app) and create a new project
2. Click "Add Service" → "Database" → "PostgreSQL"
3. Wait for the database to be created
4. Copy the `DATABASE_URL` from the Variables tab
5. Note the database credentials for later use

## 🔧 Step 2: Backend API Deployment (Railway)

1. In your Railway project, click "Add Service" → "GitHub Repo"
2. Select your repository and choose the `server` folder
3. Railway will automatically detect the Dockerfile
4. Set the following environment variables:

```env
PORT=4000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_TO=your-email@gmail.com
PYTHON_SERVICE_URL=https://your-python-service.railway.app
```

5. Deploy the service
6. Note the deployed URL (e.g., `https://your-api.railway.app`)

## 🐍 Step 3: Python Service Deployment (Railway)

1. In your Railway project, click "Add Service" → "GitHub Repo"
2. Select your repository and choose the `python` folder
3. Set the following environment variables:

```env
OPENAI_API_KEY=your-openai-api-key (optional)
GEMINI_API_KEY=your-gemini-api-key (optional)
DATABASE_PATH=../server/prisma/dev.db (will be updated to use PostgreSQL)
PORT=8000
```

4. Deploy the service
5. Note the deployed URL (e.g., `https://your-python-service.railway.app`)

## 🌐 Step 4: Frontend Deployment (Vercel)

1. Go to [Vercel](https://vercel.com) and import your GitHub repository
2. Set the root directory to `web`
3. Configure environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_CHATBOT_URL=https://your-python-service.railway.app
```

4. Deploy the application
5. Note the deployed URL (e.g., `https://your-portfolio.vercel.app`)

## 🔄 Step 5: Database Migration

1. Connect to your Railway PostgreSQL database
2. Run the Prisma migration:

```bash
cd server
npx prisma migrate deploy
npx prisma generate
```

## 🔧 Step 6: Update Python Service Database Connection

Update the Python service to use PostgreSQL instead of SQLite:

1. Install psycopg2 in your Python requirements
2. Update the database connection in `python/app/main.py`
3. Redeploy the Python service

## 🌍 Step 7: Custom Domain (Optional)

### For Vercel (Frontend):
1. Go to your Vercel project settings
2. Add your custom domain
3. Update DNS records as instructed

### For Railway (Backend/Python):
1. Go to your Railway service settings
2. Add custom domain
3. Update DNS records

## 📊 Step 8: Monitoring & Analytics

1. **Vercel Analytics**: Automatically enabled
2. **Railway Monitoring**: Built-in monitoring available
3. **Custom Analytics**: Update your analytics configuration

## 🔐 Step 9: Security Configuration

1. **CORS**: Update CORS origins in your backend services
2. **Rate Limiting**: Already configured in your code
3. **Environment Variables**: Ensure all sensitive data is in environment variables
4. **SSL**: Automatically handled by Vercel and Railway

## 🧪 Step 10: Testing

1. Test all API endpoints
2. Test the frontend functionality
3. Test the AI chatbot
4. Test email functionality
5. Test admin dashboard

## 📝 Environment Variables Summary

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_CHATBOT_URL`

### Backend (Railway)
- `PORT`
- `DATABASE_URL`
- `JWT_SECRET`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO`
- `PYTHON_SERVICE_URL`

### Python Service (Railway)
- `OPENAI_API_KEY` (optional)
- `GEMINI_API_KEY` (optional)
- `DATABASE_PATH` (will be updated for PostgreSQL)
- `PORT`

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Update CORS origins in backend services
2. **Database Connection**: Verify DATABASE_URL format
3. **Environment Variables**: Ensure all required variables are set
4. **Build Failures**: Check build logs in Railway/Vercel
5. **API Timeouts**: Increase timeout settings if needed

### Debug Commands:

```bash
# Check backend health
curl https://your-api.railway.app/health

# Check Python service health
curl https://your-python-service.railway.app/health

# Test database connection
npx prisma db pull
```

## 📈 Performance Optimization

1. **CDN**: Vercel provides global CDN
2. **Caching**: Implemented in your backend
3. **Image Optimization**: Next.js handles this automatically
4. **Database Indexing**: Prisma handles this

## 🔄 Continuous Deployment

Both Vercel and Railway support automatic deployments:
- Push to main branch → Automatic deployment
- Pull requests → Preview deployments (Vercel)

## 📞 Support

- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Railway**: [railway.app/support](https://railway.app/support)
- **Documentation**: Check individual service documentation

---

Your portfolio should now be live and accessible! 🎉
