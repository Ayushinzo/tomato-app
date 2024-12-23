import React, { useState, useContext } from 'react'
import './Order.css'
import OrderCartTotal from '../../components/OrderCartTotal/OrderCartTotal'
import { Context } from '../../Context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'

function Order() {
  const { cartItems, url, setCartItems, getTotal, displayFoods } = useContext(Context)
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  })

  function onChangeHandeler(event) {
    let name = event.target.name
    let value = event.target.value
    setAddress(prev => ({ ...prev, [name]: value }))
  }

  async function placeOrder() {
    if (!getTotal() < 1) {
      if (address.firstName != '' && address.lastName != '' & address.email != '' && address.number != '' && address.street != '' && address.city != '' && address.state != '' && address.zipCode != '' && address.country != '') {
        let orderItems = []
        displayFoods.map((item) => {
          if (cartItems[item._id] > 0) {
            let itemInfo = item
            itemInfo["quantity"] = cartItems[item._id]
            orderItems.push(itemInfo)
          }
        })

        let response = await axios.post(`${url}/api/order/place-order`, {
          token: localStorage.getItem("token"),
          items: orderItems,
          address: address,
          amount: getTotal()
        })

        if (response.data.success) {
          setCartItems({})
          setAddress({
            firstName: "",
            lastName: "",
            email: "",
            number: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: ""
          })
          window.location.replace(response.data.session_url)
        }
      }
      else {
        toast.info("Please, fill all personal details")
      }
    }
    else {
      toast.info("Please select at least one food")
    }
  }

  return (
    <div className='order'>
      <div className="delivery-info">
        <h1>Delivery Information</h1>
        <div className="info">
          <form action="" method="get">
            <div className="name">
              <input onChange={onChangeHandeler} value={address.firstName} type="text" name='firstName' placeholder='First name' required />
              <input onChange={onChangeHandeler} value={address.lastName} type="text" name='lastName' placeholder='Last name' required />
            </div>
            <div className="email-phone">
              <input onChange={onChangeHandeler} value={address.email} type="email" name='email' placeholder='Email' required />
              <input onChange={onChangeHandeler} value={address.number} type="number" name='number' placeholder='Phone no' required />
            </div>
            <div className="street">
              <input onChange={onChangeHandeler} value={address.street} type="text" name='street' placeholder='Street' required />
            </div>
            <div className="city-state">
              <input onChange={onChangeHandeler} value={address.city} type="text" name='city' placeholder='City' required />
              <input onChange={onChangeHandeler} value={address.state} type="text" name='state' placeholder='State' required />
            </div>
            <div className="code-country">
              <input onChange={onChangeHandeler} value={address.zipCode} type="number" name="zipCode" placeholder='Zip code' required />
              <input onChange={onChangeHandeler} value={address.country} type="text" name="country" placeholder='Country' required />
            </div>
          </form>
        </div>
      </div>
      <OrderCartTotal placeOrder={placeOrder} />
    </div>
  )
}

export default Order