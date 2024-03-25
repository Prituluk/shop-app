import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Layout } from '../../Components/Layout'
import { OrdersCard } from '../../Components/OrdersCard'
import { ShoppingCartContext } from '../../Context'

function MyOrders() {
  const {
    order,
  } = useContext(ShoppingCartContext)
  return (
    <Layout>
      <div className='flex items-center justify-center w-80 mb-4 relative'>
        <h1 className='font-medium text-xl'>MyOrders</h1>
      </div>
        {
          order.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard 
                totalPrice = {order.totalPrice}
                totalProducts = {order.totalProducts}
              />
            </Link>
          ))
        }
        
    </Layout>
  )
}

export { MyOrders }