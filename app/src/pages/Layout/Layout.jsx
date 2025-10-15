import React from 'react'
import Footer from '../../component/footer/Footer'
import Navbar from '../../component/Navbar'

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full relative">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout