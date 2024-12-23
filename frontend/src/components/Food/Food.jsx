import React, { useContext } from 'react'
import './Food.css'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import { IoIosRemove } from "react-icons/io";
import { Context } from '../../Context/Context';

function Food({ id, name, image, price, description, index }) {
  const { addItem, cartItems, removeItem, url } = useContext(Context)

  return (
    <div className='food' key={index}>
      <div className="image">
        <img src={`${url}/` + image} alt={name} />
        <div className="add">
          {
            !cartItems[id] >= 1 ? <IoAdd className='add-item' onClick={() => addItem(id)} /> :
              <div className="add-sub">
                <IoIosRemove className='bar-icon' onClick={() => removeItem(id)} />
                <span>{cartItems[id]}</span>
                <IoAdd className='bar-icon' onClick={() => addItem(id)} />
              </div>
          }
        </div>
      </div>
      <div className="content">
        <div>
          <p>{name}</p>
          <div className="rating">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
        </div>
        <p className='desc'>{description}</p>
        <p className='price'>₹{price}</p>
      </div>
    </div>
  )
}

export default Food