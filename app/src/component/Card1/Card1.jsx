import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Card1 = ({ title, price, description, image, productId, item, mode }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
  };

  // Colors matching the navbar design
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    background: mode === 'light' ? '#ffffff' : '#1a1a1a',
    text: mode === 'light' ? '#333333' : '#f5f5f5',
    textSecondary: mode === 'light' ? '#666666' : '#d1d1d1',
    border: mode === 'light' ? '#e8e8e8' : '#333333',
  };

  return (
    <div 
      className="w-full overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
      style={{
        backgroundColor: colors.background,
        border: `1px solid ${colors.border}`,
      }}
    >
      <Link to={`/product/${productId}`}>
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-6">
        <Link 
          to={`/product/${productId}`} 
          className="block text-lg font-semibold mb-2 hover:text-red-600 transition-colors duration-200"
          style={{ color: colors.text }}
        >
          {title.length > 16 ? `${title.slice(0, 16)}...` : title}
        </Link>
        
        <p 
          className="text-xl font-bold mb-3"
          style={{ color: colors.primary }}
        >
          ${price}
        </p>
        
        <p 
          className="text-sm mb-4"
          style={{ color: colors.textSecondary }}
        >
          {description.length > 48 ? `${description.slice(0, 48)}...` : description}
        </p>
        
        <button 
          onClick={() => addCart({ title, price, description, image, productId })}
          className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:transform hover:scale-105"
          style={{
            backgroundColor: colors.primary,
            color: '#ffffff',
            ':hover': {
              backgroundColor: colors.primaryHover
            }
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card1;