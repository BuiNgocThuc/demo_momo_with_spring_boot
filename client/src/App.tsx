import { RouterProvider } from 'react-router-dom'
import { route } from './routes/route'
import 'react-day-picker/dist/style.css';
function App() {
  return <RouterProvider router={route} />
}

export default App
