import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productAPI } from '../services/api';
import { Product } from '../types/Product';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const params: any = {};
        
        if (category !== 'all') {
          params.category = category;
        }
        
        if (sortBy !== 'default') {
          params.sort = sortBy;
        }
        
        if (searchTerm) {
          params.search = searchTerm;
        }

        const fetchedProducts = await productAPI.getAll(params);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category, sortBy, searchTerm]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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
      
      <section className="products-page">
        <div className="container">
          <h1>Products</h1>
          
          <div className="filters">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="sort-filter">
              <label htmlFor="sort-filter">Sort by:</label>
              <select id="sort-filter" value={sortBy} onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div className="category-filter">
            <button 
              className={`category-btn ${category === 'all' ? 'active' : ''}`}
              onClick={() => window.history.pushState({}, '', '/products')}
            >
              All
            </button>
            <button 
              className={`category-btn ${category === 'electronics' ? 'active' : ''}`}
              onClick={() => window.history.pushState({}, '', '/products?category=electronics')}
            >
              Electronics
            </button>
            <button 
              className={`category-btn ${category === 'clothing' ? 'active' : ''}`}
              onClick={() => window.history.pushState({}, '', '/products?category=clothing')}
            >
              Clothing
            </button>
            <button 
              className={`category-btn ${category === 'home' ? 'active' : ''}`}
              onClick={() => window.history.pushState({}, '', '/products?category=home')}
            >
              Home & Kitchen
            </button>
            <button 
              className={`category-btn ${category === 'beauty' ? 'active' : ''}`}
              onClick={() => window.history.pushState({}, '', '/products?category=beauty')}
            >
              Beauty
            </button>
          </div>

          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
