import React, { useContext } from 'react'
import './CartList.css'
import { Context } from '../../Context/Context.jsx'
import { ImBin } from "react-icons/im";
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";

function CartList() {

  const { cartItems, getProductTotal, removeItem, displayFoods, url } = useContext(Context)

  if(Object.keys(cartItems).length == 0){
    return(
      <div className='no-cart-item'>
        <p>Cart is empty</p>
        <Link exact="true" to='/'><button><IoMdArrowBack className='back-icon'/> Go to home</button></Link>
      </div>
    )
  }

  return (
    <div className='cart-list'>
      {
        displayFoods.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index} className='cart-item'>
                <div className="image">
                  <img src={`${url}/${item.filename}`} alt={item.name} />
                </div>
                <div className="cart-content">
                  <h2>{item.name}</h2>
                  <h3>Price: ₹{item.price}</h3>
                  <p className='quantity'>Quantity: {cartItems[item._id]}</p>
                  <div className='cart-totals'>
                    Total: ₹{getProductTotal(item._id)}
                    <p onClick={() => removeItem(item._id)}><ImBin /> <span>Remove</span></p>
                  </div>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
}

export default memo(CartList);