import React, { useContext, useEffect, useState } from 'react'
import './FeedBack.css'
import FeedbackLists from '../../components/FeedbackLists/FeedbackLists';
import axios from 'axios'
import { toast } from 'react-toastify'
import { Context } from '../../Context/Context.jsx';

const LIMIT = 7
function FeedBack() {
  const { url } = useContext(Context)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [totalFeedback, setTotalFeedback] = useState(0)
  const [searchFeed, setSearchFeed] = useState("")

  async function fetchFeedback() {
    let response = await axios.post(`${url}/api/contact/get-feedback`, {
      page: page,
      limit: LIMIT
    })

    if (response.data.success) {
      setData(response.data.data)
      setPage(page + 1)
      setTotalFeedback(response.data.total)
    }
  }

  async function fetchMore() {
    let response = await axios.post(`${url}/api/contact/get-feedback`, {
      page: page,
      limit: LIMIT
    })

    if (response.data.success) {
      setData(data.concat(response.data.data))
      console.log(response.data.total, data.length)
      setPage(page + 1)
    }
  }

  async function deleteFeedback(_id, name) {
    let sure = confirm("Do you really want to delete the feedback of " + name)
    if (sure) {
      let res = await axios.post(`${url}/api/contact/delete`, {
        id: _id
      })

      if (res.data.success) {
        toast.success("FEEDBACK DELETED SUCCESSFULLY")
      }
    }
  }

  function onChangeSearch(e) {
    setSearchFeed(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      let response = await axios.post(`${url}/api/contact/searchFeedback`, {
        email: searchFeed
      })

      if (response.data.success) {
        setData(response.data.data)
        setTotalFeedback(response.data.data.length)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchFeedback()
  }, [])

  return (
    <div className='feedback'>
      <h1>Feedback</h1>
      <hr className='feedback-hr' />
      <div className="search">
        <p>{totalFeedback} feedbacks</p>
        <form onSubmit={handleSubmit} method="post">
          <div className="search-input">
            <input onChange={onChangeSearch} value={searchFeed} type="email" required name='search' placeholder='Search by email' />
            <button className='search-icon'>Search</button>
          </div>
        </form>
      </div>
      <hr className='feedback-hr' />
      <FeedbackLists totalFeedback={totalFeedback} data={data} fetchMore={fetchMore} deleteFeedback={deleteFeedback} />
    </div>
  )
}

export default FeedBack