import React from 'react'
const Card1 = ({ name,image}) => {
  
  
  return (
    <div className=''>
    <div>
      <div>
        <img src={image} alt="" srcset="" />
      </div>
      <div>
        <h1>{name}</h1>
        <span>price</span>
      </div>
    </div>
    </div>
    )
}

export default Card1
