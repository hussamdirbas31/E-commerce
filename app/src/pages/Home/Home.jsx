import React, { useContext, useMemo, useEffect, useState } from 'react';
import Layout from '../../component/layout/Layout';
import HeroSection from '../../component/heroSection/HeroSection';
import ProductCard from '../../component/productCard/ProductCard';
import VideoComponent from '../../component/videoComponent/VideoComponent';
import Slider from '../../component/slider/Slider';
import heroImage from '../../assest/image.jpeg';
import SpecialOfferBanner from '../../component/specialOfferBanner/SpecialOfferBanner';
import Context from '../../context/Context';
import ImageBanner from '../../component/Imagebanner/ImageBanner';

// فصل البيانات الثابتة عن المنطق
const CATEGORIES = [
  { 
    id: 1, 
    name: "Jacket", 
    image: "https://images.pexels.com/photos/16567197/pexels-photo-16567197.jpeg" 
  },
  { 
    id: 2, 
    name: "Coat", 
    image: "https://images.pexels.com/photos/2327063/pexels-photo-2327063.jpeg"
  },
  { 
    id: 3, 
    name: "T shirts", 
    image: "https://images.pexels.com/photos/9491359/pexels-photo-9491359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
  },
  { 
    id: 4, 
    name: "Pants", 
    image: "https://images.pexels.com/photos/17135748/pexels-photo-17135748.jpeg" 
  },
  { 
    id: 6, 
    name: "Accessories", 
    image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
  },
];

const Home = () => {
  const context = useContext(Context);
  const { mode } = context;
  const [isMobile, setIsMobile] = useState(false);

  // كشف حجم الشاشة لتحديد إذا كان جهاز محمول
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // التحقق عند التحميل وعند تغيير حجم النافذة
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // إصلاح مشاكل الـ Scroll عند تحميل الصفحة
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.overflowX = 'hidden';
    document.body.style.overflowX = 'hidden';
    
    return () => {
      document.documentElement.style.overflowX = '';
      document.body.style.overflowX = '';
    };
  }, []);

  // استخدام useMemo لتحسين الأداء
  const colors = useMemo(() => ({
    primary: '#800020',
    primaryHover: '#5c0018',
    background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
    text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
    textSecondary: mode === 'dark' ? '#d1d1d1' : '#4a4a4a',
    border: mode === 'dark' ? '#2a2a2a' : '#e8e8e8',
  }), [mode]);

  // معالجة النقر على الأقسام للتنقل السلس
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = isMobile ? 60 : 80; // ارتفاع ال navbar يتكيف مع حجم الشاشة
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  // فصل الأقسام إلى مكونات فرعية للتنظيم
  const ShopCategoriesSection = () => (
    <section 
      id="categories-section"
      className="px-3 py-8 md:px-8 lg:px-12 scroll-mt-16 md:scroll-mt-20"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left tracking-wide"
          style={{ color: colors.text }}
        >
          Shop Categories
        </h2>
        <div className="overflow-visible">
          <Slider 
            items={CATEGORIES} 
            imageClassName={`${isMobile ? 'h-48' : 'h-64 md:h-80'} w-full object-cover rounded-lg md:rounded-xl hover:scale-105 transition-transform duration-500`}
            titleClassName={`${isMobile ? 'text-base' : 'text-lg'} font-semibold mt-3 md:mt-4 text-center`}
            containerClassName="px-2 py-3 md:px-3 md:py-4 rounded-lg md:rounded-xl hover:shadow-lg transition-all duration-300"
            textColor={colors.text}
            borderColor={colors.border}
            slidesPerView={isMobile ? 1.5 : 3} // تكيف عدد الشرائح المعروضة
          />
        </div>
      </div>
    </section>
  );

  const NewArrivalsSection = () => (
    <section 
      id="new-arrivals-section"
      className="px-3 py-8 md:px-8 lg:px-12 scroll-mt-16 md:scroll-mt-20"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left tracking-wide"
          style={{ color: colors.text }}
        >
          New Arrivals
        </h2>
        <div className="overflow-visible">
          <ProductCard 
            isMobile={isMobile} // تمرير حالة الهاتف المحمول للمكون
          />
        </div>
      </div>
    </section>
  );

  const ImageBannerSection = () => (
    <section 
      id="banner-section"
      className="scroll-mt-16 md:scroll-mt-20 overflow-hidden my-4 md:my-8"
    >
      <ImageBanner isMobile={isMobile} />
    </section>
  );

  const SpecialOfferSection = () => (
    <section 
      id="offers-section"
      className="scroll-mt-16 md:scroll-mt-20 overflow-hidden my-4 md:my-8"
    >
      <SpecialOfferBanner isMobile={isMobile} />
    </section>
  );

  const VideoSection = () => (
    <section 
      id="video-section"
      className="px-3 py-8 md:px-8 lg:px-12 scroll-mt-16 md:scroll-mt-20"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-xl md:text-3xl font-bold mb-6 md:mb-8 text-center md:text-left tracking-wide"
          style={{ color: colors.text }}
        >
          Our Story
        </h2>
        <div className={`${isMobile ? 'h-64' : 'h-96 lg:h-[500px]'} rounded-lg md:rounded-xl overflow-hidden`}>
          <VideoComponent 
            isMobile={isMobile}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );

  // إضافة زر للعودة إلى الأعلى
  const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };

      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    return (
      <button
        onClick={scrollToTop}
        className={`fixed z-50 p-2 md:p-3 rounded-full shadow-2xl transition-all duration-300 ${
          isMobile ? 'bottom-6 right-6' : 'bottom-8 right-8'
        } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{
          backgroundColor: colors.primary,
          color: '#ffffff'
        }}
        aria-label="Back to top"
      >
        <svg className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    );
  };

  return (
    <Layout>
      {/* إضافة CSS ضروري لتحسين الـ Scroll للهواتف */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }
        body {
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch; /* تحسين Scroll على iOS */
        }
        .scroll-mt-16 {
          scroll-margin-top: 4rem;
        }
        .scroll-mt-20 {
          scroll-margin-top: 5rem;
        }
        
        /* تحسينات للهواتف */
        @media (max-width: 768px) {
          .mobile-optimized {
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
          }
          
          .mobile-padding {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
        }
      `}</style>

      <div 
        className='w-full min-h-screen overflow-x-hidden'
        style={{ backgroundColor: colors.background }}
      >
        {/* Hero Section */}
        <div className="overflow-hidden">
          <HeroSection 
            image="https://images.pexels.com/photos/14844540/pexels-photo-14844540.jpeg"
            navbarHeight={isMobile ? 60 : 80}
            onScrollToSection={handleScrollToSection}
            isMobile={isMobile}
          />
        </div>

        {/* Shop Categories */}
        <ShopCategoriesSection />

        {/* Image Banner */}
        <ImageBannerSection />

        {/* New Arrivals */}
        <NewArrivalsSection />

        {/* Special Offers */}
        <SpecialOfferSection />

        {/* Video Section */}
        <VideoSection />

        {/* Scroll to Top Button */}
        <ScrollToTopButton />

        {/* تذييل إضافي لضمان مساحة كافية للـ Scroll على الهواتف */}
        <div className={`${isMobile ? 'h-16' : 'h-20'}`}></div>
      </div>
    </Layout>
  );
};

export default Home;