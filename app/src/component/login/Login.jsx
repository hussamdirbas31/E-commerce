import { React, useRef, useState,useContext } from "react";
import AuthContext from '../../context/AuthContext'
import { Link ,useNavigate,useLocation} from 'react-router-dom'
import image from '../../assest/image2.jpeg'
import Layout from '../../component/layout/Layout'
import Loader from '../../component/loader/Loader'
const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext)

  const [isLoading, setIsloading]= useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
   setIsloading(true)
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCu4Vie0NPdD0QgRTtXH5mmQHAvBlsxf0s', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      });

      setIsloading(false)
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        authCtx.login(data.idToken)
        return data
      
      } else {
        console.error('Signup failed:', data.error);
        const errordata = 'Auth is faild'
        throw new Error(errordata)
      }

    } catch (error) {
      alert(error.messsage)
    }
  };


  return (
    <Layout>
    <div className="flex items-center justify-center h-screen bg-gray-100">
  <div
    className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
  >
    <div className="
    flex
    flex-col
    justify-center
    p-8
    md:p-14">
      <span className="
      mb-3
       text-4xl
       font-bold">Welcome back</span>
      <span className="font-light text-gray-400 mb-8">
        Welcom back! Please enter your details
      </span>
      <form action=""  onSubmit={handleSubmit}> 
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
           
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              ref={emailRef}

            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              
              ref={passwordRef}
              />
            
          </div>

          <div className="flex justify-between w-full py-4 px-2">
            <div className=" mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember for 30 days</span>
            </div>
            
          </div>
         {!isLoading&& <button
            className="w-full
             bg-black text-white p-2
             rounded-lg mb-6
              hover:bg-white
               hover:text-black 
               hover:border-gray-300"
         >
            Login
          </button>
          }
         {isLoading &&  <button
            className="w-full
             bg-black text-white p-2
             rounded-lg mb-6
              hover:bg-white
               hover:text-black 
               hover:border-gray-300"
         >
            Loading
          </button>}  
          
          
          <button

            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white"
          >
            <img src={image} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
          </form>
      
      
      
      
      <div className="flex justify-between w-full py-4">
        <div className="mr-24">
          <input type="checkbox" name="ch" id="ch" className="mr-2" />
          <span className="text-md">Remember for 30 days</span>
        </div>
        <span className="font-bold text-md">Forgot password</span>
      </div>
      
      
      <div className="text-center text-gray-400">
      Dont'have an account?

<Link to='/signup'><button><span className="font-bold text-black">Sign up for free</span></button></Link>

      </div>
    </div>
    <div className="relative">
      <img
        src={image}
        alt="img"
        className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
      />
      <div
        className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
      >
        <span className="text-white text-xl"
          >We've been uesing Untitle to kick"<br />start every new project
          and can't <br />imagine working without it."
        </span>
      </div>
    </div>
  </div>
</div>

</Layout>
  )
}

export default Login
