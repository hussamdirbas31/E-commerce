import React, { useContext } from 'react';
import Context from '../../context/Context';

const FilterBar = ({ 
  categories, 
  currentCategory, 
  onCategoryChange
}) => {
  const { mode } = useContext(Context);
  
  const isCategoryActive = (category) => {
    if (!category || !currentCategory) return false;
    return currentCategory.toLowerCase() === 'all' 
      ? category.toLowerCase() === 'all'
      : category.toLowerCase() === currentCategory.toLowerCase();
  };

  // Color scheme based on theme mode
  const colors = {
    light: {
      inactiveText: 'text-gray-700',
      inactiveHover: 'hover:text-gray-900',
      underlineBg: 'bg-gray-200',
      gradientVia: 'via-[#800020]',
      activeText: 'text-[#800020]',
      activeUnderline: 'bg-[#800020]'
    },
    dark: {
      inactiveText: 'text-gray-300',
      inactiveHover: 'hover:text-white',
      underlineBg: 'bg-gray-600',
      gradientVia: 'via-white',
      activeText: 'text-[#ff4d6d]', // Slightly brighter for dark mode
      activeUnderline: 'bg-[#ff4d6d]'
    }
  };

  const theme = colors[mode];

  return (
    <div className="mb-12 relative">
      {/* Full-width underline container */}
      <div className={`absolute bottom-0 left-0 right-0 h-px ${theme.underlineBg} overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${theme.gradientVia} to-transparent opacity-30`}></div>
      </div>
      
      {/* Categories navigation */}
      <nav className="relative">
        <ul className="flex justify-center space-x-1">
          {['All', ...categories].map((category) => (
            <li key={category} className="relative">
              <button
                className={`px-6 py-4 text-sm uppercase tracking-wider font-medium transition-all duration-300 focus:outline-none ${
                  isCategoryActive(category)
                    ? theme.activeText
                    : `${theme.inactiveText} ${theme.inactiveHover}`
                }`}
                onClick={() => onCategoryChange(category)}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') return;
                  e.currentTarget.blur();
                }}
              >
                {category}
                {isCategoryActive(category) && (
                  <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${theme.activeUnderline} animate-underline`}></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default FilterBar;