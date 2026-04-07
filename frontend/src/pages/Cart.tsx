import React from 'react';
import { useCart } from '../hooks/useCart';
import Header from '../components/Header';

const Cart: React.FC = () => {
  const { cart, loading, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

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
      
      <section className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          
          {cart && cart.items.length > 0 ? (
            <div className="cart-content">
              <div className="cart-items">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                    
                    <div className="cart-item-info">
                      <h3>{item.product.name}</h3>
                      <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                      <p className="cart-item-category">{item.product.category}</p>
                    </div>
                    
                    <div className="cart-item-quantity">
                      <label htmlFor={`quantity-${item.product._id}`}>Quantity:</label>
                      <input
                        type="number"
                        id={`quantity-${item.product._id}`}
                        min="1"
                        max="10"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="cart-item-total">
                      <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div className="cart-item-remove">
                      <button 
                        className="btn-remove"
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="cart-total">
                  <h3>Order Summary</h3>
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <button className="btn checkout-btn">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-cart">
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any products to your cart yet.</p>
              <a href="/products" className="btn">Continue Shopping</a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
