# ShopHub - Professional E-commerce Platform with AI Recommendations

A modern, professional e-commerce website built with the MERN stack, featuring AI-powered product recommendations and a premium user experience.

## 🚀 Features

- **🛍️ Professional E-commerce**: Complete online shopping experience with cart management
- **🤖 AI-Powered Recommendations**: Content-based recommendation system using TF-IDF algorithm
- **🎨 Modern UI/UX**: Professional design with gradients, animations, and responsive layout
- **📱 Mobile Responsive**: Optimized for all screen sizes and devices
- **🖼️ Professional Images**: High-quality product photography for all items
- **⚡ Real-time Updates**: Live cart updates and product availability
- **🔍 Advanced Filtering**: Search, sort, and category-based browsing
- **💳 Shopping Cart**: Persistent cart with add/remove functionality

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **CSS3** - Modern styling with animations
- **Font Awesome** - Professional icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Natural.js** - Text processing for recommendations
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB** - Product and cart data storage
- **Mongoose Models** - Structured data schemas

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd E-commerce-Product-Recommendation-System-main
```

### 2. Backend Setup

#### Navigate to Backend Directory
```bash
cd backend
```

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env` file in the backend directory:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce

# Server Configuration
PORT=5000

# Environment
NODE_ENV=development
```

#### Build TypeScript
```bash
npm run build
```

#### Start Backend Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will start on `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to Frontend Directory
```bash
cd frontend
```

#### Install Dependencies
```bash
npm install
```

#### Environment Configuration
Create a `.env` file in the frontend directory:
```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api
```

#### Start Frontend Development Server
```bash
npm start
```

The frontend will start on `http://localhost:3000`

### 4. Database Setup

#### MongoDB Local Installation
```bash
# Start MongoDB service
mongod

# Or use MongoDB Compass for GUI
```

#### MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update the `MONGODB_URI` in your `.env` file

#### Data Seeding
The backend automatically seeds professional product data on first run, including:
- 16 professional products with real images
- 4 categories (Electronics, Clothing, Home & Kitchen, Beauty)
- Product descriptions, ratings, and reviews

## 🚀 Running the Application

### Method 1: Separate Terminals (Recommended for Development)

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

### Method 2: Concurrent Scripts (For Production)

#### Install Concurrently
```bash
npm install -g concurrently
```

#### Run Both Services
```bash
# In root directory
concurrently "npm run backend" "npm run frontend"
```

### Access Points
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/products

## 📁 Project Structure

```
E-commerce-Product-Recommendation-System-main/
├── backend/
│   ├── src/
│   │   ├── models/           # MongoDB models
│   │   ├── routes/           # API routes
│   │   ├── server.ts         # Main server file
│   │   └── types/            # TypeScript types
│   ├── public/
│   │   └── images/           # Product images
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   │   └── images/           # Product images (copy)
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript types
│   ├── package.json
│   └── tsconfig.json
├── images.zip               # Professional product images
└── README.md
```

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Recommendations
- `GET /api/recommendations/personalized/:userId` - Get personalized recommendations
- `GET /api/recommendations/similar/:productId` - Get similar product recommendations

### Cart
- `GET /api/cart/:userId` - Get user cart
- `POST /api/cart/:userId` - Add item to cart
- `PUT /api/cart/:userId/:itemId` - Update cart item
- `DELETE /api/cart/:userId/:itemId` - Remove item from cart

## 🚀 Deployment

### Frontend Deployment (Netlify, Vercel, etc.)

#### Build for Production
```bash
cd frontend
npm run build
```

#### Deploy to Netlify
1. Create account at [Netlify](https://netlify.com)
2. Drag and drop the `build` folder
3. Configure environment variables
4. Set up custom domain (optional)

#### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel
```

#### Deploy to AWS S3 + CloudFront
```bash
# Install AWS CLI
aws configure

# Deploy to S3
aws s3 sync build/ s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Backend Deployment (Heroku, AWS, DigitalOcean)

#### Deploy to Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main
```

#### Deploy to AWS EC2
```bash
# Connect to EC2 instance
ssh -i your-key.pem ec2-user@your-ec2-ip

# Install dependencies
sudo yum update -y
sudo yum install -y nodejs npm git
sudo npm install -g pm2

# Clone repository
git clone <repository-url>
cd E-commerce-Product-Recommendation-System-main/backend

# Install and build
npm install
npm run build

# Start with PM2
pm2 start dist/server.js --name "shophub-backend"
```

#### Deploy to DigitalOcean App Platform
1. Create account at [DigitalOcean](https://digitalocean.com)
2. Create new app
3. Connect GitHub repository
4. Configure build commands and environment variables
5. Deploy

### Database Deployment

#### MongoDB Atlas (Recommended for Production)
1. Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Configure network access
3. Create database user
4. Get connection string
5. Update environment variables

#### MongoDB Cloud Manager
1. Sign up for MongoDB Cloud Manager
2. Deploy managed cluster
3. Configure backup and monitoring
4. Update connection string

## 🌐 Publishing

### Domain Configuration
```bash
# Configure DNS for your domain
# Example for Cloudflare:
shop.yourdomain.com -> YOUR_FRONTEND_URL
api.yourdomain.com -> YOUR_BACKEND_URL
```

### SSL Certificate
```bash
# Let's Encrypt for free SSL
sudo certbot --nginx -d shop.yourdomain.com -d api.yourdomain.com
```


## 🔍 Monitoring & Maintenance

### Application Monitoring
```bash
# PM2 Monitoring (Backend)
pm2 monit

# Health Check Endpoint
curl https://api.yourdomain.com/api/products/featured
```

### Database Monitoring
- MongoDB Atlas: Built-in monitoring dashboard
- Performance metrics and slow query analysis
- Backup management and restoration

### Logging
```bash
# Application Logs
pm2 logs shophub-backend

# Error Tracking (Sentry)
npm install @sentry/node
```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test                    # Run tests
npm run test:coverage      # Test coverage
```

### Backend Testing
```bash
cd backend
npm test                    # Run tests
npm run test:watch        # Watch mode
```

### API Testing
```bash
# Test with curl
curl http://localhost:5000/api/products/featured

# Test with Postman
# Import collection from docs/api-collection.json
```

## 📊 Performance Optimization

### Frontend Optimization
- Image lazy loading
- Code splitting
- Service worker for caching
- Bundle size optimization

### Backend Optimization
- Database indexing
- API response caching
- Image compression
- CDN integration

### Database Optimization
- Proper indexing strategies
- Query optimization
- Connection pooling
- Read replicas for scaling

## 🔒 Security

### Security Best Practices
- Input validation and sanitization
- Rate limiting on API endpoints
- HTTPS enforcement
- Environment variable protection
- Regular security updates

### Authentication (Future Enhancement)
```bash
# JWT Implementation
npm install jsonwebtoken bcryptjs

# OAuth Integration
npm install passport passport-google-oauth20
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

#### Images Not Loading
1. Check if backend is running on port 5000
2. Verify images are in `backend/public/images/`
3. Check CORS configuration
4. Verify image URLs in database

#### Database Connection Issues
1. Ensure MongoDB is running
2. Check connection string in `.env`
3. Verify network access for MongoDB Atlas
4. Check firewall settings

#### Frontend Build Errors
1. Clear node_modules and reinstall
2. Check TypeScript configuration
3. Verify environment variables
4. Check for missing dependencies

### Troubleshooting Commands
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Reset database
cd backend
npm run seed:reset

# Check ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :5000
```
