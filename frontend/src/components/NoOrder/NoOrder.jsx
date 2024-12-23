import React from 'react'
import './NoOrder.css'
import { Link } from "react-router-dom";
import { memo } from 'react';
import { IoArrowBackSharp } from "react-icons/io5";

function NoOrder() {
    return (
        <div className='no-order'>
            <h2>No Order placed yet</h2>
            <p>
                <Link exact="true" to={'/'}><IoArrowBackSharp className='go-back'/> Go To Home</Link>
            </p>
        </div>
    )
}

export default memo(NoOrder);