export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: 'electronics' | 'clothing' | 'home' | 'beauty';
  image: string;
  featured: boolean;
  rating: number;
  reviews: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}
