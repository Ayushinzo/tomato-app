import React from 'react'
import './CusOrders.css'
import { memo } from 'react'
import FoodOrder from '../FoodOrder/FoodOrder'

function CusOrders({ cusOrder }) {
  
  return (
    <div className="cus-order-container">
      {
        cusOrder.map((item) => (
          <FoodOrder image={item.filename} name={item.name} qty={item.quantity} price={item.price} />
        ))
      }
    </div>
  )
}

export default memo(CusOrders)