import React from 'react'
import './FoodOrder.css'
import { memo } from 'react'

function FoodOrder({image, name, qty, price}) {
    return (
        <div className='food-order'>
            <div className='order'>
                <div className="image">
                    <img src={`http://localhost:4000/${image}`} alt="Ice cream" />
                    <p>{name}</p>
                </div>
                <p>× {qty}</p>
                <p>₹{price * qty}</p>
            </div>
        </div>
    )
}

export default memo(FoodOrder)