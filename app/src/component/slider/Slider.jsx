import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

const SliderComponent = ({ 
  items, 
  slidesToShow = 6, 
  slidesToScroll = 3, 
  infinite = false,
  showTitle = true,
  imageClassName = "",
  containerClassName = "",
  titleClassName = "",
  dots = false,
  arrows = true,
  centerMode = false,
  centerPadding = "0px"
}) => {
  // Consistent with HeroSection color palette
  const colors = {
    primary: '#800020',
    text: '#ffffff',
    secondary: '#d4a59a'
  };

  const settings = {
    infinite,
    speed: 500,
    slidesToShow,
    slidesToScroll,
    dots,
    arrows,
    centerMode,
    centerPadding,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: Math.min(6, slidesToShow),
          slidesToScroll: Math.min(3, slidesToScroll),
          centerMode: false
        }
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: Math.min(5, slidesToShow),
          slidesToScroll: Math.min(3, slidesToScroll),
          centerMode: false
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: Math.min(4, slidesToShow),
          slidesToScroll: Math.min(2, slidesToScroll),
          centerMode: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, slidesToShow),
          slidesToScroll: Math.min(2, slidesToScroll),
          centerMode: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, slidesToShow),
          slidesToScroll: Math.min(1, slidesToScroll),
          centerMode: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, slidesToShow),
          slidesToScroll: 1,
          arrows: false,
          centerMode: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "40px"
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "30px"
        }
      }
    ]
  };

  return (
    <div className="slider-container px-2 md:px-4 lg:px-6">
      <Slider {...settings}>
        {items.map((item) => (
          <div 
            key={item.id} 
            className={`px-1 sm:px-2 ${containerClassName} group transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className="grid grid-cols-1">
              <div className="flex justify-center overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={item.image} 
                  alt={item.name || "Slider item"} 
                  className={`object-cover w-full aspect-square ${imageClassName} transition-transform duration-300 group-hover:scale-105`}
                  loading="lazy"
                />
              </div>
              {showTitle && (
                <h2 
                  className={`text-center mt-3 text-sm sm:text-base ${titleClassName}`}
                  style={{ color: colors.text }}
                >
                  {item.name}
                  {item.designer && (
                    <span 
                      className="block text-xs opacity-80 mt-1"
                      style={{ color: colors.secondary }}
                    >
                      by {item.designer}
                    </span>
                  )}
                </h2>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

SliderComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string,
      designer: PropTypes.string
    })
  ).isRequired,
  slidesToShow: PropTypes.number,
  slidesToScroll: PropTypes.number,
  infinite: PropTypes.bool,
  showTitle: PropTypes.bool,
  imageClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  dots: PropTypes.bool,
  arrows: PropTypes.bool,
  centerMode: PropTypes.bool,
  centerPadding: PropTypes.string
};

export default SliderComponent;