import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenuOutline, IoCartOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import Context from '../context/Context';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/FirebaseConfig';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const context = useContext(Context);
  const { mode, toggleMode } = context;
  const { user } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart);

  // Enhanced maroon color palette
  const colors = {
    primary: '#800020',
    primaryHover: '#5c0018',
    secondary: '#d4a59a',
    secondaryHover: '#c08e80',
    background: mode === 'light' ? '#ffffff' : '#0f0f0f',
    text: mode === 'light' ? '#1a1a1a' : '#f5f5f5',
    textInverted: mode === 'light' ? '#f5f5f5' : '#1a1a1a',
    border: mode === 'light' ? '#e8e8e8' : '#2a2a2a',
    badge: '#dc2626',
    glass: mode === 'light' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(15, 15, 15, 0.95)',
  };

  const navLinks = [
    { id: "1", path: "shop", title: "Shop" },
    { id: "2", path: "orders", title: "My Orders" }, // Added Orders link
  ];

  const handleLogout = () => auth.signOut();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Main Navigation Bar */}
      <header className="sticky top-0 w-full z-50 backdrop-blur-sm"
        style={{
          backgroundColor: colors.glass,
          borderBottom: `1px solid ${colors.border}`,
          boxShadow: '0 2px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-2xl font-bold tracking-tight hover:tracking-wide transition-all duration-300"
              style={{ color: colors.primary }}
            >
              Fema
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  to={`/${item.path}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium relative group"
                  style={{ color: colors.text }}
                >
                  <span className="relative z-10">{item.title}</span>
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-current transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: colors.primary }}
                  />
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button 
                onClick={toggleMode}
                className="p-2 rounded-full hover:bg-opacity-10 hover:bg-current transition-all"
                aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
                style={{ color: colors.primary }}
              >
                {mode === 'light' ? (
                  <FiSun size={20} className="hover:rotate-12 transition-transform" />
                ) : (
                  <BsFillCloudSunFill size={20} className="hover:rotate-12 transition-transform" />
                )}
              </button>
              
              {/* Cart */}
              <Link 
                to="/cart" 
                className="p-2 relative rounded-full hover:bg-opacity-10 hover:bg-current transition-all"
                aria-label="Shopping Cart"
                style={{ color: colors.primary }}
              >
                <IoCartOutline size={22} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                    style={{ 
                      backgroundColor: colors.badge,
                      color: colors.textInverted
                    }}
                  >
                    {cartItems.length}
                  </span>
                )}
              </Link>
              
              {/* User/Auth */}
              {user ? (
                <div className="hidden md:flex items-center space-x-3 ml-2">
                  <Link 
                    to="/profile" 
                    className="text-sm font-medium px-3 py-1.5 rounded-full hover:bg-opacity-10 hover:bg-current transition-all"
                    style={{ color: colors.text }}
                  >
                    {user.email.split('@')[0]}
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm font-medium px-4 py-1.5 rounded-full hover:shadow-md transition-all"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.textInverted,
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link 
                    to="/login" 
                    className="text-sm font-medium px-4 py-1.5 rounded-full border hover:shadow-md transition-all"
                    style={{
                      borderColor: colors.primary,
                      color: colors.primary,
                    }}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-sm font-medium px-4 py-1.5 rounded-full hover:shadow-md transition-all"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.textInverted,
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-full hover:bg-opacity-10 hover:bg-current transition-all"
                aria-label="Menu"
                style={{ color: colors.primary }}
              >
                {isMenuOpen ? (
                  <FaTimes size={24} className="transform transition-transform hover:rotate-90" />
                ) : (
                  <IoMenuOutline size={24} className="transform transition-transform hover:rotate-90" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm" onClick={toggleMenu} />
      )}
      
      {/* Mobile Menu Panel */}
      <div className={`fixed inset-y-0 right-0 z-50 w-80 max-w-full transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
          backgroundColor: colors.background,
          borderLeft: `1px solid ${colors.border}`,
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/" 
              className="text-2xl font-bold"
              style={{ color: colors.primary }}
              onClick={toggleMenu}
            >
Arti
            </Link>
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full"
              style={{ color: colors.primary }}
            >
              <FaTimes size={20} />
            </button>
          </div>
          
          <nav className="flex-1 space-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={`/${item.path}`}
                className="block py-3 px-4 rounded-lg hover:pl-6 transition-all"
                style={{ 
                  color: colors.text,
                  backgroundColor: mode === 'light' ? '#f8f8f8' : '#1a1a1a',
                }}
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          
          <div className="pt-6 border-t" style={{ borderColor: colors.border }}>
            {user ? (
              <div className="space-y-3">
                <Link
                  to="/profile"
                  className="block w-full px-4 py-3 rounded-lg text-center font-medium"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.textInverted,
                  }}
                  onClick={toggleMenu}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full px-4 py-3 rounded-lg text-center font-medium border"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/signup"
                  className="block w-full px-4 py-3 rounded-lg text-center font-medium"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.textInverted,
                  }}
                  onClick={toggleMenu}
                >
                  Create Account
                </Link>
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 rounded-lg text-center font-medium border"
                  style={{
                    borderColor: colors.primary,
                    color: colors.primary,
                  }}
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;