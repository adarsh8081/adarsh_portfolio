# 🚀 Alternative: Frontend-Only Vercel Deployment

If you want to deploy just the frontend to Vercel and host the backend elsewhere (Railway, Heroku, etc.), follow this simpler approach.

## 📋 Steps for Frontend-Only Deployment

### 1. Create a Separate Vercel Project for Frontend

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your GitHub repository: `https://github.com/adarsh8081/PortFolio.git`
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 2. Set Environment Variables

In Vercel project settings, add:

```env
# Point to your backend API (deployed elsewhere)
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api

# Auth0 settings (point to Vercel frontend)
AUTH0_BASE_URL=https://your-frontend.vercel.app
AUTH0_SECRET=your-auth0-secret
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

### 3. Deploy Backend to Railway (Recommended)

1. Go to [Railway.app](https://railway.app)
2. Connect your GitHub repository
3. Select the `server` folder as the root
4. Railway will auto-detect Node.js and deploy
5. Set environment variables in Railway dashboard

### 4. Update CORS Settings

Make sure your backend (wherever deployed) allows your Vercel frontend URL in CORS settings.

This approach is simpler and often more cost-effective for development/testing.
