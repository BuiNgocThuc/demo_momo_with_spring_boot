import { Outlet } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Toaster } from '@components/ui/toaster'
import { Toaster as Sonner } from '@components/ui/sonner'
const PrivateRoute = () => {
  return (
    <>
      <Outlet />
      <Toaster />
      <Sonner
        richColors
        theme="light"
        toastOptions={{}}
        closeButton
        visibleToasts={4}
      />
    </>
  )
}

export default PrivateRoute

export const loader = () => {
  // const cookie = new Cookies(null, { path: '/' })
  // if (!cookie.get('accessToken')) {
  //   return redirect('/login')
  // }
  return null
}
