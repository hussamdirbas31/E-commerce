import React,{useContext} from 'react'
import Context from '../../context/Context'
import Card1 from '../Card1/Card1'
import { useDispatch, useSelector } from 'react-redux'

const Products = () => {
const context = useContext(Context)
const {product} = context
const dispatch = useDispatch()

  return (
    <div className=' p-[4%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4'>
      {product.map((item,index)=>{
    const{title,price , description,imageUrl,id}= item
    return(
      <Card1  key={index} title={title.slice(0,16)}
       price={price}
       description={description.slice(0,48)}
       image={imageUrl}
       productId={id}
       item={item}
       />
    )
   })}
    </div>
  )
}

export default Products
