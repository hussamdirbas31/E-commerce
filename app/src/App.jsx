import React from 'react'
import { BrowserRouter as Router,Route , Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/Order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/Admin/Dashboard';
import MyState from './context/State';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/addProduct/AddProduct';
import UpdateProducts from './pages/updateProducts/UpdateProducts';
const App = () => {
  return (
   <MyState>
    
<Router>
  <Routes>
    
          <Route path="/" element={<Home/>} />
          <Route path="/order" element={<Order/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path='/addproduct' element={<AddProduct/>} />
          <Route path='/updateproduct' element={<UpdateProducts/>} />
          <Route path="/productinfo/:id" element={<ProductInfo/>} />
       
  </Routes>
</Router>
   </MyState>
    )
}

export default App
