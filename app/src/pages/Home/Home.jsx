import React from 'react'
import Layout from '../../component/layout/Layout'
import HeroSection from '../../component/heroSection/HeroSection'
import ProductCard from '../../component/productCard/ProductCard'
import image1 from '../../assest/image.jpeg'
import Card1 from '../../component/Card1/Card1'

import SliderImage from '../../component/slider/Slider'
const Home = () => {
  const Array1 = [
     {
      id:1 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_04_a07_114771_22064_off_a?wid=300"
    },{
      id:2 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_02_a08_109395_11420_off_a?wid=300"
    },{
      id:3 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_02_n08_116185_30360_off_a?wid=300"
    },{
      id:4 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_99_a06_77775_19629_off_a?wid=300"
    },{
      id:5 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_99_a01_118771_30360_off_a?wid=300"
    },{
      id:6 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_01_a02_113673_15104_off_a?wid=300"
    },{
      id:7 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_99_a03_116209_4425_off_a?wid=300"
    },{
      id:8 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/DENIM_SS23_EXPERIENTIAL_NAVIGATION_109082_30426?wid=300"
    },{
      id:9 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_04_a04_95337_22064_off_a?wid=300"
    },{
      id:10 ,
      name: "prod1",
      Image:"https://aritzia.scene7.com/is/image/Aritzia/s24_14_a06_117747_19629_off_a?wid=300"
    },
  ]

  return (
 <Layout >
      
 <div className='w-full '> 
   <HeroSection image={image1}/>
 </div>

  <div className='p-[4%]'>
  <SliderImage Array={Array1}/>
  </div>
   
  <HeroSection image={image1}/>
  <div className='p-[5%]'>
   <ProductCard/>   
   </div>
  

 </Layout>
    )
}

export default Home
