import React, { useEffect, useRef, useState } from 'react';
import imageMob from '../../assest/imagemobile.jpg';
import imageDesktop from '../../assest/image.jpeg';

const HeroSection = ({ 
  image, 
  mode = 'light',
  navbarHeight = 80,
  onScrollToSection,
  isMobile = false
}) => {
  const sectionRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Updated color palette with mode support
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    secondary: '#d4a59a',
    secondaryHover: '#c08e80',
    background: mode === 'light' ? '#ffffff' : '#0f0f0f',
    text: mode === 'light' ? '#1a1a1a' : '#f5f5f5',
    textInverted: mode === 'light' ? '#f5f5f5' : '#1a1a1a',
    border: mode === 'light' ? '#e8e8e8' : '#2a2a2a',
    badge: '#dc2626',
    glass: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 15, 15, 0.95)',
    buttonSecondary: 'rgba(255, 255, 255, 0.15)'
  };

  // Responsive image handling
  const heroImage = isMobile 
    ? imageMob || 'https://images.pexels.com/photos/14844540/pexels-photo-14844540.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&dpr=1'
    : image || 'https://images.pexels.com/photos/14844540/pexels-photo-14844540.jpeg';

  // إصلاح مشكلة الـ Scroll عند التحميل
  useEffect(() => {
    if (sectionRef.current) {
      const calculatedHeight = isMobile 
        ? `calc(100svh - ${navbarHeight}px)` // استخدام svh للهواتف
        : `calc(100vh - ${navbarHeight}px)`;
      sectionRef.current.style.minHeight = calculatedHeight;
    }
  }, [navbarHeight, isMobile]);

  // دالة للتنقل السلس إلى الأقسام
  const handleScrollTo = (sectionId) => {
    if (onScrollToSection) {
      onScrollToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = navbarHeight;
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <section 
      ref={sectionRef}
      className="hero relative overflow-hidden flex items-center justify-center w-full group"
      style={{ 
        minHeight: isMobile ? 'calc(100svh - 60px)' : 'calc(100vh - 80px)'
      }}
    >
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-300 animate-pulse z-0"></div>
      )}

      {/* Background container with enhanced effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Desktop image */}
        <div 
          className={`hidden md:block absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        {/* Mobile optimized image */}
        <img
          className={`md:hidden w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          src={heroImage}
          alt="Luxury fashion collection"
          loading="eager"
          onLoad={handleImageLoad}
          style={{
            objectPosition: isMobile ? 'center 30%' : 'center center'
          }}
        />
      </div>
      
      {/* Enhanced gradient overlay - Mobile optimized */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 md:bg-gradient-to-r md:from-black/80 md:via-black/60 md:to-transparent"></div>
      
      {/* Additional brand gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/20 via-transparent to-[#d4a59a]/10 mix-blend-overlay"></div>
      
      {/* Content container with mobile-first responsive design */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto ${
        isMobile ? 'px-4 py-16' : 'px-6 lg:px-8 py-20'
      }`}>
        <div className={`${isMobile ? 'max-w-full text-center' : 'max-w-2xl'} w-full`}>
          {/* Enhanced badge with responsive sizing */}
          <div 
            className={`inline-block rounded-full font-semibold mb-4 tracking-widest shadow-lg ${
              isMobile 
                ? 'px-3 py-1 text-xs' 
                : 'px-4 py-2 text-sm'
            }`}
            style={{ 
              backgroundColor: colors.badge,
              color: colors.textInverted
            }}
          >
            NEW COLLECTION
          </div>
          
          {/* Enhanced title with mobile-first responsive typography */}
          <h1 className={`font-extrabold mb-4 leading-tight text-white drop-shadow-2xl ${
            isMobile
              ? 'text-3xl sm:text-4xl'
              : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
          }`}>
            Redefine Your {' '}
            <span className="bg-gradient-to-r from-[#d4a59a] to-[#c08e80] bg-clip-text text-transparent">
              Elegance
            </span>
          </h1>
          
          {/* Enhanced subtitle with mobile optimization */}
          <p className={`mb-6 text-white/90 font-light leading-relaxed backdrop-blur-sm bg-black/10 rounded-lg ${
            isMobile
              ? 'text-sm px-3 py-2 max-w-xs mx-auto'
              : 'text-base sm:text-lg md:text-xl p-4 max-w-md'
          }`}>
            Experience timeless sophistication with our curated selection of premium fashion
          </p>
          
          {/* Enhanced responsive button group - Stack on mobile */}
          <div className={`flex gap-3 ${
            isMobile 
              ? 'flex-col items-center justify-center' 
              : 'flex-row'
          } ${isMobile ? 'sm:flex-row' : ''}`}>
            <button 
              onClick={() => handleScrollTo('categories-section')}
              className={`rounded-full font-medium tracking-wide shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95 group relative overflow-hidden ${
                isMobile
                  ? 'px-5 py-2.5 text-sm w-full max-w-xs'
                  : 'px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 text-base md:text-lg'
              }`}
              style={{
                backgroundColor: colors.primary,
                color: colors.textInverted,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.primaryHover;
                if (!isMobile) e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = colors.primary;
                if (!isMobile) e.target.style.transform = 'translateY(0)';
              }}
              onTouchStart={(e) => {
                e.target.style.backgroundColor = colors.primaryHover;
              }}
              onTouchEnd={(e) => {
                e.target.style.backgroundColor = colors.primary;
              }}
            >
              <span className="relative z-10">
                Explore Collection
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
            
            <button 
              onClick={() => handleScrollTo('new-arrivals-section')}
              className={`rounded-full font-medium border-2 border-white/80 hover:border-white transition-all duration-300 hover:scale-[1.03] active:scale-95 group relative overflow-hidden backdrop-blur-sm ${
                isMobile
                  ? 'px-5 py-2.5 text-sm w-full max-w-xs'
                  : 'px-6 py-3 sm:px-8 sm:py-3 md:px-10 md:py-4 text-base md:text-lg'
              }`}
              style={{
                color: colors.textInverted,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = colors.buttonSecondary;
                if (!isMobile) e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                if (!isMobile) e.target.style.transform = 'translateY(0)';
              }}
              onTouchStart={(e) => {
                e.target.style.backgroundColor = colors.buttonSecondary;
              }}
              onTouchEnd={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <span className="group-hover:tracking-wider transition-all relative z-10">
                View Lookbook {' '}
                <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4a59a]/10 via-transparent to-[#d4a59a]/10 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
          </div>

          {/* Enhanced stats section - Hidden on very small screens */}
          <div className={`flex justify-center gap-4 mt-6 sm:mt-8 text-white/80 ${
            isMobile ? 'text-center' : ''
          } ${isMobile ? 'sm:gap-6' : 'gap-6'}`}>
            <div className={isMobile ? 'text-xs' : 'text-center'}>
              <div className={`font-bold ${isMobile ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`} style={{ color: colors.secondary }}>50+</div>
              <div className={`uppercase tracking-widest ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>Designs</div>
            </div>
            <div className={isMobile ? 'text-xs' : 'text-center'}>
              <div className={`font-bold ${isMobile ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`} style={{ color: colors.secondary }}>100%</div>
              <div className={`uppercase tracking-widest ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>Premium</div>
            </div>
            <div className={isMobile ? 'text-xs' : 'text-center'}>
              <div className={`font-bold ${isMobile ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`} style={{ color: colors.secondary }}>2024</div>
              <div className={`uppercase tracking-widest ${isMobile ? 'text-[10px]' : 'text-xs sm:text-sm'}`}>Collection</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements - Smaller on mobile */}
      <div 
        className={`absolute rounded-full opacity-10 blur-xl ${
          isMobile ? 'top-6 right-6 w-12 h-12' : 'top-10 right-10 w-20 h-20'
        }`}
        style={{ backgroundColor: colors.primary }}
      ></div>
      <div 
        className={`absolute rounded-full opacity-10 blur-xl ${
          isMobile ? 'bottom-16 left-6 w-10 h-10' : 'bottom-20 left-10 w-16 h-16'
        }`}
        style={{ backgroundColor: colors.secondary }}
      ></div>

      {/* Enhanced scroll indicator - Mobile optimized */}
      <button 
        onClick={() => handleScrollTo('categories-section')}
        className={`absolute left-1/2 transform -translate-x-1/2 animate-bounce focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full p-1 ${
          isMobile ? 'bottom-4' : 'bottom-6 md:bottom-10'
        }`}
        aria-label="Scroll to next section"
      >
        <div className="flex flex-col items-center">
          <span className={`text-white/60 mb-1 tracking-widest ${
            isMobile ? 'text-[10px]' : 'text-xs'
          }`}>SCROLL</span>
          <div 
            className={`border-2 rounded-full flex justify-center ${
              isMobile ? 'w-5 h-8 p-0.5' : 'w-6 h-10 sm:w-7 sm:h-12 p-1'
            }`}
            style={{ borderColor: colors.secondary }}
          >
            <div 
              className="w-1 rounded-full animate-ping"
              style={{ 
                backgroundColor: colors.secondary,
                height: isMobile ? '8px' : '12px'
              }}
            ></div>
          </div>
        </div>
      </button>

      {/* Glass morphism border */}
      <div 
        className="absolute inset-0 border pointer-events-none opacity-20"
        style={{ borderColor: colors.glass }}
      ></div>
    </section>
  );
};

// Seasonal variant component
export const SeasonalHero = ({ season = 'summer', isMobile, ...props }) => {
  const seasonalStyles = {
    summer: 'from-yellow-400/10 via-orange-500/20 to-red-600/30',
    winter: 'from-blue-400/10 via-cyan-500/20 to-indigo-600/30',
    spring: 'from-green-400/10 via-emerald-500/20 to-teal-600/30',
    autumn: 'from-amber-400/10 via-orange-500/20 to-red-600/30',
  };

  return (
    <HeroSection isMobile={isMobile} {...props}>
      <div className={`absolute inset-0 bg-gradient-to-br ${seasonalStyles[season]} mix-blend-overlay`} />
    </HeroSection>
  );
};

export default HeroSection;