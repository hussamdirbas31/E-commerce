import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import myContext from '../../context/Context';

const VideoComponent = ({ title, desktopVideoUrl, mobileVideoUrl }) => {
  const context = useContext(myContext);
  const { mode } = context;

  // Professional color scheme
  const styles = {
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

  const currentStyle = mode === 'dark' ? styles.dark : styles.light;

  // Check if device is mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
      {/* Modern overlay with subtle gradient */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: currentStyle.overlay,
        }}
      />
      
      {/* Centered content with modern typography */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center leading-tight"
          style={{
            color: currentStyle.text,
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            maxWidth: '90%',
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
        playing
        muted
        loop
        width="100%"
        height="100%"
        playsinline
        playsInline
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
            className="absolute inset-0 flex items-center justify-center bg-black"
            style={{ backgroundColor: currentStyle.fallbackBg }}
          >
            <div className="animate-pulse flex space-x-4">
              <div className="text-white text-lg">Loading immersive experience...</div>
            </div>
          </div>
        }
      />
      
      {/* Subtle bottom gradient for better text readability */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
        }}
      />
    </section>
  );
};

export default VideoComponent;