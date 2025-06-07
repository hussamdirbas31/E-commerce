import React from 'react';
import imageMob from '../../assest/imagemobile.jpg';

const HeroSection = ({ image }) => {
  // Modern maroon color palette
  const colors = {
    primary: '#800020',       // Rich maroon
    primaryHover: '#5c0018',  // Darker maroon on hover
    secondary: '#d4a59a',     // Complementary muted pink
    text: '#ffffff',          // White text
    overlay: 'rgba(0, 0, 0, 0.3)', // Lighter overlay for better contrast
    buttonSecondary: 'rgba(255, 255, 255, 0.15)'
  };

  return (
    <section className="hero relative overflow-hidden min-h-screen flex items-center justify-center py-20 md:py-0">
      {/* Background container with responsive sizing */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Responsive desktop image */}
        <div 
          className="hidden md:block absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${image})`, willChange: 'transform' }}
        ></div>
        
        {/* Mobile image with responsive sizing */}
        <img
          className="md:hidden w-full h-full object-cover"
          src={imageMob}
          alt="Luxury fashion collection"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 50vw"
          srcSet={`${imageMob} 768w, ${image} 1200w`}
        />
      </div>
      
      {/* Responsive gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent"></div>
      
      {/* Content container with responsive padding and text alignment */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 leading-tight text-white">
            <span className="block text-lg sm:text-xl md:text-2xl font-light tracking-widest mb-2 sm:mb-3">
              NEW COLLECTION
            </span>
            Redefine Your <span className="text-[#d4a59a]">Elegance</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 text-white/90 font-light leading-relaxed max-w-md">
            Experience timeless sophistication with our curated selection of premium fashion
          </p>
          
          {/* Responsive button group */}
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 md:gap-5">
            <button 
              className="px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full font-medium tracking-wide shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl active:scale-95"
              style={{
                backgroundColor: colors.primary,
                color: colors.text,
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = colors.primaryHover}
              onMouseOut={(e) => e.target.style.backgroundColor = colors.primary}
            >
              <span className="text-sm sm:text-base md:text-lg">Explore Collection</span>
            </button>
            <button 
              className="px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 rounded-full font-medium border-2 border-white/80 hover:border-white transition-all duration-300 hover:scale-[1.03] active:scale-95 group"
              style={{
                color: colors.text,
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = colors.buttonSecondary}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <span className="text-sm sm:text-base md:text-lg group-hover:tracking-wider transition-all">
                View Lookbook →
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive decorative scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/80" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;