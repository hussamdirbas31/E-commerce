import React from 'react';

const ImageBanner = ({ 
  // Image props
  imageUrl = "https://images.pexels.com/photos/9852977/pexels-photo-9852977.jpeg",
  
  // Content props
  title = "New Collection",
  subtitle = "Discover our latest fashion trends",
  ctaText = "Shop Now",
  
  // Style props
  height = "500px",
  gradientDirection = "right", // left, right, top, bottom
  overlayIntensity = "medium", // light, medium, dark
  
  // Color mode (you can pass this from parent)
  mode = 'light',
  
  // Event handlers
  onCtaClick,
  className = ""
}) => {
  
  // Color variables based on mode
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
  };

  // Gradient directions mapping
  const gradientDirections = {
    right: 'bg-gradient-to-r',
    left: 'bg-gradient-to-l',
    top: 'bg-gradient-to-t',
    bottom: 'bg-gradient-to-b',
  };

  // Overlay intensity mapping
  const overlayIntensities = {
    light: 'via-transparent',
    medium: 'via-60%',
    dark: 'via-80%',
  };

  return (
    <div 
      className={`relative w-full overflow-hidden group ${className}`}
      style={{ height }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className={`absolute inset-0 ${gradientDirections[gradientDirection]} from-black/70 via-black/${overlayIntensity === 'light' ? '30' : overlayIntensity === 'medium' ? '50' : '70'} to-black/90`}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center p-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div 
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
            style={{ 
              backgroundColor: colors.badge,
              color: colors.textInverted
            }}
          >
            New Arrivals
          </div>
          
          {/* Title */}
          <h1 
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: colors.textInverted }}
          >
            {title}
          </h1>
          
          {/* Subtitle */}
          {subtitle && (
            <p 
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: colors.secondary }}
            >
              {subtitle}
            </p>
          )}
          
          {/* CTA Button */}
          {ctaText && (
            <button
              onClick={onCtaClick}
              className="px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                backgroundColor: colors.primary,
                color: colors.textInverted,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.primaryHover;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = colors.primary;
              }}
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>
      
      {/* Glass Effect Border */}
      <div 
        className="absolute inset-0 border-2 pointer-events-none"
        style={{ 
          borderColor: colors.glass,
          opacity: 0.1
        }}
      />
    </div>
  );
};

// Alternative version with seasonal themes
export const SeasonalBanner = ({ 
  season = "summer", // summer, winter, spring, autumn
  ...props 
}) => {
  const seasonalConfigs = {
    summer: {
      gradient: 'bg-gradient-to-br from-yellow-400/20 via-orange-500/40 to-red-600/60',
      badgeColor: '#f59e0b',
    },
    winter: {
      gradient: 'bg-gradient-to-bl from-blue-400/20 via-cyan-500/40 to-indigo-600/60',
      badgeColor: '#3b82f6',
    },
    spring: {
      gradient: 'bg-gradient-to-tr from-green-400/20 via-emerald-500/40 to-teal-600/60',
      badgeColor: '#10b981',
    },
    autumn: {
      gradient: 'bg-gradient-to-tl from-amber-400/20 via-orange-500/40 to-red-600/60',
      badgeColor: '#f97316',
    },
  };

  const config = seasonalConfigs[season];

  return (
    <ImageBanner
      {...props}
      className={`seasonal-${season} ${props.className || ''}`}
    >
      <div className={`absolute inset-0 ${config.gradient} mix-blend-overlay`} />
    </ImageBanner>
  );
};

export default ImageBanner;