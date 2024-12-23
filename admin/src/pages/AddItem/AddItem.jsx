import React, { useContext, useEffect, useState } from 'react'
import './AddItem.css'
import upload_image from '/upload_image.jpg'
import axios from 'axios'
import FormData from 'form-data'
import { toast } from 'react-toastify'
import { Context } from '../../Context/Context'

function AddItem() {
  const { url } = useContext(Context)
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  })

  function handleChange(e) {
    let name = e.target.name
    let value = e.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("category", data.category)
    formData.append("price", data.price)
    formData.append("image", image)

    let response = await axios.post(`${url}/api/food/insert`, formData)

    if (response.data.success) {
      toast.success("FOOD ADDED SUCCESSFULLY")
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      })
      setImage(false)
    }
    else {
      toast.error(response.data.message)
    }
  }

  return (
    <div className="fff">
      <div className='add-item'>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="image-input">
            <p>Upload Image</p>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" id='image' required />
            <label htmlFor="image"><img src={image ? URL.createObjectURL(image) : upload_image} alt="image" /></label>
            <p className='image-name'>{image.name}</p>
          </div>
          <div className="product-name same">
            <p>Product name (upto 30 letters)</p>
            <input onChange={handleChange} value={data.name} type="text" name='name' placeholder='Product' maxLength={30} required />
          </div>
          <div className="product-description same">
            <p>Product description</p>
            <textarea onChange={handleChange} value={data.description} name="description" placeholder='Description' required></textarea>
          </div>
          <div className="category-price same">
            <div className="category">
              <p>Product category</p>
              <select name="category" required onChange={handleChange}>
                <option value="Salad" selected>Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="price">
              <p>Product price</p>
              <input onChange={handleChange} value={data.price} type="number" name='price' placeholder='price' required />
            </div>
          </div>
          <div className="btn same">
            <button type='submit'>ADD FOOD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddItem