import React, { memo, useContext, useEffect, useState } from 'react'
import './CartTotal.css'
import { Context } from '../../Context/Context.jsx'
import { Link } from 'react-router-dom'

function CartTotal() {
  const { getTotal, cartItems } = useContext(Context)
  const [total, setTotal] = useState()

  useEffect(() => {
    setTotal(getTotal())
  }, [total, cartItems])
  return (
    <div className='cart-total-container'>
      <div className='cart-total'>
        <h2>Cart total</h2>
        <div className="total-display">
          <div>
            <p>Subtotal : </p>
            <p>₹{total}</p>
          </div>
          <hr className='hr' />
          <div>
            <p>Tax(6%) : </p>
            <p>₹{Math.round(((6 / 100) * total))}</p>
          </div>
          <hr className='hr' />
          <div>
            <p>Shipping : </p>
            <p>₹{total == 0 ? 0 : 6}</p>
          </div>
          <hr className='hr' />
          <div>
            <b><p>Total : </p></b>
            <b><p>₹{total == 0 ? 0 : total + Math.round(((6 / 100) * total)) + 6}</p></b>
          </div>
          <hr className='hr' />
          <Link exact="true" to='/cart/order'><button>Proceed to checkout</button></Link>
        </div>
      </div>
    </div>
  )
}

export default memo(CartTotal)