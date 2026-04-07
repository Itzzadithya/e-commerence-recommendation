#!/bin/bash

# Netlify Deployment Script for ShopHub Frontend

echo "🚀 Deploying ShopHub Frontend to Netlify..."

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed. Please install it first:"
    echo "npm install -g netlify-cli"
    exit 1
fi

# Login to Netlify
echo "📝 Logging into Netlify..."
netlify login

# Build the frontend
echo "🏗️ Building frontend..."
cd frontend
npm install
npm run build

# Deploy to Netlify
echo "📦 Deploying to Netlify..."
netlify deploy --prod --dir=build

# Get site URL
SITE_URL=$(netlify status | grep "Website URL" | cut -d: -f2 | xargs)

echo "✅ Deployment successful!"
echo "🌐 Site URL: $SITE_URL"
echo "🎉 ShopHub Frontend is now live on Netlify!"

# Update environment variables for production
echo "⚙️ Setting up environment variables..."
echo "Please update your frontend environment variables:"
echo "REACT_APP_API_URL=YOUR_BACKEND_API_URL"
echo ""
echo "You can set this in Netlify dashboard under Site settings > Environment variables"
