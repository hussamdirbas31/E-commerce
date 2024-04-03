import React from 'react'
import Footer from '../../component/footer/Footer'
import Navbar from '../../component/Navbar'
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout