import React, { useState } from 'react'
import './Menu.css'
import { Link } from 'react-router-dom'
import { IoMdArrowDropdown } from "react-icons/io";

function Menu() {
  const [drop1, setDrop1] = useState(false)

  return (
    <div className='menu'>
      <ul>
        <li><p onClick={() => setDrop1(prev => !prev)}>Items <IoMdArrowDropdown className='down-icon' /></p>
          <div className={`dropdown1 ${drop1 && 'active'}`}>
            <ul>
              <li><Link exact="true" to='item/add'>Add</Link></li>
              <li><Link exact="true" to='item/list-items'>List</Link></li>
            </ul>
          </div>
        </li>
        <li><Link exact="true" to='/order'>Orders</Link></li>
        <li><Link exact="true" to='/feedback'>Feedback</Link></li>
        <li><Link exact="true" to='/website'>Website</Link></li>
      </ul>
    </div>
  )
}

export default Menu