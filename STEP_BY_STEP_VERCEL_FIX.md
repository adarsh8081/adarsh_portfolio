# 🔧 STEP-BY-STEP Vercel Fix (With Visual Guide)

## 🎯 Current Issue: 404 NOT_FOUND Error

Your site `https://adarsh-portfolio-sage.vercel.app` is deployed but showing 404 because Vercel doesn't know your Next.js app is in the `web` folder.

## 📋 EXACT Steps to Fix (With Screenshots):

### Step 1: Open Vercel Dashboard
1. **Go to**: https://vercel.com/dashboard
2. **Look for**: A project named similar to `adarsh-portfolio-sage` or `adarsh_portfolio`
3. **Click on the project card** (not the URL, click the project name/card)

### Step 2: Access Project Settings
1. **You should see**: Project overview page with deployments
2. **Top navigation bar** will have: Overview | Functions | Settings | etc.
3. **Click**: "Settings" in the top navigation

### Step 3: Find General Settings
1. **Left sidebar** will show: General | Environment Variables | Domains | etc.
2. **Click**: "General" in the left sidebar
3. **You should now see**: General project settings page

### Step 4: Locate Build Settings
1. **Scroll down** on the General page
2. **Look for section**: "Build and Output Settings" 
3. **You'll see fields like**:
   - Build Command
   - Output Directory  
   - Install Command
   - **Root Directory** ← THIS IS WHAT WE NEED!

### Step 5: Change Root Directory
1. **Find**: "Root Directory" field
2. **Current value**: Probably `.` (dot) or empty
3. **Click in the field** to edit it
4. **Delete** any existing value
5. **Type**: `web` (just the word web, no slashes)
6. **Click**: "Save" button

### Step 6: Redeploy
1. **Click**: "Deployments" in the top navigation
2. **Find**: The most recent deployment
3. **Click the 3-dot menu** (...) next to the deployment
4. **Click**: "Redeploy"
5. **IMPORTANT**: UNCHECK "Use existing Build Cache"
6. **Click**: "Redeploy" button

## 🔍 What You Should See After:

**During redeploy**, build logs should show:
```
✅ Cloning completed
✅ Running from web directory  
✅ Installing from web/package.json
✅ Next.js detected
✅ Build completed successfully
```

**After deployment**, your site should show:
- ✅ Beautiful portfolio homepage
- ✅ 3D hero section
- ✅ Your projects and skills
- ✅ Working navigation

## 🆘 If You Still Can't Find "Root Directory":

### Alternative 1: Delete and Recreate Project
1. **In General settings**, scroll to bottom
2. **Click**: "Delete Project" (red button)
3. **Confirm deletion**
4. **Go back to dashboard** and click "New Project"
5. **Import**: `adarsh8081/adarsh_portfolio` 
6. **CRITICAL**: Set **Root Directory** to `web` during setup
7. **Framework**: Next.js
8. **Keep other defaults**

### Alternative 2: Contact Vercel Support
- Some accounts might have different UI
- Contact Vercel support to set Root Directory to `web`

## 🎯 The Key Point:

**Root Directory = `web`** is THE solution.

Without this setting, Vercel looks for your app in the wrong place and shows 404.

## 🚀 Expected Result:

After setting Root Directory to `web`, your portfolio will load perfectly at:
**https://adarsh-portfolio-sage.vercel.app**

---

**This is the final step to make your portfolio live!** 🌟
