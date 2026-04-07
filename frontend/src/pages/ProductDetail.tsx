import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI, recommendationAPI } from '../services/api';
import { Product } from '../types/Product';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useCart } from '../hooks/useCart';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        const [productData, recommendationsData] = await Promise.all([
          productAPI.getById(id),
          recommendationAPI.getProductRecommendations(id, 4)
        ]);
        
        setProduct(productData);
        setRecommendations(recommendationsData);
      } catch (error) {
        console.error('Error loading product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="container">
          <p>Product not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      <section className="product-detail">
        <div className="container">
          <div className="product-detail-grid">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            
            <div className="product-info">
              <h1>{product.name}</h1>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <span>{product.rating} ({product.reviews} reviews)</span>
              </div>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <p className="product-description">{product.description}</p>
              
              <div className="product-meta">
                <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="category">{product.category}</span>
              </div>
              
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
                
                <button 
                  className="btn add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
          
          {recommendations.length > 0 && (
            <div className="recommendations-section">
              <h2>Recommended Products</h2>
              <div className="products">
                {recommendations.map((recProduct) => (
                  <ProductCard key={recProduct._id} product={recProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
