import React, { useContext } from 'react';
import Footer from '../../component/footer/Footer';
import Navbar from '../../component/Navbar';
import Context from '../../context/Context';

function Layout({ children }) {
  const context = useContext(Context);
  const { mode } = context;

  // Colors matching the design system
  const colors = {
    background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
    text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
  };

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;