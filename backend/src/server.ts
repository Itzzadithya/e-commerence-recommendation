import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import natural from 'natural';
import productRoutes from './routes/products';
import cartRoutes from './routes/cart';
import recommendationRoutes from './routes/recommendations';
import Product from './models/Product';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (images)
app.use(express.static('public'));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Sample data seeding
const seedSampleData = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      // Professional products with real images
      const sampleProducts = [
        {
          name: 'Wireless Noise-Cancelling Headphones',
          description: 'Premium wireless headphones with advanced noise-cancellation technology, 40-hour battery life, and superior sound quality for immersive audio experience.',
          price: 299.99,
          category: 'electronics',
          image: 'http://localhost:5000/images/Wireless Noise-Cancelling Headphones.jpg',
          featured: true,
          rating: 4.6,
          reviews: 234
        },
        {
          name: 'Laptop Pro Max',
          description: 'High-performance laptop with 16GB RAM, 512GB SSD, and latest generation processor. Perfect for professionals and content creators.',
          price: 1299.99,
          category: 'electronics',
          image: 'http://localhost:5000/images/Laptop Pro Max.jpg',
          featured: true,
          rating: 4.8,
          reviews: 156
        },
        {
          name: 'Smartphone X Pro',
          description: 'Flagship smartphone with 5G connectivity, triple camera system, and all-day battery life. Capture stunning photos and videos.',
          price: 899.99,
          category: 'electronics',
          image: 'http://localhost:5000/images/Smartphone X Pro.jpg',
          featured: true,
          rating: 4.7,
          reviews: 412
        },
        {
          name: 'Smart TV 4K UHD',
          description: '55-inch 4K Ultra HD Smart TV with HDR, built-in streaming apps, and voice control. Transform your living room into a home theater.',
          price: 699.99,
          category: 'electronics',
          image: 'http://localhost:5000/images/Smart TV 4K UHD.jpeg',
          featured: false,
          rating: 4.5,
          reviews: 89
        },
        {
          name: "Men's Casual Button Down Shirt",
          description: 'Premium cotton button-down shirt with modern fit and classic styling. Perfect for business casual or weekend outings.',
          price: 59.99,
          category: 'clothing',
          image: 'http://localhost:5000/images/Men\'s Casual Button Down Shirt.jpg',
          featured: true,
          rating: 4.4,
          reviews: 127
        },
        {
          name: "Slim Fit Jeans",
          description: 'Modern slim-fit jeans with premium denim fabric and comfortable stretch. Classic five-pocket design with contemporary styling.',
          price: 79.99,
          category: 'clothing',
          image: 'http://localhost:5000/images/Slim Fit Jeans.jpg',
          featured: false,
          rating: 4.3,
          reviews: 198
        },
        {
          name: "Women's Cocktail Dress",
          description: 'Elegant cocktail dress with flattering silhouette and premium fabric. Perfect for special occasions and evening events.',
          price: 129.99,
          category: 'clothing',
          image: 'http://localhost:5000/images/Women\'s Cocktail Dress.jpg',
          featured: true,
          rating: 4.6,
          reviews: 73
        },
        {
          name: 'Athletic Running Shoes',
          description: 'High-performance running shoes with advanced cushioning technology and breathable mesh upper. Ideal for serious runners.',
          price: 119.99,
          category: 'clothing',
          image: 'http://localhost:5000/images/Athletic Running Shoes.jpeg',
          featured: false,
          rating: 4.5,
          reviews: 245
        },
        {
          name: 'High-Power Blender',
          description: 'Professional-grade blender with 1500W motor and multiple speed settings. Perfect for smoothies, soups, and food processing.',
          price: 199.99,
          category: 'home',
          image: 'http://localhost:5000/images/High-Power Blender.jpg',
          featured: true,
          rating: 4.7,
          reviews: 189
        },
        {
          name: 'Non-Stick Cookware Set',
          description: 'Complete 10-piece cookware set with PFOA-free non-stick coating. Includes essential pots and pans for every kitchen.',
          price: 149.99,
          category: 'home',
          image: 'http://localhost:5000/images/Non-Stick Cookware Set.jpg',
          featured: false,
          rating: 4.4,
          reviews: 267
        },
        {
          name: 'Programmable Coffee Maker',
          description: 'Programmable coffee maker with thermal carafe and customizable brewing settings. Wake up to perfectly brewed coffee every morning.',
          price: 89.99,
          category: 'home',
          image: 'http://localhost:5000/images/Programmable Coffee Maker.jpg',
          featured: false,
          rating: 4.3,
          reviews: 156
        },
        {
          name: 'Smart Toaster',
          description: 'Smart toaster with precise browning control and multiple functions. Features bagel setting and automatic shut-off for perfect results.',
          price: 49.99,
          category: 'home',
          image: 'http://localhost:5000/images/Smart Toaster.jpg',
          featured: false,
          rating: 4.2,
          reviews: 98
        },
        {
          name: 'Anti-Aging Moisturizer',
          description: 'Advanced anti-aging moisturizer with retinol and hyaluronic acid. Reduces fine lines and wrinkles while hydrating skin.',
          price: 69.99,
          category: 'beauty',
          image: 'http://localhost:5000/images/Anti-Aging Moisturizer.jpg',
          featured: true,
          rating: 4.6,
          reviews: 312
        },
        {
          name: 'Gentle Facial Cleanser',
          description: 'Soft and gentle facial cleanser suitable for all skin types. Removes impurities without stripping natural oils.',
          price: 34.99,
          category: 'beauty',
          image: 'http://localhost:5000/images/Gentle Facial Cleanser.jpg',
          featured: false,
          rating: 4.4,
          reviews: 178
        },
        {
          name: 'Professional Makeup Brush Set',
          description: 'Complete 24-piece professional makeup brush set with premium synthetic bristles. Includes all essential brushes for flawless application.',
          price: 89.99,
          category: 'beauty',
          image: 'http://localhost:5000/images/Professional Makeup Brush Set.jpg',
          featured: true,
          rating: 4.8,
          reviews: 423
        },
        {
          name: 'Luxury Perfume Collection',
          description: 'Exclusive luxury perfume collection with premium fragrances. Long-lasting scents with sophisticated notes for any occasion.',
          price: 159.99,
          category: 'beauty',
          image: 'http://localhost:5000/images/Luxury Perfume Collection.jpeg',
          featured: false,
          rating: 4.7,
          reviews: 134
        }
      ];

      await Product.insertMany(sampleProducts);
      console.log('Professional product data seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  seedSampleData();
});
