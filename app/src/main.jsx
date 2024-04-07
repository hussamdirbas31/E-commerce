import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContextProvieder } from './context/AuthContext.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthContextProvieder>
<React.StrictMode>
    <App />
  </React.StrictMode>
  </AuthContextProvieder>,
)
