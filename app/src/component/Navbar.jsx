import React, { useContext, useEffect } from 'react'
import { Link} from 'react-router-dom'
import Search from './search/Search'
import { IoMenuOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useState } from 'react';
import Context from '../context/Context'
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import {AuthContext} from '../context/AuthContext'
import { auth } from '../firebase/FirebaseConfig';
import { useSelector } from 'react-redux';
const Navbar = () => {
  const [nav , setNav] = useState(false)
  const context = useContext(Context)
  const {mode,toggleMode} = context
  const {user}= useContext(AuthContext)
 const handleLogout = () => {
  auth.signOut()
 }


  const handleClick = ()=>{
    setNav(!nav)
  }
  
  const navLinks = [
    {id:"1",path:"clothing",title:"Clothing"},
    {id:"2",path:"stories",title:"Stories"},
  ]

   const cartItems = useSelector((state)=> state.cart)  




  return (
   <nav style={{ backgroundColor: mode === 'dark' ? '#4A4A4A' : '', color: mode === 'dark' ? 'white' : '', }}
    className='  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] pb-4 z-50 sticky top-0   bg-white grid grid-cols-2 pl-8 items-center'>
    
     {/*...........................................................................................  */}
    <Link to="/"  className='text-6xl p-[1%] w-[40%] '><h3  >Artizia</h3></Link>
    
    {/* ....................................................................... */}
    
    <div className='hidden md:flex flex-row items-center justify-center w-[40%] relative left-[7%] '>
      <Search  mode1={{ backgroundColor: mode === 'dark' ? '#4A4A4A' : '', color: mode === 'dark' ? 'white' : '', }}/>
      <button className='' onClick={toggleMode}>
                    {mode === 'light' ?
                      (<FiSun  size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>    
        <Link to='/cart'><IoCartOutline size={36}
         className='  relative
          left-4 top-[6%]'/>
          
          </Link>
          <span className=' relative left-4 bottom-3 bg-red-600'>{cartItems.length}</span>
    <ul style={{ backgroundColor: mode === 'dark' ? '#4A4A4A' : '', color: mode === 'dark' ? 'white' : '', }}
     className=' flex flex-row relative left-[20%] text-lg space-x-4 '>
    {
      user? (
        <>
        <Link to='/profile'>{user.email}</Link>
        <button onClick={handleLogout}>Logout</button>
        </>
      ):(<>
      <Link to='/signup' className='flex flex-row h-8 text-white items-center bg-black/40 p-2 rounded relative left-5 top-1'>Signup</Link>
      
      <Link to='/login' className='flex h-8 items-center bg-black text-white p-2 rounded relative top-1'>Login</Link>
      </>
      )
    }


    </ul>

       </div>
      
  
    <ul className={`hidden
     md:flex flex-row gap-6 relative left-3 pb-[1%]
        w-[50%] text-lg `  }>
   
    {navLinks.map((item)=>{
      return <li  key={item.id} >
        <Link className=' hover:text-red-600' to={`/${item.path}`}>
        {item.title}
        </Link>
        </li>
   
   })}
   
    </ul>
    
   <div onClick={handleClick} 
     style={{ 
      backgroundColor: mode === 'dark' ? 
      '#4A4A4A' : '', color: mode === 
      'dark' ? 'white' : '', }} 
     className=' z-50 md:hidden flex flex-row relative w-[20%]  left-[80%] bottom-[8%]'>
   

   {nav ?
    
  <FaTimes className='relative top-1 text-white' size={35}/>:
   
   <IoMenuOutline  className='relative top-1'  size={40}/>}      
       
   </div>

   
   <ul className={`${
    nav ? 'text-white gap-20  opacity-100 translate-x-0 ' :
    'opacity-0 transform -translate-y-full '    
   }  transition-transform
     absolute left-0 top-0 w-full h-screen bg
    bg-zinc-800/90 flex flex-col  md:hidden justify-center  items-center text-3xl`}>
    {navLinks.map((item)=>{
    return <li key={item.id} style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}  ><Link  className=' hover:text-red-500 ' to={`/${item.path}`}>
    {item.title}
    </Link></li>
    })} 
    
     </ul> 
   
   </nav>
    )
}

export default Navbar
