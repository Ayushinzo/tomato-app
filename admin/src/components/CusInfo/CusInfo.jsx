import React from 'react'
import './CusInfo.css'
import { LuUserRound } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { memo } from 'react';

function CusInfo({firstName, lastName, street, number, city, state, zipCode}) {
  return (
    <div className="cus-info">
      <div>
        <p><LuUserRound className='icon' /></p>
        <p>{firstName + " " + lastName}</p>
      </div>
      <div>
        <p><FaLocationDot className='icon' /></p>
        <p>{`${street}, ${city}, ${zipCode}`}</p>
      </div>
      <div>
        <p><MdCall className='icon' /></p>
        <p>{number}</p>
      </div>
    </div>
  )
}

export default memo(CusInfo)