#!/bin/bash

# Heroku Deployment Script for ShopHub Backend

echo "🚀 Deploying ShopHub Backend to Heroku..."

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI is not installed. Please install it first:"
    echo "npm install -g heroku"
    exit 1
fi

# Login to Heroku
echo "📝 Logging into Heroku..."
heroku login

# Create Heroku app
echo "🏗️ Creating Heroku app..."
APP_NAME="shophub-backend-$(date +%s)"
heroku create $APP_NAME

# Set environment variables
echo "⚙️ Setting environment variables..."
heroku config:set MONGODB_URI=$MONGODB_URI --app $APP_NAME
heroku config:set NODE_ENV=production --app $APP_NAME
heroku config:set PORT=5000 --app $APP_NAME

# Add MongoDB Atlas addon (optional)
echo "🗄️ Adding MongoDB Atlas addon..."
heroku addons:create mongolab:sandbox --app $APP_NAME

# Deploy to Heroku
echo "📦 Deploying to Heroku..."
cd backend
git subtree push --prefix backend heroku main

# Get app URL
APP_URL=$(heroku info -s --app $APP_NAME | grep web_url | cut -d= -f2)

echo "✅ Deployment successful!"
echo "🌐 App URL: $APP_URL"
echo "🔗 API Endpoint: $APP_URL/api"
echo "📊 Health Check: $APP_URL/api/products/featured"

echo "🎉 ShopHub Backend is now live on Heroku!"
