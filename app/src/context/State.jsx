import React, { useState } from 'react'
import  Context  from './Context'
const State = (props) => {
const [mode,setMode]= useState('light')
const [loading,setLoading]= useState(false)



    return (
<Context.Provider value={{mode}}>
{props.children}
</Context.Provider>
  )
}

export default State
