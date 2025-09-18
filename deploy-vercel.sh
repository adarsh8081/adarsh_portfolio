#!/bin/bash

# Vercel Deployment Script for Portfolio
# This script helps deploy your portfolio to Vercel with proper configuration

echo "🚀 Starting Vercel Deployment Process..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Navigate to web directory
cd web

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "Your portfolio is now live on Vercel!"
    else
        echo "❌ Deployment failed. Please check the errors above."
    fi
else
    echo "❌ Build failed. Please fix the errors before deploying."
fi

# Return to root directory
cd ..
