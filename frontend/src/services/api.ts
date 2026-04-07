import axios from 'axios';
import { Product, Cart } from '../types/Product';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product API calls
export const productAPI = {
  getAll: async (params?: {
    category?: string;
    sort?: string;
    search?: string;
  }): Promise<Product[]> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getFeatured: async (): Promise<Product[]> => {
    const response = await api.get('/products/featured');
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },
};

// Cart API calls
export const cartAPI = {
  getCart: async (userId: string): Promise<Cart> => {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  },

  addToCart: async (userId: string, productId: string, quantity: number): Promise<Cart> => {
    const response = await api.post(`/cart/${userId}/add`, { productId, quantity });
    return response.data;
  },

  updateCart: async (userId: string, productId: string, quantity: number): Promise<Cart> => {
    const response = await api.put(`/cart/${userId}/update`, { productId, quantity });
    return response.data;
  },

  removeFromCart: async (userId: string, productId: string): Promise<Cart> => {
    const response = await api.delete(`/cart/${userId}/remove/${productId}`);
    return response.data;
  },
};

// Recommendation API calls
export const recommendationAPI = {
  getProductRecommendations: async (productId: string, limit?: number): Promise<Product[]> => {
    const response = await api.get(`/recommendations/product/${productId}`, {
      params: { limit },
    });
    return response.data;
  },

  getCategoryRecommendations: async (category: string, limit?: number): Promise<Product[]> => {
    const response = await api.get(`/recommendations/category/${category}`, {
      params: { limit },
    });
    return response.data;
  },

  getPersonalizedRecommendations: async (userId: string, limit?: number): Promise<Product[]> => {
    const response = await api.get(`/recommendations/personalized/${userId}`, {
      params: { limit },
    });
    return response.data;
  },
};

export default api;
