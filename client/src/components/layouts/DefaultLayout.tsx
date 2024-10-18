import { Outlet } from 'react-router-dom'
import Header from './includes/Header'

const DefaultLayout = () => {
  return (
    <div className="w-full min-h-screen flex md:flex-row flex-col">
      <Header />
      <main className={`w-full min-h-screen relative overflow-hidden`}>
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout
