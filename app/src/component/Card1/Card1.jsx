import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
const Card1 = ({ title, price, description ,image,productId}) => {
  const dispatch = useDispatch()

  const addCart = () =>{
  dispatchEvent(addToCart({title,price,description,image,id:productId}))
 }
  return (
    <div className="  p-[1rem]  overflow-hidden shadow-xl scale-105">
      <Link to="/product">
        <img src={image} alt={title} className="w-full h-80 object-cover" />
      </Link>
      <div className="p-4">
        <Link to="/product" className="block font-semibold text-gray-800 hover:text-red-600">
          {title}
        </Link>
        <p className="mt-2 text-gray-500">{price}$</p>
        <p className="mt-2 text-gray-700">{description}...</p>
        <div className="mt-4">
          <button onClick={addCart} className="bg-black text-white py-2 px-4 rounded hover:bg-red-700 hover:text-white">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card1;
