import Cookie from "cookie-universal"
import { auth } from '../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { React,useState,useContext} from "react";
import image from '../../assest/image2.jpeg'
import Layout from '../../component/layout/Layout'
import { Link, useNavigate, useLocation } from "react-router-dom";
function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]= useState("")
  const navigate = useNavigate()
  const handleSubmit = async ()=>{
  const cookies = Cookie()

    setLoading(true)
    if(email===""||password===""){
      return error("all fields required")
    }
    try{
      const result = await signInWithEmailAndPassword(auth, email, password)
      cookies.set("e-commerce", JSON.stringify(result))   
      navigate("/")
    setEmail("")
    setPassword("")
    setLoading(false)
  }catch(err){
    console.log(err)
    setLoading(false)
    }
  }

return (
  <Layout>
<div>
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        {/* <!-- left side --> */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcom back! Please enter your details
          </span>
          <form action=""  > 
          <div className="py-4">
            <span className="mb-2 text-md">Email</span>
            <input
           
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="py-4">
            <span className="mb-2 text-md">Password</span>
            <input
              type="password"
              name="password"
              id="pass"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
           
 />
          </div>

          <div className="flex justify-between w-full py-4 px-2">
            <div className=" mr-24">
              <input type="checkbox" name="ch" id="ch" className="mr-2" />
              <span className="text-md">Remember for 30 days</span>
            </div>
            
          </div>
       { !loading&&      
         <button
            className="w-full
             bg-black text-white p-2
             rounded-lg mb-6
              hover:bg-white
               hover:text-black 
               hover:border-gray-300"
          onClick={handleSubmit}
         >
            Signup
          </button>
        }
        {!!loading &&  <button
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

            className="w-full border
             border-gray-300 text-md
              p-2 rounded-lg mb-6
               hover:bg-black
             hover:text-white"
          >
            <img src={image} alt="img" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
          </form>
          <div className="text-center text-gray-400">
                already have an account?
          <Link to='/login'><button><span className="font-bold text-black">Login</span></button></Link>
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
    </div>
    </Layout>
)
}

export default Login




