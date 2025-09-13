# 🚨 URGENT: Vercel Deployment Fix

## ❌ Current Error:
```
npm error Missing script: "vercel-build"
```

## 🎯 Root Cause:
Vercel is building from the ROOT directory instead of the WEB directory.

## ✅ IMMEDIATE FIX:

### Option 1: Update Current Project Settings

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Find your project**: `adarsh_portfolio`
3. **Click Settings** → **General**
4. **Find "Root Directory"**
5. **Change from `.` to `web`**
6. **Click Save**
7. **Go to Deployments** → **Redeploy** (without cache)

### Option 2: Create New Project (Recommended)

1. **Delete current project**:
   - Settings → General → Scroll down → Delete Project

2. **Create new project**:
   - New Project → Import `adarsh8081/adarsh_portfolio`
   - **CRITICAL SETTINGS**:
     ```
     Framework Preset: Next.js
     Root Directory: web          ← MUST SET THIS!
     Build Command: npm run build
     Output Directory: .next
     Install Command: npm install
     ```

## 🔍 How to Verify:

After fixing, your build logs should show:
- ✅ Building from `web` directory
- ✅ Installing dependencies from `web/package.json`
- ✅ Running `npm run build` from web directory
- ✅ No more `vercel-build` script errors

## ⚠️ Important Notes:

- The key is setting **Root Directory to `web`**
- This tells Vercel where your Next.js app actually lives
- Without this, Vercel tries to build from the wrong location

## 🆘 If Still Having Issues:

1. Clear browser cache
2. Try incognito/private browsing
3. Delete project and recreate with exact settings above
4. Contact me with the new error messages

**The fix is simple: Root Directory = `web`** 🎯
