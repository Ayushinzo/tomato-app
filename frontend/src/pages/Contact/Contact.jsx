import React, { useContext, useState } from 'react'
import './Contact.css'
import contact from '../../assets/contact_us.webp'
import axios from 'axios'
import { Context } from '../../Context/Context'
import { RxReload } from "react-icons/rx";
import { toast } from 'react-toastify'

function Contact() {
  const { url } = useContext(Context)
  const [loader, setLoader] = useState(false)
  const [contactData, setContactData] = useState({
    name: "",
    description: ""
  })
  async function handleFormSubmit(e) {
    e.preventDefault()
    if (localStorage.getItem("token")) {
      if (contactData.name != '' && contactData.email != '' && contactData.description != '') {
        setLoader(true)
        let response = await axios.post(`${url}/api/contact/send`, {
          body: contactData,
          token: localStorage.getItem("token")
        })

        if (response.data.success) {
          setContactData({
            name: "",
            description: ""
          })

          toast.success("Message sent successfully")
          setLoader(false)
        }

        if (!response.data.success) {
          toast.success(response.data.message)
          setLoader(false)
        }
      }
      else {
        toast.info("You have already sent a feedback")
      }
    }
    else{
      toast.info("Please Login first")
    }
  }
  function handleContactData(event) {
    let name = event.target.name
    let value = event.target.value
    setContactData(prev => ({ ...prev, [name]: value }))
  }
  return (
    <div className='contact-container'>
      <h1>Your Feedback</h1>
      <div className="contact">
        <form action="" onSubmit={handleFormSubmit} method='get'>
          <div className="form-container">
            <input onChange={handleContactData} value={contactData.name} type="text" name='name' placeholder='Enter your name' />
            <textarea onChange={handleContactData} value={contactData.description} name="description" placeholder='Enter the description'></textarea>
            <button type='submit'><RxReload className={`load-icon ${loader && 'active'}`} /> Send message</button>
          </div>
        </form>
        <div className="image">
          <img src={contact} alt="contact" />
        </div>
      </div>
    </div>
  )
}

export default Contact