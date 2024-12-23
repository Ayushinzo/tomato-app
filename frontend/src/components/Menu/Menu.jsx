import React, { useContext } from 'react'
import './Menu.css'
import { menu_list } from '../../assets/assets.js'
import { Context } from '../../Context/Context.jsx'

function Menu() {
    const { setCategory, category } = useContext(Context)

    return (
        <>
            <div className='menu' id='menu'>
                <h2>Explore our menu</h2>
                <p>Choose from a diverse menu featuring a detectable array of dishes. Our mission is to satisfy your craving and elevate your dining experence, one delecious meal at a time.</p>
                <div className="menu-item-container">
                    {
                        menu_list.map((item, index) => {
                            return (
                                <div className={`menu-item ${item.menu_name == category ? 'active' : null}`} key={index} onClick={() => setCategory(prev => item.menu_name == prev ? "All" : item.menu_name)}>
                                    <div className="image">
                                        <img src={item.menu_image} alt={item.menu_name} />
                                    </div>
                                    <p>{item.menu_name}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <hr className='hr menu-hr'/>
        </>
    )
}

export default Menu;