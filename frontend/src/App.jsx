import React, { useContext } from "react"
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx"
import Home from "./pages/Home/Home.jsx"
import Cart from './pages/Cart/Cart.jsx'
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx"
import MobileApp from "./pages/MobileApp/MobileApp.jsx"
import Contact from "./pages/Contact/Contact.jsx"
import Order from "./pages/Order/Order.jsx"
import LogAndRegister from "./components/LogAndRagister/LogAndRegister.jsx"
import { Context } from "./Context/Context.jsx"
import Verify from "./pages/Verify/Verify.jsx"
import MyOrder from "./pages/MyOrder/MyOrder.jsx"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { displayLogin } = useContext(Context)
  return (
    <>
    <ToastContainer autoClose= {3000} theme="dark" position="top-center"/>
      <div className="food-app">
        <div className="sub-food-app">
          <Navbar />
          {displayLogin && <LogAndRegister />}
          <div className="hero">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/mobile-app" element={<MobileApp />} />
              <Route path="/feedback" element={<Contact />} />
              <Route path="/cart/order" element={<Order />} />
              <Route path="/pages/verify" element={<Verify />} />
              <Route path="/my-order" element={<MyOrder />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App