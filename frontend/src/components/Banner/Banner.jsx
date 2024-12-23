import React from 'react'
import './Banner.css'
import { FaArrowRight } from "react-icons/fa";

function Banner() {

  return (
    <div className='banner'>
      <div className="content">
        <h1>Order your favourite food here</h1>
        <p>Choose from a diverse menu featuring a detectable array of dishes crafted with a finest ingredient and culinary expertise. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time.</p>
        <button>View menu <FaArrowRight className='right-arrow' /></button>
      </div>
    </div>
  )
}

export default Banner