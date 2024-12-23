import React from 'react'
import './Navbar.css'
import profile from '/profile_image.jpg'
import { IoSearch } from "react-icons/io5";

function Navbar() {
  return (
    <div className='navbar'>
      <header>
        <div className="search">
          <input type="search" name='search' placeholder='Search here' />
          <IoSearch className='search-icon'/>
        </div>
        <div className="profile">
          <img src={profile} alt="profile" />
        </div>
      </header>
    </div>
  )
}

export default Navbar