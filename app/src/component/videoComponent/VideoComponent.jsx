import React, { useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import myContext from '../../context/Context';

// أنواع الفيديو الافتراضية
const DEFAULT_VIDEOS = {
  desktop: "https://www.pexels.com/download/video/6153580/",
  mobile: "https://videos.pexels.com/video-files/3894725/3894725-uhd_1440_2732_25fps.mp4"
};

// ثوابت الأنماط مع تحسينات في القياسات
const STYLES = {
  light: {
    text: '#ffffff',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.5))',
    fallbackBg: '#f0f0f0'
  },
  dark: {
    text: '#ffffff',
    overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7))',
    fallbackBg: '#121212'
  }
};

// نقاط التوقف للاستجابة
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280
};

// مكون تحميل احتياطي محسن
const LoadingFallback = ({ style }) => (
  <div 
    className="absolute inset-0 flex items-center justify-center z-0"
    style={{ backgroundColor: style.fallbackBg }}
  >
    <div className="animate-pulse flex flex-col items-center space-y-3">
      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full animate-spin"></div>
      <div className="text-white text-base sm:text-lg font-medium text-center px-4">
        Loading immersive experience...
      </div>
    </div>
  </div>
);

// مكون العنوان محسن القياسات
const VideoTitle = ({ title, style, isMobile }) => (
  <h2 
    className="font-bold text-center leading-tight px-4"
    style={{
      color: style.text,
      textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
      maxWidth: '100%',
      fontFamily: '"Helvetica Neue", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.5px',
      fontSize: isMobile ? '2rem' : 'clamp(2.5rem, 5vw, 4rem)',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      lineHeight: isMobile ? '1.2' : '1.1'
    }}
  >
    {title}
  </h2>
);

// مكون الفيديو المخصص
const CustomVideoPlayer = ({ 
  url, 
  onReady, 
  onError, 
  isPlaying 
}) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      onReady();
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleError = (e) => {
      console.error('Video error:', e);
      setIsLoading(false);
      onError();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', () => setIsLoading(true));
    video.addEventListener('playing', () => setIsLoading(false));

    // محاولة تحميل الفيديو
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', () => setIsLoading(true));
      video.removeEventListener('playing', () => setIsLoading(false));
    };
  }, [url, onReady, onError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(error => {
        console.warn('Auto-play prevented:', error);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover'
        }}
      >
        <source src={url} type="video/mp4" />
        <source src={url} type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* مؤشر تحميل الفيديو */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-30">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

const VideoComponent = ({ 
  title = "New Collections", 
  desktopVideoUrl = DEFAULT_VIDEOS.desktop, 
  mobileVideoUrl = DEFAULT_VIDEOS.mobile 
}) => {
  const context = useContext(myContext);
  const { mode } = context;
  
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    width: 0,
    height: 0
  });
  
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // تحديد نمط المكون بناءً على الوضع
  const currentStyle = useMemo(() => 
    STYLES[mode === 'dark' ? 'dark' : 'light'], 
    [mode]
  );

  // كشف حجم الشاشة مع تحسينات
  const handleResize = useCallback(
    debounce(() => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
        width,
        height
      });
    }, 150),
    []
  );

  // إدارة التشغيل/الإيقاف عند تركيز الصفحة
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPlaying(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        handleResize.cancel();
      };
    }
  }, [handleResize]);

  // معالجة أحداث الفيديو
  const handleReady = useCallback(() => {
    setIsReady(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsReady(false);
  }, []);

  const videoUrl = screenSize.isMobile ? mobileVideoUrl : desktopVideoUrl;

  // ارتفاع ديناميكي بناءً على حجم الشاشة
  const containerHeight = useMemo(() => {
    if (screenSize.isMobile) {
      return Math.max(screenSize.height * 0.85, 500);
    }
    if (screenSize.isTablet) {
      return Math.max(screenSize.height * 0.90, 600);
    }
    return Math.max(screenSize.height, 700);
  }, [screenSize]);

  // إعادة تحميل الفيديو عند تغيير الرابط
  useEffect(() => {
    setIsReady(false);
    setHasError(false);
  }, [videoUrl]);

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{ 
        height: `${containerHeight}px`,
        minHeight: '500px',
        maxHeight: '100vh'
      }}
    >
      {/* المحتوى العلوي */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <VideoTitle 
          title={title} 
          style={currentStyle} 
          isMobile={screenSize.isMobile}
        />
        
        {/* نص إضافي استجابة */}
        {!screenSize.isMobile && (
          <p 
            className="text-white text-center text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
              opacity: 0.9,
              lineHeight: '1.4'
            }}
          >
            Discover our exclusive collection crafted for extraordinary experiences
          </p>
        )}
      </div>

      {/* مشغل الفيديو المخصص */}
      {!hasError ? (
        <CustomVideoPlayer
          url={videoUrl}
          onReady={handleReady}
          onError={handleError}
          isPlaying={isPlaying}
        />
      ) : (
        <div 
          className="absolute inset-0 bg-gray-800 flex items-center justify-center z-0"
        >
          <div className="text-white text-center px-4">
            <div className="text-3xl sm:text-4xl mb-3">⚠️</div>
            <p className="text-xl sm:text-2xl mb-2">Video unavailable</p>
            <p className="text-base sm:text-lg opacity-80">Please check your connection or video URL</p>
            <button 
              className="mt-4 px-6 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              onClick={() => {
                setHasError(false);
                setIsReady(false);
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* حالة التحميل الرئيسية */}
      {!isReady && !hasError && (
        <LoadingFallback style={currentStyle} />
      )}
      
      {/* تدرج للقراءة - ديناميكي حسب الحجم */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: screenSize.isMobile ? '80px' : '120px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
        }}
        aria-hidden="true"
      />
      
      {/* تدرج علوي للشاشات الكبيرة */}
      {!screenSize.isMobile && (
        <div 
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
          style={{
            height: '60px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)'
          }}
          aria-hidden="true"
        />
      )}

      {/* زر تحكم صغير للشاشات الكبيرة */}
      {!screenSize.isMobile && isReady && (
        <button
          className="absolute bottom-4 right-4 z-30 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      )}
    </section>
  );
};

export default VideoComponent;