import React, { useContext } from 'react';
import Layout from '../../component/layout/Layout';
import HeroSection from '../../component/heroSection/HeroSection';
import ProductCard from '../../component/productCard/ProductCard';
import VideoComponent from '../../component/videoComponent/VideoComponent';
import Slider from '../../component/slider/Slider';
import heroImage from '../../assest/image.jpeg';
import SpecialOfferBanner from '../../component/specialOfferBanner/SpecialOfferBanner';
import  Context  from '../../context/Context';

const Home = () => {
  const context = useContext(Context);
  const { mode } = context;

  // Color scheme matching the design system
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
    text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
    textSecondary: mode === 'dark' ? '#d1d1d1' : '#4a4a4a',
    border: mode === 'dark' ? '#2a2a2a' : '#e8e8e8',
  };

  // Categories data
  const categories = [
    { 
      id: 1, 
      name: "Summer Dresses", 
      image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
    },
    { 
      id: 2, 
      name: "Casual Tops", 
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
    },
    { 
      id: 3, 
      name: "Denim Jackets", 
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
    },
    { 
      id: 4, 
      name: "Evening Gowns", 
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680e956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
    },
    { 
      id: 5, 
      name: "Office Wear", 
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
    },
    { 
      id: 6, 
      name: "Accessories", 
      image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className='w-full' style={{ backgroundColor: colors.background }}>
        <HeroSection image={heroImage} />
      </div>

      {/* Categories Slider */}
      <section 
        className="px-4 py-12 md:px-8 lg:px-12"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-8 tracking-wide"
            style={{ color: colors.text }}
          >
            Shop Categories
          </h2>
          <Slider 
            items={categories} 
            imageClassName="h-64 md:h-80 w-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            titleClassName="text-lg font-semibold mt-4 text-center"
            containerClassName="px-3 py-4 rounded-xl hover:shadow-lg transition-all duration-300"
            textColor={colors.text}
            borderColor={colors.border}
          />
        </div>
      </section>

      {/* Video Component */}
      <VideoComponent 
        title="New Collections" 
        videoUrl="https://videos.pexels.com/video-files/3917524/3917524-uhd_2732_1440_25fps.mp4"
      />

      {/* New Arrivals */}
      <section 
        className="px-4 py-12 md:px-8 lg:px-12"
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-8 tracking-wide"
            style={{ color: colors.text }}
          >
            New Arrivals
          </h2>
          <ProductCard />
        </div>
      </section>

      {/* Special Offer Banner */}
      <SpecialOfferBanner />
    </Layout>
  )
}

export default Home;