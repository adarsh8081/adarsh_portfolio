# 🔧 Vercel Deployment Troubleshooting

## ❌ Error: "No Next.js version detected"

If you're getting this error:
```
Error: No Next.js version detected. Make sure your package.json has "next" in either "dependencies" or "devDependencies"
```

### 🎯 Solution:

The issue is that you need to set the **Root Directory** to `web` in your Vercel project settings.

#### Step-by-Step Fix:

1. **Go to your Vercel project dashboard**
2. **Click Settings** → **General**
3. **Find "Root Directory"** section
4. **Set Root Directory to**: `web`
5. **Click "Save"**
6. **Redeploy** your project

#### Alternative: During Initial Setup

When creating a new Vercel project:

1. **Import Repository**: `adarsh8081/adarsh_portfolio`
2. **Configure Project**:
   ```
   Framework Preset: Next.js
   Root Directory: web       ← This is crucial!
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

### 🚨 Why This Happens:

- Your project has a monorepo structure (web + server + other folders)
- Vercel is looking for Next.js in the root directory
- Next.js is actually in the `web` subdirectory
- Setting Root Directory to `web` tells Vercel where to find Next.js

### ✅ Verification:

After setting Root Directory to `web`, your build should:
- ✅ Detect Next.js correctly
- ✅ Install dependencies from web/package.json
- ✅ Build successfully
- ✅ Deploy without errors

### 🆘 Still Having Issues?

Try these additional steps:

1. **Delete and recreate** your Vercel project
2. **Make sure** you select `Next.js` as the framework
3. **Double-check** the Root Directory is set to `web`
4. **Clear build cache** in Vercel settings

### 📱 Contact Support:

If issues persist:
- Check Vercel's documentation: [vercel.com/docs](https://vercel.com/docs)
- Join Vercel Discord: [discord.gg/vercel](https://discord.gg/vercel)
