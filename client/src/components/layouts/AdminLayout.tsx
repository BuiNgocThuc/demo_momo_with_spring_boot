import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const { user, accessToken } = useSelector((state: any) => state.authReducer)
	console.log(user, accessToken)

  return <Outlet />
}

export default AdminLayout
