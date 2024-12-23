import React, { useState } from 'react'
import './LogAndRegister.css'
import { RxCross1 } from "react-icons/rx";
import { Context } from '../../Context/Context';
import { useContext } from 'react';
import axios from 'axios'
import { RxReload } from "react-icons/rx";
import { toast } from 'react-toastify'

function LogAndRegister() {
    const { setDisplayLogin, setIsLogIn, url } = useContext(Context)
    const [auth, setAuth] = useState(true)
    const [formData, setFormData] = useState({})
    const [loginLoader, setLoginLoader] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoginLoader(true)
        let newUrl;
        if (auth) {
            newUrl = url + "/api/auth/login"
        }
        else {
            newUrl = url + "/api/auth/register"
        }

        let result = await axios.post(newUrl, {
            body: formData
        })

        if (result.data.success) {
            localStorage.setItem("token", result.data.token)
            setIsLogIn(true)
            setDisplayLogin(false)
            toast.success(result.data.message.toUpperCase())
        }

        if (!result.data.success) {
            setFormData({
                username: "",
                email: "",
                password: ""
            })

            toast.error(result.data.message.toUpperCase())
        }
        setLoginLoader(false)
    }

    function handleChange(event) {
        let name = event.target.name
        let value = event.target.value
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <div className='log-and-register'>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                    <div className='heading'>
                        <h2>{auth ? "Login" : "Register"}</h2>
                        <RxCross1 className='cancel-icon' onClick={() => setDisplayLogin(false)} />
                    </div>
                    {
                        !auth &&
                        <div className="username">
                            <input onChange={handleChange} value={formData.username} type="text" name='username' placeholder='Enter your usename' required />
                        </div>
                    }
                    <div className="email">
                        <input onChange={handleChange} value={formData.email} type="email" name='email' placeholder="Enter your email" required />
                    </div>
                    <div className="password">
                        <input onChange={handleChange} value={formData.password} type="password" name='password' placeholder="Enter your password" required />
                    </div>
                    <div className={`button ${loginLoader && 'active'}`}>
                        <button type='submit' name='submit'><RxReload className={`load-login ${loginLoader && 'active'}`} /> {auth ? "Login" : "Register"}</button>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" name='check' required />
                        <p>By continuing, I agree to the term of use and privacy policy.</p>
                    </div>
                    <p className='account'>{auth ? "Create a new account?" : "Already have an account?"} <span onClick={() => setAuth(prev => !prev)}>Click here</span></p>
                </form>
            </div>
        </div>
    )
}

export default LogAndRegister