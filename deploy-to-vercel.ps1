# Simple Vercel Deployment Script
Write-Host "🚀 Deploying Portfolio to Vercel..." -ForegroundColor Green

# Check if Vercel CLI is installed
if (!(Get-Command "vercel" -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Deploy with proper configuration
Write-Host "Deploying..." -ForegroundColor Blue
vercel --prod --yes

Write-Host "✅ Deployment complete!" -ForegroundColor Green
