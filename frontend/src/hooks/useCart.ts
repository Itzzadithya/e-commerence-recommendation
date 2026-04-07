import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, CartItem } from '../types/Product';
import { cartAPI } from '../services/api';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'SET_CART'; payload: Cart }
  | { type: 'ADD_TO_CART'; payload: Cart }
  | { type: 'UPDATE_QUANTITY'; payload: Cart }
  | { type: 'REMOVE_FROM_CART'; payload: Cart }
  | { type: 'SET_LOADING'; payload: boolean };

const cartReducer = (state: { cart: Cart | null; loading: boolean }, action: CartAction) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, cart: action.payload, loading: false };
    case 'ADD_TO_CART':
    case 'UPDATE_QUANTITY':
    case 'REMOVE_FROM_CART':
      return { ...state, cart: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', userId);
  }
  return userId;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: null, loading: true });
  const userId = getUserId();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartAPI.getCart(userId);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      console.error('Error loading cart:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const updatedCart = await cartAPI.addToCart(userId, productId, quantity);
      dispatch({ type: 'ADD_TO_CART', payload: updatedCart });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const updatedCart = await cartAPI.updateCart(userId, productId, quantity);
      dispatch({ type: 'UPDATE_QUANTITY', payload: updatedCart });
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const updatedCart = await cartAPI.removeFromCart(userId, productId);
      dispatch({ type: 'REMOVE_FROM_CART', payload: updatedCart });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const cartCount = state.cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const contextValue: CartContextType = {
    cart: state.cart,
    loading: state.loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartCount,
  };

  return React.createElement(
    CartContext.Provider,
    { value: contextValue },
    children
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
