import React, { useContext, useEffect, useState } from 'react'
import './MyOrder.css'
import { FaLocationDot } from "react-icons/fa6";
import { IoIosRadioButtonOn } from "react-icons/io";
import { Context } from '../../Context/Context'
import axios from 'axios';

function MyOrder() {
  const { url } = useContext(Context)
  const [fetchOrder, setFetchOrder] = useState([])

  async function fetchOrders() {
    let response = await axios.post(`${url}/api/order/fetch-orders`, {}, { headers: { token: localStorage.getItem("token") } })

    setFetchOrder(response.data.data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className='my-order'>
      <div className="p">
        <h1>My Orders</h1>
        {fetchOrder == null ? <div>No order found</div> :
          fetchOrder.map((item, index) => (
            <div key={index} className="orders">
              <div className="order-top">
                <p>ID: {item._id}</p>
                <div>
                  <p><IoIosRadioButtonOn className={`radio-icon ${item.status == "Order Accepted" && 'active'}`} /><span>{item.status}</span></p>
                  {
                    item.status == "Order Accepted" &&
                    <button><FaLocationDot /><span>Track</span></button>
                  }
                </div>
              </div>
              <div className="order-items-container">
                {
                  item.items.map((order, index) => (
                    <div key={index} className="order-item">
                      <div className="image">
                        <img src={`${url}/${order.filename}`} alt={order.name} />
                      </div>
                      <div className='order-desc'>
                        <div className="content">
                          <p>{order.name}</p>
                          <p>QTY: {order.quantity}</p>
                          <p>Price: ₹{order.price}</p>
                        </div>
                        <div className="total-price">
                          <p>Total Price: ₹{order.quantity * order.price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className="order-amount">
                <p>Amount: ₹{item.amount}</p>
              </div>
              <p className='deliver-date'>Order will be delivered till: 17/04/2004</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyOrder
