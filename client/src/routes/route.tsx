import DefaultLayout from '@/components/layouts/DefaultLayout'
import PrivateLayout, {
  loader as PrivateLoader,
} from '@/components/layouts/PrivateLayout'
import { createBrowserRouter } from 'react-router-dom'

//Home Page
import Home from '@pages/home'

//User Page
import Bill from '@user/bill'

//Error page
import NotFound from '@pages/404'
import MomoPaymentSuccess from '@/pages/notify-payment/MomoPaymentSuccess'

export const route = createBrowserRouter([
  {
    path: '/',
    element: <PrivateLayout />,
    loader: PrivateLoader,
    errorElement: <NotFound />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: '/bills',
            element: <Bill />,
            children: [
              {
                path: ':id',
                element: <Bill />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/payment',
    element: <MomoPaymentSuccess />,
  },

  {
    path: '*',
    element: <NotFound />,
  },
])
