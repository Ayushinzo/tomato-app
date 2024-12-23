import React, { useContext, useEffect, useState } from 'react'
import './OrderCartTotal.css'
import { Context } from '../../Context/Context.jsx'
import { Link } from 'react-router-dom'
import { memo } from 'react'

function OrderCartTotal({ placeOrder }) {
  const { getTotal, cartItems } = useContext(Context)
  const [totals, setTotals] = useState()
  useEffect(() => {
    setTotals(getTotal())
  }, [totals, cartItems])

  return (
    <div className='order-cart-total'>
      <div className='cart-total'>
        <h2>Cart total</h2>
        <div className="total-display">
          <div>
            <p>Subtotal : </p>
            <p>₹{totals}</p>
          </div>
          <hr className='hr' />
          <div>
            <p>Tax(6%) : </p>
            <p>₹{Math.round(((6 / 100) * totals))}</p>
          </div>
          <hr className='hr' />
          <div>
            <p>Shipping : </p>
            <p>₹{totals == 0 ? 0 : 6}</p>
          </div>
          <hr className='hr' />
          <div>
            <b><p>Total : </p></b>
            <b><p>₹{totals == 0 ? 0 : totals + Math.round(((6 / 100) * totals)) + 6}</p></b>
          </div>
          <hr className='hr' />
          <Link exact="true" to='/cart/order'><button onClick={placeOrder}>Proceed to pay ₹{totals == 0 ? 0 : totals + Math.round(((6 / 100) * totals)) + 6}</button></Link>
        </div>
      </div>
    </div>
  )
}

export default memo(OrderCartTotal);
