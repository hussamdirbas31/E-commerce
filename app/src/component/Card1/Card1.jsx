import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
const Card1 = ({ title, price, description ,image,productId}) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state)=> state.cart)
  console.log(cartItems)
  

  const addCart = (product) => {
  dispatch(addToCart(product))
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems])

  return (
    <div className="max-w-xs w-full bg-white shadow-lg rounded-lg overflow-hidden">
    <Link to="/product">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
    </Link>
    <div className="p-4">
      <Link to="/product" className="block font-semibold text-gray-800 hover:text-red-600">
        {title}
      </Link>
      <p className="mt-2 text-gray-500">{price}$</p>
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="mt-4">
        <button onClick={()=>addCart({ title, price, description ,image,productId})} className="bg-black text-white py-2 px-4 rounded hover:bg-red-700 hover:text-white">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
    );
};

export default Card1;
