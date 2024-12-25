import React from 'react'
import './FoodOrder.css'
import { memo } from 'react'
import { useContext } from 'react'
import { Context } from '../../Context/Context'

function FoodOrder({ image, name, qty, price }) {
    const { url } = useContext(Context)
    return (
        <div className='food-order'>
            <div className='order'>
                <div className="image">
                    <img src={`${url}/${image}`} alt="Ice cream" />
                    <p>{name}</p>
                </div>
                <p>× {qty}</p>
                <p>₹{price * qty}</p>
            </div>
        </div>
    )
}

export default memo(FoodOrder)