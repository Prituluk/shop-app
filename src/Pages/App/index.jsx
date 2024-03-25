
import { useRoutes, BrowserRouter } from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context'
import { Home } from '../Home'
import { MyAccount } from '../MyAccount'
import { MyOrder } from '../MyOrder'
import { MyOrders } from '../MyOrders'
import { SignIn } from '../SignIn'
import { Clothes } from '../Clothes'
import { NotFound } from '../NotFound'
import { Nabvar } from '../../Components/Navbar'
import { CheckoutSideMenu } from '../../Components/ChekoutSideMenu'

import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home/>},
    {path: '/my-account', element: <MyAccount/>},
    {path: '/my-order', element: <MyOrder/>},
    {path: '/my-orders', element: <MyOrders/>},
    {path: '/my-orders/last', element: <MyOrder/>},
    {path: '/my-orders/:id', element: <MyOrder/>},
    {path: '/sign-in', element: <SignIn/>},
    {path: '/clothes', element: <Home/>},
    {path: '/electronics', element: <Home/>},
    {path: '/fornitures', element: <Home/>},
    {path: '/toys', element: <Home/>},
    {path: '/others', element: <Home/>},
    {path: '/*', element: <NotFound/>}
  ])
  return routes
}

const App = () => {
  return (
    <>
      <ShoppingCartProvider>
        <BrowserRouter>
          <AppRoutes/>
          <Nabvar/>
          <CheckoutSideMenu/>
        </BrowserRouter>
      </ShoppingCartProvider>
    </>
  )
}

export default App
