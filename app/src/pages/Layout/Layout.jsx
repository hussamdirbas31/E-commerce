import React, { Children } from 'react'
import Navbar from '../../component/Navbar'
const Layout = () => {
  return (
    <div>
      <Navbar/>
      <div>{children}</div>
    
    </div>
  )
}

export default Layout
