# 🚀 Deployment Guide

This guide covers deploying your Adarsh Kumar portfolio to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git configured
- GitHub account
- Vercel account (recommended)

## 🌐 Vercel Deployment (Recommended)

### 1. **Prepare Repository**
```bash
# Ensure all changes are committed
git add .
git commit -m "Production ready"
git push origin main
```

### 2. **Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub
4. Select your repository
5. Configure settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `web`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

### 3. **Environment Variables**
Add these in Vercel dashboard:
```bash
NODE_ENV=production
NEXT_PUBLIC_FRONTEND_URL=https://your-domain.vercel.app
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=1
```

### 4. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Your site will be live at `https://your-project.vercel.app`

## 🔧 Manual Deployment

### 1. **Build for Production**
```bash
cd web
npm run build:prod
```

### 2. **Start Production Server**
```bash
npm start
```

### 3. **Docker Deployment**
```bash
# Build Docker image
docker build -t adarsh-portfolio .

# Run container
docker run -p 3000:3000 adarsh-portfolio
```

## 📱 Mobile Testing

### Test Checklist
- [ ] Scrolling works on mobile devices
- [ ] Touch interactions are responsive
- [ ] Images load properly
- [ ] Performance is optimal
- [ ] All pages are accessible

### Testing Tools
- Chrome DevTools Device Mode
- Real device testing
- Lighthouse mobile audit
- PageSpeed Insights

## ⚡ Performance Optimization

### Build Optimizations
- ✅ Code splitting enabled
- ✅ Image optimization configured
- ✅ Bundle size minimized
- ✅ Static generation for pages
- ✅ CDN delivery via Vercel

### Monitoring
- Vercel Analytics
- Speed Insights
- Core Web Vitals
- Lighthouse CI

## 🔒 Security Configuration

### Headers Added
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Strict-Transport-Security`
- `X-DNS-Prefetch-Control`

### Environment Security
- Environment variables secured
- No sensitive data in code
- HTTPS enforced
- CORS configured

## 📊 Analytics Setup

### Vercel Analytics
1. Enable in Vercel dashboard
2. Add `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`
3. Monitor performance metrics

### Google Analytics (Optional)
1. Create GA4 property
2. Add tracking ID to environment variables
3. Configure in `_app.tsx`

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build:prod
```

#### Mobile Scroll Issues
- Check CSS media queries
- Verify touch scrolling properties
- Test on real devices

#### Performance Issues
- Run Lighthouse audit
- Check bundle size
- Optimize images
- Enable compression

### Debug Commands
```bash
# Check build output
npm run build:prod

# Analyze bundle
npm run analyze

# Run tests
npm run test

# Type checking
npm run type-check
```

## 📈 Monitoring & Maintenance

### Regular Checks
- [ ] Performance metrics
- [ ] Security updates
- [ ] Dependency updates
- [ ] Content updates
- [ ] Analytics review

### Update Process
1. Make changes locally
2. Test thoroughly
3. Commit and push
4. Monitor deployment
5. Verify production

## 🎯 Success Metrics

### Performance Targets
- **Lighthouse Score:** 90+
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1

### Mobile Performance
- **Mobile Lighthouse:** 90+
- **Touch Response:** < 100ms
- **Scroll Performance:** 60fps
- **Load Time:** < 3s

## 📞 Support

If you encounter issues:
1. Check this deployment guide
2. Review error logs in Vercel
3. Test locally first
4. Check GitHub issues
5. Contact support

---

**Happy Deploying! 🚀**

*Your portfolio is now production-ready and optimized for all devices.*
