import React from 'react'
import './Cart.css'
import CartList from '../../components/CartList/CartList'
import CartTotal from '../../components/CartTotal/CartTotal'

function Cart() {
  return (
    <div className='cart'>
      <h1>Cart Items</h1>
      <div className="container">
        <CartList />
        <CartTotal/>
      </div>
    </div>
  )
}

export default Cart
