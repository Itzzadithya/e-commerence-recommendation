# Deployment Guide

This directory contains deployment scripts and configurations for different platforms.

## 🚀 Quick Deployment Options

### 1. Docker (Recommended for Local Development)
```bash
# Make scripts executable
chmod +x deploy/docker-deploy.sh

# Deploy with Docker
./deploy/docker-deploy.sh
```

### 2. Heroku (Backend) + Netlify (Frontend)
```bash
# Deploy backend to Heroku
chmod +x deploy/heroku-backend.sh
./deploy/heroku-backend.sh

# Deploy frontend to Netlify
chmod +x deploy/netlify-frontend.sh
./deploy/netlify-frontend.sh
```

### 3. AWS S3 (Frontend) + Heroku (Backend)
```bash
# Deploy frontend to AWS S3
chmod +x deploy/aws-s3-frontend.sh
./deploy/aws-s3-frontend.sh

# Deploy backend to Heroku
chmod +x deploy/heroku-backend.sh
./deploy/heroku-backend.sh
```

## 📋 Prerequisites

### For All Deployments:
- Node.js 16+
- npm or yarn
- Git
- MongoDB (local or cloud)

### For Docker:
- Docker Desktop
- Docker Compose

### For Heroku:
- Heroku CLI
- Heroku account

### For Netlify:
- Netlify CLI
- Netlify account

### For AWS:
- AWS CLI
- AWS account with appropriate permissions

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
NODE_ENV=production
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Production Environment Variables

#### Heroku Backend
```bash
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
heroku config:set NODE_ENV=production
heroku config:set PORT=5000
```

#### Netlify Frontend
Set in Netlify dashboard:
```
REACT_APP_API_URL=https://your-backend.herokuapp.com/api
```

## 🐳 Docker Deployment

### Local Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production Docker
```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d
```

## 🌐 Platform-Specific Instructions

### Heroku Deployment
1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables
5. Deploy: `git subtree push --prefix backend heroku main`

### Netlify Deployment
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Login: `netlify login`
3. Build: `cd frontend && npm run build`
4. Deploy: `netlify deploy --prod --dir=build`

### AWS S3 Deployment
1. Configure AWS CLI: `aws configure`
2. Create S3 bucket
3. Enable static website hosting
4. Upload build files
5. Set bucket policy for public access

### DigitalOcean App Platform
1. Connect GitHub repository
2. Configure build commands
3. Set environment variables
4. Deploy automatically

## 🔍 Monitoring & Maintenance

### Health Checks
```bash
# Backend health
curl https://your-backend.com/api/products/featured

# Frontend health
curl https://your-frontend.com
```

### Log Monitoring
```bash
# Docker logs
docker-compose logs -f shophub-backend

# Heroku logs
heroku logs --tail --app your-app-name

# Netlify logs
netlify logs
```

### Database Monitoring
- MongoDB Atlas dashboard
- Performance metrics
- Backup management

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy ShopHub
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: ${{secrets.HEROKU_APP_NAME}}
          heroku_email: ${{secrets.HEROKU_EMAIL}}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod --dir=frontend/build
        env:
          NETLIFY_AUTH_TOKEN: ${{secrets.NETLIFY_AUTH_TOKEN}}
          NETLIFY_SITE_ID: ${{secrets.NETLIFY_SITE_ID}}
```

## 🛠️ Troubleshooting

### Common Issues

#### Images Not Loading
1. Check CORS configuration
2. Verify image URLs in database
3. Ensure static file serving is enabled

#### Database Connection
1. Check MongoDB URI
2. Verify network access
3. Check firewall settings

#### Build Failures
1. Clear node_modules
2. Update dependencies
3. Check TypeScript configuration

### Debug Commands
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :5000

# Docker cleanup
docker system prune -a
```

## 📞 Support

For deployment issues:
1. Check logs for error messages
2. Verify environment variables
3. Ensure all prerequisites are met
4. Review platform-specific documentation

### Additional Resources
- [Docker Documentation](https://docs.docker.com/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
