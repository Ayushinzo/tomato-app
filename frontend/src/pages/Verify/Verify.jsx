import React, { useContext, useEffect } from 'react'
import './Verify.css'
import axios from 'axios'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Context } from '../../Context/Context'
import { toast } from 'react-toastify'

function Verify() {
    const { url } = useContext(Context)
    const [searchParams, setSearchParams] = useSearchParams()
    let navigate = useNavigate()
    let success = searchParams.get("success")
    let orderId = searchParams.get("orderId")
    if (success === "true") {
        success = true
    }
    else {
        success = false
    }

    async function redirectUser() {
        let response = await axios.post(`${url}/api/order/verify`, {
            success,
            orderId
        })

        if (response.data.success) {
            toast.success(response.data.message.toUpperCase())

            navigate('/my-order')
        }
        else {
            toast.error(response.data.message.toUpperCase())
            navigate('/')
        }
    }

    useEffect(() => {
        redirectUser()
    }, [])

    return (
        <div className='verify'>
            <div class="loader"></div>
        </div>
    )
}

export default Verify