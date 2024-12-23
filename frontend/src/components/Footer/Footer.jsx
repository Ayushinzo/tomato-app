import React from 'react'
import './Footer.css'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { memo } from 'react';

function Footer() {
  return (
    <div className='footer'>
      <div className="first">
        <h1>Tomato.</h1>
        <p>Choose from a diverse menu featuring a detectable array of dishes crafted witha finest ingredient and culinary expertise. Our mission is to satisfy your craving and elevate your dining experience, one delicious meal at a time.</p>
        <div className="links">
          <a href=""><FaInstagram /></a>
          <a href=""><FaFacebook /></a>
          <a href=""><FaTwitter /></a>
          <a href=""><FaLinkedin /></a>
        </div>
      </div>

      <div className="second">
        <h1>COMPANY</h1>
        <div>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
      </div>

      <div className="third">
        <h1>GET IN TOUCH</h1>
        <div className="contact-details">
          <p>+123456789</p>
          <p>ayushshembekar07@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default memo(Footer);