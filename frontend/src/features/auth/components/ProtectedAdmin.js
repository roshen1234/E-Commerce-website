import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../user/userSlice'
import { selectLoggedInUser } from '../authSlice'
const ProtectedAdmin = ({children}) => {
    const userinfo=useSelector(selectUserInfo)
    const user=useSelector(selectLoggedInUser)
  if(!user)
  {
    return <Navigate to={'/login'} replace={true}></Navigate>
  }
  if(!user && userinfo.role==='admin')
  {
    return <Navigate to={"/"} replace={true}></Navigate>
  }
  return children;
}

export default ProtectedAdmin
