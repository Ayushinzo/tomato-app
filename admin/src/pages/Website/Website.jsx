import React from 'react'
import './Website.css'
import { memo } from 'react'
import website from '/website.png'

function Website() {
    return (
        <div className='website-container'>
            <div className="website">
                <a href="http://localhost:5173" target='_blank'>
                    <img src={website} alt="our website" />
                </a>
            </div>
        </div>
    )
}

export default memo(Website)