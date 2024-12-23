import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets.js'
import './Navbar.css'
import { FaCartArrowDown } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Context } from '../../Context/Context.jsx';
import { CiLogout } from "react-icons/ci";
import { toast } from 'react-toastify'
import { RxCross1 } from "react-icons/rx";

function Navbar() {
    const { setDisplayLogin, setIsLogIn, isLogIn, count } = useContext(Context)

    const [p, setP] = useState(false)
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLogIn(true)
        }
    }, [isLogIn])

    function handleLogout() {
        localStorage.removeItem("token")
        setIsLogIn(false)
        window.location.reload()
        toast.info("USER LOGOUT")
    }

    const menuItems = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Mobile App",
            path: "/mobile-app"
        },
        {
            name: "My Order",
            path: "/my-order"
        },
        {
            name: "Feedback",
            path: "/feedback"
        }
    ]

    const { pathname } = window.location

    return (
        <div className='navbar'>
            {
                dropDown ? <RxCross1 className='menu-icon' onClick={() => setDropDown(prev => !prev)} /> : <LuMenu className='menu-icon' onClick={() => setDropDown(prev => !prev)} />
            }
            <div className="image logo-image">
                <Link exact='true' to='/'>
                    <img src={assets.logo} alt="logo" />
                </Link>
            </div>
            <ul className={dropDown && 'active'}>
                {
                    menuItems.map((item, index) => {
                        return (
                            <Link exact="true" to={item.path}><li className={pathname == item.path ? 'active' : undefined} key={index} onClick={() => setDropDown(false)}>
                                {item.name}
                            </li></Link>
                        )
                    })
                }
            </ul>
            <div className="others">
                <div className="cart">
                    <Link exact="true" to={'/cart'}><FaCartArrowDown className='cart-icon' /></Link>
                    <p>{count()}</p>
                </div>
                {
                    isLogIn ? <div className="image-container">
                        <div className="image"><img src='/default_image.jpg' onClick={() => setP(prev => !prev)} alt="default-image" /></div>
                        <div className={`logout ${!p && 'active'}`}>
                            <p onClick={handleLogout}><CiLogout className='logout-icon' />Logout</p>
                        </div>
                    </div> :
                        <button onClick={() => setDisplayLogin(true)}>Log In</button>
                }
            </div>
        </div>
    )
}

export default memo(Navbar);