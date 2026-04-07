import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, recommendationAPI } from '../services/api';
import { Product } from '../types/Product';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      name: 'Electronics',
      image: '/images/Smartphone X Pro.jpg',
      category: 'electronics'
    },
    {
      name: 'Clothing',
      image: '/images/Women\'s Cocktail Dress.jpg',
      category: 'clothing'
    },
    {
      name: 'Home & Kitchen',
      image: '/images/High-Power Blender.jpg',
      category: 'home'
    },
    {
      name: 'Beauty',
      image: '/images/Professional Makeup Brush Set.jpg',
      category: 'beauty'
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featured, recommendations] = await Promise.all([
          productAPI.getFeatured(),
          recommendationAPI.getPersonalizedRecommendations('default_user', 8)
        ]);
        
        setFeaturedProducts(featured);
        setRecommendedProducts(recommendations);
      } catch (error) {
        console.error('Error loading home data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <section className="hero">
        <div className="hero-content">
          <h2>Welcome to ShopHub</h2>
          <p>Discover premium products with AI-powered recommendations tailored just for you</p>
          <Link to="/products" className="btn">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="featured-categories">
        <div className="container">
          <h2>Shop by Category</h2>
          <div className="categories">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                name={category.name}
                image={category.image}
                category={category.category}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="recommendations">
        <div className="container">
          <h2>Recommended for You</h2>
          <div className="products">
            {recommendedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isRecommended={true}
              />
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>ShopHub</h3>
              <p>Your premium shopping destination with AI-powered recommendations</p>
              <ul>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/products">Products</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Categories</h3>
              <ul>
                <li><a href="/products?category=electronics">Electronics</a></li>
                <li><a href="/products?category=clothing">Clothing</a></li>
                <li><a href="/products?category=home">Home & Kitchen</a></li>
                <li><a href="/products?category=beauty">Beauty</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Customer Service</h3>
              <ul>
                <li><a href="/contact">Help Center</a></li>
                <li><a href="/contact">Track Order</a></li>
                <li><a href="/contact">Returns</a></li>
                <li><a href="/contact">Shipping Info</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Connect</h3>
              <ul>
                <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
                <li><a href="#"><i className="fab fa-twitter"></i> Twitter</a></li>
                <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
                <li><a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ShopHub. All rights reserved. | Premium E-commerce Platform</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
