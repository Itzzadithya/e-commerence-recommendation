import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
  isRecommended?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isRecommended = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product._id, 1);
  };

  return (
    <div className={`product-card ${isRecommended ? 'recommended' : ''}`}>
      {isRecommended && (
        <div className="recommendation-badge">
          <i className="fas fa-magic"></i>
          Recommended
        </div>
      )}
      <Link to={`/product/${product._id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <i 
                  key={i} 
                  className={`fas fa-star ${i < Math.floor(product.rating) ? '' : 'far fa-star'}`}
                ></i>
              ))}
            </div>
            <span>{product.rating} ({product.reviews} reviews)</span>
          </div>
          <button 
            className="btn add-to-cart"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
