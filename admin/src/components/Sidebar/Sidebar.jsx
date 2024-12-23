import React, { useState } from 'react'
import './Sidebar.css'
import logo from '../../assets/logo.png'
import Menu from '../Menu/Menu'
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";

function Sidebar() {
  const [sideBar, setSideBar] = useState(false)
  return (
    <div className={`side-bar ${sideBar && 'active'}`}>
      {
        sideBar ? <RxCross1 className='cancel-icon' onClick={() => setSideBar(prev => !prev)} /> :
          <AiOutlineMenu className='cancel-icon' onClick={() => setSideBar(prev => !prev)} />
      }
      <div className="image">
        <Link exact="true" to='/'>
          <img src={logo} alt="Logo" />
        </Link>
        <p>Admin Panel</p>
      </div>
      <Menu />
    </div>
  )
}

export default Sidebar