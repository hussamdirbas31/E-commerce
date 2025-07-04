import React from 'react'
import { BrowserRouter as Router,Route , Routes, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/cart/Cart';
import Dashboard from './pages/Admin/Dashboard';
import State from './context/State';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/addProduct/AddProduct';
import UpdateProducts from './pages/updateProducts/UpdateProducts';
import SignUp from './component/signup/SignUp';
import Login from './component/login/Login'
import NoPage from './pages/noPage/NoPage';
import Cookie from 'cookie-universal'
import {AuthProvider}  from './context/AuthContext';
import Clothing from './pages/clothing/Clothing';
import Orders from './pages/Order/Order';

const App = () => {

  return (
 <AuthProvider>
  <State>
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Clothing />} />

        <Route path="/orders" element={
            <Orders />
        } />

        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={
          <Dashboard />
          } />
<Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addproduct" element={
          <AddProduct />} />
          <Route path="/updateproduct" element={
          <UpdateProducts />} />
        
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </Router>
  </State>
  </AuthProvider>
    )
}

export default App

export const ProtectedRoutes = ({ children }) => {
  const cookies = Cookie()
  if (cookies.get('e-commerce')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}

export const ProtectedRoutesForAdmin = ({children}) => {
  const cookies = Cookie();
  const admin = JSON.parse(cookies.get('ecommerce'))
  if (admin.user.email === 'hussamdirbas11@gmail.com') {
    return children;
  }
  else {
    return <NoPage />;
  }
}