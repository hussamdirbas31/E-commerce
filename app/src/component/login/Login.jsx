import Cookie from "cookie-universal";
import { auth } from '../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { React, useState, useContext } from "react";
import image from '../../assest/image2.jpeg';
import Layout from '../../component/layout/Layout';
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { toast } from 'react-toastify';
import Context from '../../context/Context';

function Login() {
  const context = useContext(Context);
  const { mode } = context;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cookies = Cookie();

  // Color scheme with dark mode support
  const colors = {
    primary: '#800020', // Maroon
    primaryHover: '#5c0018',
    background: mode === 'dark' ? '#0f0f0f' : '#ffffff',
    cardBg: mode === 'dark' ? 'rgb(32 33 34)' : '#ffffff',
    text: mode === 'dark' ? '#f5f5f5' : '#1a1a1a',
    textSecondary: mode === 'dark' ? '#d1d1d1' : '#4a4a4a',
    border: mode === 'dark' ? '#2a2a2a' : '#e8e8e8',
    inputBg: mode === 'dark' ? '#1a1a1a' : '#ffffff',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!email || !password) {
      toast.error("All fields are required", { position: "top-right" });
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      cookies.set("e-commerce", JSON.stringify(result));   
      toast.success("Login successful!", { position: "top-right" });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.message, { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div 
        className="min-h-screen flex" 
        style={{ backgroundColor: colors.background }}
      >
        {/* Left Side - Form */}
        <div 
          className="w-full md:w-1/2 flex items-center justify-center p-8"
          style={{ backgroundColor: colors.background }}
        >
          <div 
            className="w-full max-w-md p-8 rounded-xl"
            style={{ 
              backgroundColor: colors.cardBg,
              border: `1px solid ${colors.border}`,
              boxShadow: mode === 'dark' 
                ? '0 4px 6px rgba(0, 0, 0, 0.3)' 
                : '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="text-center mb-8">
              <h2 
                className="text-3xl font-bold"
                style={{ color: colors.primary }}
              >
                Welcome to Artizia
              </h2>
              <p style={{ color: colors.textSecondary }}>
                Sign in to access your account
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.text }}
                >
                  Email Address
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5" style={{ color: colors.textSecondary }} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 pl-10 block w-full rounded-md focus:ring-2 focus:ring-offset-2"
                    placeholder="your@email.com"
                    style={{ 
                      backgroundColor: colors.inputBg,
                      borderColor: colors.border,
                      color: colors.text,
                      focusRing: colors.primary
                    }}
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-1"
                  style={{ color: colors.text }}
                >
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5" style={{ color: colors.textSecondary }} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-3 pl-10 block w-full rounded-md focus:ring-2 focus:ring-offset-2"
                    placeholder="••••••••"
                    style={{ 
                      backgroundColor: colors.inputBg,
                      borderColor: colors.border,
                      color: colors.text,
                      focusRing: colors.primary
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded focus:ring-2 focus:ring-offset-2"
                    style={{ 
                      backgroundColor: colors.inputBg,
                      borderColor: colors.border,
                      focusRing: colors.primary
                    }}
                  />
                  <label 
                    htmlFor="remember-me" 
                    className="ml-2 block text-sm"
                    style={{ color: colors.text }}
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link 
                    to="/forgot-password" 
                    className="font-medium"
                    style={{ color: colors.primary }}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                  style={{ 
                    backgroundColor: loading ? colors.primaryHover : colors.primary,
                    focusRing: colors.primary
                  }}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" style={{ borderColor: colors.border }}></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span 
                    className="px-2"
                    style={{ 
                      backgroundColor: colors.cardBg,
                      color: colors.textSecondary
                    }}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center items-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium focus:outline-none transition-colors duration-200"
                  style={{ 
                    borderColor: colors.border,
                    backgroundColor: colors.cardBg,
                    color: colors.text
                  }}
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  Sign in with Google
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p style={{ color: colors.textSecondary }}>
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-medium"
                  style={{ color: colors.primary }}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div 
          className="hidden md:block md:w-1/2 relative"
          style={{ backgroundColor: mode === 'dark' ? '#1a1a1a' : '#f5f5f5' }}
        >
          <img
            src={image}
            alt="Decorative"
            className="w-full h-full object-cover opacity-90"
          />
          <div 
            className="absolute bottom-8 left-8 right-8 p-6 rounded-lg shadow-sm"
            style={{ 
              backgroundColor: mode === 'dark' ? 'rgba(15, 15, 15, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${colors.border}`
            }}
          >
            <p 
              className="text-lg"
              style={{ color: colors.text }}
            >
              "Discover the latest fashion trends with Artizia's exclusive collections."
            </p>
            <p 
              className="mt-2 text-sm font-medium"
              style={{ color: colors.primary }}
            >
              — Artizia Team
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;