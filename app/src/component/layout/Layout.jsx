import React from 'react'
import Footer from '../footer/Footer'
import Navbar from '../Navbar'
function Layout({ children }) {
  return (
    <AuthProvider>
    <div>
      
      <Navbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
    </AuthProvider>
  )
}

export default Layout