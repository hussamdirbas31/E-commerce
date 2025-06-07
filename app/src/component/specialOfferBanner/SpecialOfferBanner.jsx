import React, { useContext } from 'react';
import Context from '../../context/Context';

const SpecialOfferBanner = ({ 
  title = "Summer Sale - Up to 50% Off",
  subtitle = "Limited time offer on selected items",
  buttonText = "Shop Now"
}) => {
  const context = useContext(Context);
  const { mode } = context;

  // Colors from Navbar design
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    secondary: '#d4a59a',
    secondaryHover: '#c08e80',
    background: mode === 'light' ? '#ffffff' : '#0f0f0f',
    text: mode === 'light' ? '#1a1a1a' : '#f5f5f5',
    textSecondary: mode === 'light' ? '#4a4a4a' : '#d1d1d1',
    border: mode === 'light' ? '#e8e8e8' : '#2a2a2a',
    gradientFrom: mode === 'light' ? '#f8e8e5' : '#1a0a0a',
    gradientTo: mode === 'light' ? '#f0d8d5' : '#2a0a0a'
  };

  return (
    <section 
      className="px-4 py-8 md:py-12"
      style={{
        background: `linear-gradient(to right, ${colors.gradientFrom}, ${colors.gradientTo})`,
        borderTop: `1px solid ${colors.border}`,
        borderBottom: `1px solid ${colors.border}`
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h3 
          className="text-xl md:text-2xl font-bold mb-3"
          style={{ color: colors.text }}
        >
          {title}
        </h3>
        <p 
          className="mb-4"
          style={{ color: colors.textSecondary }}
        >
          {subtitle}
        </p>
        <button 
          className="px-6 py-2 rounded-full transition-colors"
          style={{
            backgroundColor: colors.primary,
            color: '#fff',
            border: `1px solid ${colors.primary}`,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = colors.primaryHover}
          onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
        >
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default SpecialOfferBanner;