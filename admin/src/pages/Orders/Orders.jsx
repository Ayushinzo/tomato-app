import React, { useContext, useEffect, useState } from 'react'
import './Orders.css'
import CusInfo from '../../components/CusInfo/CusInfo';
import CusOrders from '../../components/CusOrders/CusOrders';
import axios from 'axios';
import { toast } from 'react-toastify'
import { PiMapPinArea } from "react-icons/pi";
import { Context } from '../../Context/Context';

function Orders() {
    const { url } = useContext(Context)
    const [orders, setOrders] = useState([])

    async function fetchOrder() {
        let orders = await axios.get(`${url}/api/order/get-order`)

        if (orders.data.success) {
            setOrders(orders.data.data)
        }
        else {
            console.log(orders.data)
        }
    }

    async function changeStatus(itemId, status) {
        if (status != "Order Accepted") {
            let res = await axios.post(`${url}/api/order/accept`, {
                id: itemId
            })

            if (res.data.success) {
                toast.success("Order accepted")
            }
        }
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    function set() {
        console.log(orders)
    }
    return (
        <div className='orders'>
            <h1>Orders</h1>
            <hr className='order-hr' />
            <div className="count">
                <p>{orders.length} Orders</p>
            </div>
            <hr className='order-hr' />
            <div className="order-container">
                {
                    orders.map((item, index) => {
                        if (item.payment) {
                            return (
                                <div key={index} className="cus-order">
                                    <CusInfo
                                        firstName={item.address.firstName}
                                        lastName={item.address.lastName}
                                        street={item.address.street}
                                        city={item.address.city}
                                        state={item.address.state}
                                        zipCode={item.address.zipCode}
                                        number={item.address.number}
                                    />
                                    <CusOrders cusOrder={item.items} />
                                    <hr className='hr order-hr' />
                                    <div className="total-price">
                                        <h2>₹{item?.amount}</h2>
                                    </div>
                                    <p className={`btn ${item.status == "Order Accepted" && 'active'}`}>
                                        <p onClick={set}>Date: {new Date(item.date).toLocaleDateString()}</p>
                                        <button onClick={() => changeStatus(item._id, item.status)}>{item.status == "Order Accepted" && <PiMapPinArea className='track-icon' />}{item.status == "Being proceed" ? "Accept order" : "Track"}</button>
                                    </p>
                                </div>
                            )
                        }
                    })


                }
            </div>
        </div>
    )
}

export default Orders