import React, { Fragment } from 'react'
import {CiSearch} from "react-icons/ci"
const Search = ({style,mode}) => {
  
  
  
  return (
    <Fragment>
       <div className='relative' style={style} >
      <CiSearch className='absolute top-3 left-3 ' />
      <input type='text' className={`
      pl-10
      pr-3 
      py-2 
      outline-none 
      ${mode ? ' border border-b-1 border-t-transparent border-l-transparent border-r-transparent  ' : ''}
      `}
          style={style}  placeholder='Search...' />
    </div>
    </Fragment>
    )
}

export default Search
// border border-b-1
//       border-t-transparent
//       border-l-transparent 
//       border-r-transparent
//     border-b-black 