import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Card1 = ({ title, price, description, image, productId, item, mode = 'light', category }) => {
  const dispatch = useDispatch();
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    background: mode === 'light' ? '#ffffff' : '#1a1a1a',
    text: mode === 'light' ? '#333333' : '#f5f5f5',
    textSecondary: mode === 'light' ? '#666666' : '#d1d1d1',
    border: mode === 'light' ? '#e8e8e8' : '#333333',
  };

  const addCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div 
      className="h-full flex flex-col overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
      }}
    >
      <Link to={`/product/${productId}`} className="block overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-60 object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-5 flex-grow flex flex-col">
        {category && (
          <div className="mb-2">
            <span className="inline-block bg-[#f5e8ec] text-[#800020] text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
        )}
        
        <Link 
          to={`/product/${productId}`} 
          className="block text-lg font-semibold mb-2 hover:text-[#800020] transition-colors duration-200"
          style={{ color: colors.text }}
        >
          {title.length > 20 ? `${title.slice(0, 20)}...` : title}
        </Link>
        
        <p 
          className="text-sm mb-4 flex-grow"
          style={{ color: colors.textSecondary }}
        >
          {description.length > 90 ? `${description.slice(0, 90)}...` : description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <p 
            className="text-xl font-bold"
            style={{ color: colors.primary }}
          >
            ${price}
          </p>
          
          <button
            onClick={() => addCart({ title, price, description, image, productId, category })}
            className="py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-[#5c0018]"
            style={{ 
              backgroundColor: colors.primary,
              color: '#ffffff',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card1;