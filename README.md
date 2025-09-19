# Adarsh Kumar - AI/ML Engineer Portfolio

A modern, responsive portfolio website showcasing AI/ML engineering expertise, web development skills, and creative design solutions.

## 🚀 Live Demo

**Production URL:** [https://adarshkumar-portfolio.vercel.app](https://adarshkumar-portfolio.vercel.app)

## ✨ Features

### 🎨 **Modern Design**
- Custom cursor with smooth animations (desktop only)
- Glass morphism effects and neumorphism elements
- Responsive design optimized for all devices
- Dark/light theme support
- Smooth scrolling with Lenis

### 🧠 **AI/ML Showcase**
- Interactive project galleries
- Technical skill demonstrations
- Performance metrics and achievements
- Educational content and blog posts

### ⚡ **Performance Optimized**
- Next.js 15 with Turbopack
- Image optimization and lazy loading
- Code splitting and bundle optimization
- Vercel Analytics integration
- SEO optimized with sitemap generation

### 🔧 **Technical Stack**
- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS 4, Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **Animations:** Framer Motion, Lenis
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics, Speed Insights

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/adarshkumar-portfolio.git
   cd adarshkumar-portfolio
   ```

2. **Install dependencies**
   ```bash
   cd web
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
adarshkumar-portfolio/
├── web/                          # Next.js frontend
│   ├── src/
│   │   ├── app/                  # App router pages
│   │   ├── components/           # React components
│   │   ├── data/                 # Static data
│   │   ├── hooks/                # Custom hooks
│   │   └── lib/                  # Utilities
│   ├── public/                   # Static assets
│   ├── cypress/                  # E2E tests
│   └── package.json
├── server/                       # Node.js backend (optional)
├── tests/                        # Python tests
├── uploads/                      # File uploads
└── README.md
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   - Import project from GitHub
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`

2. **Environment Variables**
   - Add production environment variables in Vercel dashboard
   - Configure domain and analytics

3. **Deploy**
   - Automatic deployment on push to main branch
   - Preview deployments for pull requests

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🧪 Testing

### Run Tests
```bash
# E2E tests with Cypress
npm run test

# Open Cypress UI
npm run test:open

# Run specific test
npm run test:e2e
```

### Test Coverage
- Homepage functionality
- Contact form submission
- Project navigation
- Mobile responsiveness
- Performance metrics

## 📊 Performance

### Lighthouse Scores
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

### Optimizations
- Image optimization with Next.js
- Code splitting and lazy loading
- Bundle size optimization
- CDN delivery via Vercel
- Caching strategies

## 🎨 Customization

### Theme Colors
Edit `web/src/app/globals.css` to customize:
- Brand colors (`--brand-*` variables)
- Accent colors (`--accent-*` variables)
- Theme variants (violet, emerald, rose)

### Content Updates
- **Projects:** `web/src/data/projects.ts`
- **Blog Posts:** `web/src/data/posts.ts`
- **Skills:** Update skill components
- **About:** Edit about page content

### Styling
- **Tailwind CSS:** Utility-first styling
- **Custom CSS:** `web/src/app/globals.css`
- **Components:** Individual component styles

## 🔧 Configuration

### Environment Variables
```bash
# Required
NEXT_PUBLIC_FRONTEND_URL=https://your-domain.com

# Optional
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-id
NEXT_PUBLIC_GA_ID=your-ga-id
```

### Build Configuration
- **Next.js Config:** `web/next.config.ts`
- **Tailwind Config:** `web/tailwind.config.ts`
- **TypeScript Config:** `web/tsconfig.json`

## 📱 Mobile Optimization

### Features
- Touch-optimized interactions
- Responsive breakpoints
- Mobile-first design
- Touch scrolling optimization
- Reduced motion support

### Testing
- Test on various devices
- Use browser dev tools
- Check touch interactions
- Verify performance on mobile

## 🚀 Performance Tips

### Optimization Checklist
- [ ] Images optimized (WebP/AVIF)
- [ ] Code splitting implemented
- [ ] Bundle size minimized
- [ ] Caching configured
- [ ] CDN enabled
- [ ] Analytics tracking

### Monitoring
- Vercel Analytics
- Speed Insights
- Lighthouse CI
- Core Web Vitals

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Adarsh Kumar**
- **Email:** adarsh.kumar.808168@gmail.com
- **Phone:** +91-9005609660
- **LinkedIn:** [Adarsh Kumar](https://linkedin.com/in/adarshkumar)
- **GitHub:** [@adarshkumar](https://github.com/adarshkumar)

## 🙏 Acknowledgments

- **Design Inspiration:** Modern portfolio designs
- **Technologies:** Next.js, React, Tailwind CSS
- **Icons:** Lucide React, Radix UI
- **Animations:** Framer Motion
- **3D Graphics:** Three.js

---

**Built with ❤️ by Adarsh Kumar**

*"Building the future, one line of code at a time. Innovation is not just about technology, it's about solving real-world problems with creativity and passion."*