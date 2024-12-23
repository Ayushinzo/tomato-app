import React from 'react'
import './MobileApp.css'
import playstore_image from '../../assets/play_store.png'
import app_store from '../../assets/app_store.png'

function MobileApp() {
  return (
    <div className='mobile-app'>
      <div className="mobile-display">
        <h1>For better experience, download<br />Tomato app</h1>
        <div className="app-download-platforms">
            <a href=""><img src={playstore_image} alt="playstore-image" /></a>
            <a href=""><img src={app_store} alt="appstore-image" /></a>
        </div>
      </div>
    </div>
  )
}

export default MobileApp