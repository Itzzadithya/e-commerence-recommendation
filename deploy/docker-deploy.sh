#!/bin/bash

# Docker Deployment Script for ShopHub

echo "🐳 Deploying ShopHub with Docker Compose..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Build and start containers
echo "🏗️ Building Docker images..."
docker-compose build

echo "🚀 Starting containers..."
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 30

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Get container IPs
MONGODB_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' shophub-mongodb)
BACKEND_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' shophub-backend)
FRONTEND_IP=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' shophub-frontend)

echo "✅ Deployment successful!"
echo "🌐 Frontend URL: http://localhost:80"
echo "🔗 Backend API: http://localhost:5000"
echo "🗄️ MongoDB: mongodb://admin:password123@localhost:27017"
echo ""
echo "📊 Service Status:"
echo "  - MongoDB: $MONGODB_IP:27017"
echo "  - Backend: $BACKEND_IP:5000"
echo "  - Frontend: $FRONTEND_IP:80"
echo ""
echo "🎉 ShopHub is now running with Docker!"
echo ""
echo "🛠️ Useful Commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop services: docker-compose down"
echo "  - Restart services: docker-compose restart"
echo "  - Access MongoDB: docker exec -it shophub-mongodb mongosh"
