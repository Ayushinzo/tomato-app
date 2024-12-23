import React, { useContext, useState } from 'react'
import './ListItems.css'
import ProductLists from '../../components/ProductLists/ProductLists'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Context } from '../../Context/Context'

function ListItems() {
  const { url } = useContext(Context)
  const [fetchList, setFetchList] = useState([])

  async function fetchFood() {
    let response = await axios.get(`${url}/api/food/get`)

    if (response.data.success) {
      setFetchList(response.data.data)
    }
  }

  async function deleteFood(itemId, name) {
    let res = confirm(`Do you really want to delete ${name}?`)

    if (res) {
      let response = await axios.post(`${url}/api/food/delete`, {
        id: itemId
      })

      if (response.data.success) {
        toast.success("ITEM DELETED SUCCESSFULLY")
        fetchFood()
      }
    }
  }

  function handleSearch(e) {
    let value = e.target.value.split(" ").join("")
    let filteredList = fetchList.filter(item => item.name.toLowerCase().split(" ").join("").includes(value.toLowerCase()))
    setFetchList(filteredList)
  }

  return (
    <div className='list-items'>
      <h1>FOOD LISTS</h1>
      <hr className='product-hr' />
      <div className="search-product">
        <span>Search:</span><input onChange={handleSearch} type="search" name='search' placeholder='Search' />
      </div>
      <ProductLists fetchFood={fetchFood} fetchList={fetchList} deleteFood={deleteFood} />
    </div>
  )
}

export default ListItems