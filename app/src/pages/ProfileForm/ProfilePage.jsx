import React,{useRef,useContext} from 'react'
import AuthContext from '../../context/AuthContext'

const ProfilePage = () => {
const newPasswordInputRef = useRef()
const authCtx= useContext(AuthContext)

const submitHandler = event =>{
    event.preventDefault()
    const enteredNewPassword = newPasswordInputRef.current.value
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCu4Vie0NPdD0QgRTtXH5mmQHAvBlsxf0s',
    {
        method:'POST',
        body: JSON.stringify({
            idToken:authCtx.token,
          password:enteredNewPassword,
          returnSecureToken:false
        }),
        headers:{
            'Content-Type':'application/json'
        }
    })

}
    return (
  <form action="" className='p-[20%] '>
    <div className=' grid grid-cols-1 gap-2 bg-blue-600'>
        <label htmlFor="">New Password</label>
        <input type='text' className=' bg-blue-200'/>

    </div>
    <div className=''>
        <button>Change Password</button>
    </div>
  </form>
    )
}

export default ProfilePage
