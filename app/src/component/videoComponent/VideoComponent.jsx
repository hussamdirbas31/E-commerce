import React, { useContext, useState, useEffect, useMemo } from 'react';
import ReactPlayer from 'react-player';
import { debounce } from 'lodash';
import myContext from '../../context/Context';

const VideoComponent = ({ title, desktopVideoUrl, mobileVideoUrl }) => {
  const context = useContext(myContext);
  const { mode } = context;
  const [isMobile, setIsMobile] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  // Professional color scheme
  const styles = useMemo(() => ({
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
  }), []);

  const currentStyle = useMemo(() => (mode === 'dark' ? styles.dark : styles.light), [mode, styles]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 768);
    }, 100);
    
    // Initialize
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
      {/* Centered content with modern typography */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center leading-tight"
          style={{
            color: currentStyle.text,
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            maxWidth: '100%',
            fontFamily: '"Helvetica Neue", sans-serif',
            fontWeight: 700,
            letterSpacing: '-0.5px'
          }}
        >
          {title}
        </h2>
      </div>

    
      {/* Optimized video player */}
      <ReactPlayer
        url={isMobile ? mobileVideoUrl : desktopVideoUrl}
        playing={isPlaying}
        muted={isMuted}
        loop
        width="100%"
        height="100%"
        playsinline
        playsInline
        onReady={() => setIsReady(true)}
        onError={() => console.error('Video playback error')}
        config={{
          file: {
            attributes: {
              controlsList: 'nodownload',
              disablePictureInPicture: true,
              playsInline: true
            },
            forceVideo: true,
            hlsOptions: {
              maxBufferLength: 15,
              maxMaxBufferLength: 60
            }
          }
        }}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
        fallback={
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: currentStyle.fallbackBg }}
          >
            <div className="animate-pulse flex space-x-4">
              <div className="text-white text-lg">Loading immersive experience...</div>
            </div>
          </div>
        }
      />
      
      {/* Loading state */}
      {!isReady && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-0"
          style={{ backgroundColor: currentStyle.fallbackBg }}
        >
          <div className="animate-pulse flex space-x-4">
            <div className="text-white text-lg">Loading video...</div>
          </div>
        </div>
      )}
      
      {/* Subtle bottom gradient for better text readability */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
        }}
        aria-hidden="true"
      />
    </section>
  );
};

export default VideoComponent;