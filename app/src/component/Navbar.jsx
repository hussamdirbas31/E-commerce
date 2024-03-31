import React from 'react'
import { Link } from 'react-router-dom'
import Search from './search/Search'
import { IoMenuOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { useState } from 'react';
const Navbar = () => {
  const [nav , setNav] = useState(false)
  const handleClick = ()=>{
    setNav(!nav)
  }
  const navLinks = [
    {id:"1",path:"clothing",title:"Clothing"},
    {id:"2",path:"stories",title:"Stories"},
  
  ]

  return (
   <nav className=' bg-transparent hover:bg-white grid grid-cols-2 p-5 items-center'>
    <h3 className='   text-4xl p-[2%]'><Link to="/">Artizia</Link></h3>
    <div className='hidden md:flex '><Search/></div>
    <ul className=' hidden md:flex flex-row gap-6 p-[2%] '>
   
    {navLinks.map((item)=>{
      return <li ><Link to={`/${item.path}`}>
        {item.title}
        </Link></li>
    })}
    </ul>
    
    {/* mobile code */}
   <div onClick={handleClick} className=' z-50 md:hidden flex flex-row relative w-[20%]  left-[80%] bottom-[8%]'>
   {nav ? <FaTimes className='relative top-1 text-white' size={35}/>:    <IoMenuOutline  className='relative top-1'  size={40}/>}      
   </div>

   <ul className={`${
    nav ? 'text-white gap-20  opacity-100 translate-x-0 ' :
    'opacity-0 transform -translate-y-full '    
   }  transition-transform
     absolute left-0 top-0 w-full h-screen bg
    bg-zinc-800/90 flex flex-col  md:hidden justify-center  items-center text-3xl`}>
   
    {navLinks.map((item)=>{
      return <li ><Link  className=' hover:text-red-500 ' to={`/${item.path}`}>
        {item.title}
        </Link></li>
    })} 
    </ul>
    
   </nav>
    )
}

export default Navbar
