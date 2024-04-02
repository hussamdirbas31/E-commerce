import React,{useContext} from 'react'
import Context from '../../context/Context'
import Card1 from '../Card1/Card1'
import image from '../../assest/image2.jpeg'
const ProductCard = () => {
const context = useContext(Context)
const {mode} = context
const array = [
{id:1,name:"cloth", image: image},
{id:2,name:"cloth", image: image},
{id:3,name:"cloth", image: image},
{id:4,name:"cloth", image: image},
{id:5,name:"cloth", image: image},
]

  return (
    <section className="relative  bg-red-600 flex flex-row justify-around">
   {array.map((item)=>{
    return <Card1 key={item.id} name={item.name} image={item.image}/>
   })}
</section >

    )
}

export default ProductCard
