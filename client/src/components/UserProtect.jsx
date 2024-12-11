import React, { useEffect } from 'react'
import {  useNavigate } from "react-router-dom";


 function UserProtect(props) {
  const {Component}=props
  const navigate=useNavigate()
  useEffect(()=>{
    let login=localStorage.getItem('logindata')
    if(!login){
      navigate('/subscription')
    }

  },[])
  return (
    <div><Component/></div>
  )
}

export default UserProtect






