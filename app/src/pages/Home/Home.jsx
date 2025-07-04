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

  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
    text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
    textSecondary: mode === 'dark' ? '#d1d1d1' : '#4a4a4a',
    border: mode === 'dark' ? '#2a2a2a' : '#e8e8e8',
  };

  const categories = [
    { 
      id: 1, 
      name: "Jacket", 
      image: "https://image.uniqlo.com/UQ/ST3/au/imagesgoods/469775/item/augoods_52_469775_3x4.jpg?width=369" 
    },
    { 
      id: 2, 
      name: "Coat", 
      image: "https://i5.walmartimages.com/seo/Herrnalise-Women-Solid-Color-Casual-Long-Sleeve-Lapel-Long-Jacket-Coat-With-Pocket-And-Belt_2c04a7ed-8629-4bef-9069-236d92233be1.d1d922c5be2d1e2a3081b3bfd9d45cd5.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF"},
    { 
      id: 3, 
      name: "T shirts", 
      image: "https://www.fabulous-island.com/1496-large_default/t-shirt-oversize-femme-aerobic.jpg" 
    },
    { 
      id: 4, 
      name: "Pants", 
      image: "https://cdn.mos.cms.futurecdn.net/fYarhpEaQnE3xeBkAikNsQ-768-80.jpg.webp"  },
    
    { 
      id: 6, 
      name: "Accessories", 
      image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
    },
  ];

  return (
    <Layout>
      <div className='w-full' style={{ backgroundColor: colors.background }}>
        <HeroSection image={heroImage} />
      </div>

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

     <section className='w-full'>
      <VideoComponent 
  title="New Collections" 
  desktopVideoUrl="https://videos.pexels.com/video-files/3917524/3917524-uhd_2732_1440_25fps.mp4"
  mobileVideoUrl="https://videos.pexels.com/video-files/3894725/3894725-uhd_1440_2732_25fps.mp4"
/>
</section>

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

      <SpecialOfferBanner />
    </Layout>
  )
}

export default Home;