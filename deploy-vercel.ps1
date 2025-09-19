# Vercel Deployment Script for Adarsh Kumar Portfolio
# Run this script after pushing to GitHub

Write-Host "🚀 Deploying Adarsh Kumar Portfolio to Vercel..." -ForegroundColor Green

# Check if Vercel CLI is installed
if (!(Get-Command "vercel" -ErrorAction SilentlyContinue)) {
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Navigate to web directory
Set-Location "web"

Write-Host "🔧 Building project..." -ForegroundColor Blue
npm run build:prod

Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Blue
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Your portfolio is now live on Vercel!" -ForegroundColor Cyan

# Return to root directory
Set-Location ".."