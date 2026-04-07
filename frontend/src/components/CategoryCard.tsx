import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  image: string;
  category: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, category }) => {
  return (
    <div className="category">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <Link to={`/products?category=${category}`} className="btn-small">View</Link>
    </div>
  );
};

export default CategoryCard;
