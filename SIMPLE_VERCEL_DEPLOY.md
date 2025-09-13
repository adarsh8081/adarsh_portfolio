# 🚀 Simple Vercel Deployment (Recommended)

This is the easiest way to deploy your portfolio to Vercel. We'll deploy the frontend to Vercel and you can deploy the backend separately to Railway or another service.

## ✅ Step-by-Step Deployment

### 1. Go to Vercel Dashboard
- Visit: [https://vercel.com/dashboard](https://vercel.com/dashboard)
- Sign in with GitHub

### 2. Import Your Project
- Click **"New Project"**
- Select **"Import Git Repository"**
- Choose: `adarsh8081/adarsh_portfolio`

### 3. Configure Project Settings
**IMPORTANT**: Use these exact settings:

```
Framework Preset: Next.js
Root Directory: web
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**⚠️ Make sure Root Directory is set to `web` - this is crucial!**

### 4. Add Environment Variables
Click **"Environment Variables"** and add these **REQUIRED** variables:

```env
# Your Vercel app URL (update after first deployment)
NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app/api

# Auth0 (if using authentication)
AUTH0_SECRET=use-a-long-random-value
AUTH0_BASE_URL=https://your-app-name.vercel.app
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
```

### 5. Deploy!
- Click **"Deploy"**
- Wait 2-3 minutes for build to complete
- Your site will be live at `https://your-app-name.vercel.app`

## 🔧 After Deployment

### Update API URL
1. Note your Vercel app URL (e.g., `https://my-portfolio-abc123.vercel.app`)
2. Go to **Settings** → **Environment Variables**
3. Update `NEXT_PUBLIC_API_URL` to point to your backend
   - If backend is on Railway: `https://your-backend.railway.app/api`
   - If backend is elsewhere: `https://your-backend-url.com/api`

### Deploy Backend Separately (Optional)
If you need the backend features:
1. Deploy `server` folder to Railway, Heroku, or Render
2. Update `NEXT_PUBLIC_API_URL` to point to your backend
3. Set up database (PostgreSQL on Railway, Neon, or Supabase)

## 🎉 That's It!
Your portfolio is now live! The frontend includes:
- ✅ Portfolio pages
- ✅ Blog functionality
- ✅ Contact forms (need backend for email)
- ✅ Admin panel (need backend for CMS)

## 🆘 Troubleshooting

### Build Fails?
- Check that you selected **Next.js** as framework
- Ensure **Root Directory** is set to `web`
- Check the build logs for specific errors

### Environment Variables Not Working?
- Make sure variables start with `NEXT_PUBLIC_` for frontend use
- Redeploy after adding new environment variables

### Need Backend?
Follow the backend deployment guide separately:
- `FRONTEND_ONLY_VERCEL.md` - Deploy backend to Railway
- Or use the full monorepo approach in `VERCEL_DEPLOYMENT_GUIDE.md`
