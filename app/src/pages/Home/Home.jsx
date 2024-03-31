import React from 'react'
import Layout from '../../component/layout/Layout'
import HeroSection from '../../component/heroSection/HeroSection'
const Home = () => {
  const imagesData=[
    {id:1,src:'https://assets.aritzia.com/image/upload/f_auto/q_auto/c_limit,w_1200/sp24-wk8-03-26-hp-main-a',alt:'image 1'},
    {id:2,src:'https://assets.aritzia.com/image/upload/f_auto/q_auto/c_limit,w_1200/sp24-wk8-03-26-hp-main-b',alt:'image 2'},
    {id:3,src:'https://assets.aritzia.com/image/upload/f_auto/q_auto/c_limit,w_1200/sp24-wk8-03-26-hp-main-c',alt:'image 3'},
    {id:4,src:'https://assets.aritzia.com/image/upload/f_auto/q_auto/c_limit,w_1200/sp24-wk8-03-26-hp-main-d',alt:'image 4'},
]
const imagesData2=[  
{id:1,src:'https://assets.aritzia.com/image/upload/f_auto/q_auto/c_limit,w_1200/sp24-wk8-03-26-hp-main-a',alt:'image 1'},
{id:2,src:'https://assets.aritzia.com/image/upload/f_auto/q_auto/c_limit,w_1200/sp24-wk8-03-26-hp-main-b',alt:'image 2'},
{id:3,src:'https://assets.aritzia.com/image/upload/f_auto/q_auto/c_limit,w_1200/sp24-wk8-03-26-hp-main-c',alt:'image 3'},
]
  return (
 <Layout >
  <HeroSection/>

 </Layout>
    )
}

export default Home
