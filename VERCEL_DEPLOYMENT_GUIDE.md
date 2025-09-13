# 🚀 Complete Vercel Deployment Guide

This guide will walk you through deploying your MyPortfolio project to Vercel step by step.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ A GitHub account with your project pushed
- ✅ A Vercel account (free tier available)
- ✅ Database setup (we'll cover this)
- ✅ Auth0 account (if using authentication)
- ✅ SMTP email service (Gmail, SendGrid, etc.)

---

## 🛠 Step 1: Prepare Your Database

### Option A: Vercel Postgres (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Storage** → **Create Database**
3. Select **Postgres** → Choose your plan
4. Note down the connection details

### Option B: Other Database Services
Choose one of these cloud database services:
- **Neon** (free tier available)
- **PlanetScale** (MySQL)
- **Supabase** (PostgreSQL with additional features)
- **Railway** (PostgreSQL/MySQL)

---

## 🚀 Step 2: Deploy to Vercel

### 2.1 Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository: `https://github.com/adarsh8081/adarsh_portfolio.git`
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `.` (leave empty)
   - **Build and Output Settings**:
     - Build Command: `npm run vercel-build`
     - Output Directory: `web/.next`
     - Install Command: `npm install`

### 2.2 Configure Environment Variables

In your Vercel project dashboard, go to **Settings** → **Environment Variables** and add the following:

#### Required Variables:
```env
# Database
DATABASE_URL=your_database_connection_string

# API Configuration
NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app/api
NEXT_PUBLIC_FRONTEND_URL=https://your-app-name.vercel.app

# Security
JWT_SECRET=generate-a-strong-random-key-here
NODE_ENV=production

# CORS
CORS_ORIGINS=https://your-app-name.vercel.app
```

#### Optional Variables (if using Auth0):
```env
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=https://your-app-name.vercel.app
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
```

#### Optional Variables (for email functionality):
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM=your-email@gmail.com
MAIL_TO=your-email@gmail.com
```

### 2.3 Deploy

1. Click **"Deploy"**
2. Wait for the deployment to complete (usually 2-3 minutes)
3. Your app will be available at `https://your-app-name.vercel.app`

---

## 🗄 Step 3: Set Up Database

### 3.1 Run Database Migrations

After deployment, you need to run database migrations:

1. Go to your Vercel project dashboard
2. Click **Functions** tab
3. Find a function and click **View Function Logs**
4. Or use Vercel CLI:
   ```bash
   npm install -g vercel
   vercel login
   vercel env pull .env.local
   cd server && npx prisma migrate deploy
   ```

### 3.2 Generate Prisma Client (if needed)

```bash
cd server && npx prisma generate
```

---

## 🔐 Step 4: Configure Auth0 (Optional)

If you're using Auth0 authentication:

1. Go to [Auth0 Dashboard](https://auth0.com/dashboard)
2. Create a new application (Single Page Application)
3. Configure settings:
   - **Allowed Callback URLs**: `https://your-app-name.vercel.app/api/auth/callback`
   - **Allowed Logout URLs**: `https://your-app-name.vercel.app`
   - **Allowed Web Origins**: `https://your-app-name.vercel.app`
4. Update your Vercel environment variables with Auth0 credentials

---

## 📧 Step 5: Configure Email Service

### Option A: Gmail SMTP
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate a password for "Mail"
3. Use this app password in `SMTP_PASS` environment variable

### Option B: SendGrid, Mailgun, etc.
Follow their respective setup guides and update SMTP variables accordingly.

---

## 🧪 Step 6: Test Your Deployment

### 6.1 Test Health Endpoints
- Frontend health: `https://your-app-name.vercel.app/api/health`
- Backend health: `https://your-app-name.vercel.app/health`

### 6.2 Test Main Features
1. ✅ Homepage loads correctly
2. ✅ Navigation works
3. ✅ Contact form (if using email)
4. ✅ Authentication (if configured)
5. ✅ Admin panel (if applicable)
6. ✅ API endpoints respond correctly

---

## 🔧 Step 7: Domain Configuration (Optional)

### 7.1 Custom Domain
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update environment variables to use your custom domain

### 7.2 Update Environment Variables
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_FRONTEND_URL=https://yourdomain.com
CORS_ORIGINS=https://yourdomain.com
AUTH0_BASE_URL=https://yourdomain.com  # if using Auth0
```

---

## 🚨 Troubleshooting

### Common Issues and Solutions:

#### 1. Build Fails
```bash
# Check build logs in Vercel dashboard
# Common fixes:
- Ensure all dependencies are in package.json
- Check TypeScript errors
- Verify environment variables
```

#### 2. Database Connection Issues
```bash
# Verify DATABASE_URL format:
postgresql://username:password@host:port/database?sslmode=require
```

#### 3. API Routes Not Working
```bash
# Check Vercel function logs
# Ensure serverless functions are properly configured
# Verify API base URL in frontend
```

#### 4. Environment Variables Not Working
```bash
# For frontend variables, use NEXT_PUBLIC_ prefix
# Redeploy after adding environment variables
# Check spelling and case sensitivity
```

---

## 📊 Step 8: Monitoring & Analytics

### 8.1 Enable Vercel Analytics
1. Go to your project dashboard
2. Click **Analytics** tab
3. Enable Web Analytics
4. Add `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` to environment variables

### 8.2 Monitor Performance
- Use Vercel's built-in performance monitoring
- Check function execution logs
- Monitor database performance
- Set up uptime monitoring (optional)

---

## 🔄 Step 9: Continuous Deployment

Your project is now configured for automatic deployments:
- ✅ Push to `main` branch → Automatic deployment
- ✅ Pull requests → Preview deployments
- ✅ Environment-specific deployments

---

## 📝 Post-Deployment Checklist

After successful deployment:

- [ ] Test all major features
- [ ] Verify database connections
- [ ] Test email functionality
- [ ] Check authentication flow
- [ ] Validate API responses
- [ ] Test on different devices/browsers
- [ ] Set up monitoring/alerts
- [ ] Update README with live URL
- [ ] Share with stakeholders

---

## 🆘 Need Help?

If you encounter issues:

1. **Check Vercel Function Logs**: Project Dashboard → Functions → View Logs
2. **Check Build Logs**: Deployments tab → Click on deployment → View Build Logs
3. **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
4. **Community Support**: [Vercel Discord](https://discord.gg/vercel)

---

## 🎉 Congratulations!

Your MyPortfolio project is now live on Vercel! 🚀

**Your live URLs:**
- **Production**: `https://your-app-name.vercel.app`
- **API**: `https://your-app-name.vercel.app/api`

Share your portfolio with the world! 🌟
