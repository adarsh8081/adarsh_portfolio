# Vercel Deployment Script for Portfolio
# This script helps deploy your portfolio to Vercel with proper configuration

Write-Host "🚀 Starting Vercel Deployment Process..." -ForegroundColor Green

# Check if Vercel CLI is installed
if (!(Get-Command "vercel" -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Navigate to web directory
Set-Location "web"

Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm install

Write-Host "🔨 Building the project..." -ForegroundColor Blue
npm run build

# Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Blue
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Deployment successful!" -ForegroundColor Green
        Write-Host "Your portfolio is now live on Vercel!" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Deployment failed. Please check the errors above." -ForegroundColor Red
    }
} else {
    Write-Host "❌ Build failed. Please fix the errors before deploying." -ForegroundColor Red
}

# Return to root directory
Set-Location ".."
