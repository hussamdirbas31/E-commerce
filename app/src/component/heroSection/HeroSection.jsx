import React from 'react';
import imageMob from '../../assest/imagemobile.jpg'
const HeroSection = ({ image, image2 }) => {
  return (
    <section className="hero relative overflow-hidden bg-gray-900">
      {/* Desktop Image */}
      <div className="hidden md:block absolute inset-0 overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src={image}
          alt="Desktop Background"
        />
      </div>
      {/* Mobile Image */}
      <div className="md:hidden absolute w-full h-full bg-cover">
        <img
          className="w-full h-full"
          src={imageMob}
          alt="Mobile Background"
        />
      </div>
      <div className="absolute inset-0 bg-opacity-75 "></div>
      <div className="container mx-auto px-4 py-32 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Welcome to Our Website</h1>
        <p className="text-lg md:text-xl text-white mb-8">Discover amazing features and services</p>
        <button className="bg-red-600 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out">Learn More</button>
      </div>
    </section>
  );
};

export default HeroSection;
