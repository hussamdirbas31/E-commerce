import React from 'react'
import { BrowserRouter as Router,Route , Routes,Navigate } from 'react-router-dom'
import Home from './pages/Home/Home'
import Order from './pages/Order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/Admin/Dashboard';
import State from './context/State';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/addProduct/AddProduct';
import UpdateProducts from './pages/updateProducts/UpdateProducts';
import SignUp from './component/signup/SignUp';
import Login from './component/login/Login'
import NoPage from './pages/noPage/NoPage';
const App = () => {
  return (
    <State>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={
            <Order />
        } />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={
          <Dashboard />
        } />
        <Route path="/productinfo" element={<ProductInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addproduct" 
        element={
          <AddProduct />
            } />
        <Route path="/updateproduct"
         element={
                    <UpdateProducts />
            } />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </Router>
  </State>    )
}

export default App

