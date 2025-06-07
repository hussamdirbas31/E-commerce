import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Spinner with Artizia's maroon color (#800020) */}
      <div className="relative w-12 h-12">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        {/* Animated maroon arc */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
          style={{ borderColor: '#800020' }}
        ></div>
      </div>
    </div>
  );
};

export default Loader;