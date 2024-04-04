import React, { useState } from 'react'
import  Context  from './Context'
const State = (props) => {
const [mode,setMode]= useState('light')
const [loading,setLoading]= useState(false)

const toggleMode = () => {
  if(mode === 'light'){
    setMode('dark')
    document.body.style.backgroundColor =  "rgb(46,46,46)"
  }
  else{
    setMode('light')
    document.body.style.backgroundColor = "white"
  }
}

 return (
<Context.Provider value={{mode,toggleMode,loading,setLoading}}>
{props.children}
</Context.Provider>
  )
}

export default State
