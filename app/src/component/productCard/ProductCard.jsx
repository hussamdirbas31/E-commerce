import React,{useContext} from 'react'
import Context from '../../context/Context'
import Card1 from '../Card1/Card1'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
const ProductCard = () => {
const context = useContext(Context)
const {mode,product} = context
const dispatch = useDispatch()
const cartItems = useSelector((state)=> state.cart)

  return (
    <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
    {product.slice(0,4).map((item,index)=>{
    const{title,price , description,imageUrl,id}= item
    return(
      <Card1  key={index} title={title.slice(0,16)}
       price={price}
       description={description.slice(0,48)}
       image={imageUrl}
       productId={id}
       />
    )
   })}
  </section>
    )
}

export default ProductCard
