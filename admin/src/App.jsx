import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Navbar from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import AddItem from './pages/AddItem/AddItem'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListItems from './pages/ListItems/ListItems'
import FeedBack from './pages/FeedBack/FeedBack'
import Orders from './pages/Orders/Orders'
import Website from './pages/Website/Website'
import Home from './pages/Home/Home'

function App() {
  return (
    <>
      <ToastContainer position='top-center' theme='dark' autoClose={3000} />
      <div className='admin'>
        <Sidebar />
        <div className='hero'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/item/add' element={<AddItem />} />
            <Route path='/item/list-items' element={<ListItems />} />
            <Route path='/feedback' element={<FeedBack />} />
            <Route path='/order' element={<Orders />} />
            <Route path='/website' element={<Website />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App