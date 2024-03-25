import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import { OrderCard } from '../OrderCard'
import './Style.css'



const CheckoutSideMenu = () => {
  const {
    closeCheckoutSideMenu,
    isCheckoutSideMenu,
    productToShow,
    cartProducts,
    setCartProducts,
    order, 
    setOrder,
    setSearchByTitle
  } = useContext(ShoppingCartContext)

  const values = cartProducts.map(product => product.price)
  const total = values.reduce((acc, num) => acc + num, 0)

  const handleDelete = (id) => {
    const filteresProducts = cartProducts.filter(product => product.id != id)
    setCartProducts(filteresProducts)
  }
  const hanfleCheckout = () => {
    const orderToAdd = {
      date: '01.02.2024',
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: total
    }
    setOrder([...order, orderToAdd])
    setCartProducts([])
    setSearchByTitle(null)
  }

  const visualise = isCheckoutSideMenu  ? 'flex' : 'hidden'

  return(
    <aside 
    className={`${visualise} checkout-side-menu flex flex-col fixed right-0 border border-black rounded-lg bg-white`} >
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>My Order</h2> 
        <div>
          <XMarkIcon 
          className='w-6 h-6 text-black cursor-pointer'
          onClick={() => closeCheckoutSideMenu()}
          />  
        </div>
      </div>
      <div className='px-6 overflow-y-auto flex-1'> 
        {
          cartProducts.map(product => {
            return(

              <OrderCard 
                key= {product.id}  
                id= {product.id}                   
                title ={product.title}
                imageURL = {product.images}
                price = {product.price}
                handleDelete={handleDelete}
                />
            )
          })
        }
      </div>
      <div className='px-6 mb-6'>
        <p className='flex justify-between items-center mb-2'>
          <samp className='font-light '>Total</samp>
          <samp className='font-medium text-2xl'>$ {total.toFixed(0)}</samp>
        </p>
        <Link to='/my-orders/last'>
        <button className='w-full bg-black p-2 text-white rounded-md' onClick={() => {hanfleCheckout(), setSearchByTitle(null), closeCheckoutSideMenu()} }>Checkout</button>
        </Link>
      </div>
    </aside>
  )
}

export { CheckoutSideMenu }