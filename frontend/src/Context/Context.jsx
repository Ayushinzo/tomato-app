import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'

export const Context = createContext(null)

function ReactContext({ children }) {
    const [category, setCategory] = useState('All')

    const [cartItems, setCartItems] = useState({})

    const [displayLogin, setDisplayLogin] = useState(false)

    const [isLogIn, setIsLogIn] = useState(false)

    const [displayFoods, setDisplayFoods] = useState([])

    let url = 'https://tomato-app-nrcm.onrender.com'

    async function fetchFoods() {
        let res = await axios.get(`${url}/api/food/get`)

        if (res.data.success) {
            setDisplayFoods(res.data.data)
        }
    }

    useEffect(() => {
        fetchFoods()
    }, [])

    function addItem(itemId) {
        if (isLogIn) {
            if (!cartItems[itemId]) {
                setCartItems(prev => ({ ...prev, [itemId]: 1 }))
            }
            else {
                setCartItems(prev => ({ ...prev, [itemId]: cartItems[itemId] + 1 }))
            }
        }
        else {
            toast.info("Please, login first")
        }
    }

    function removeItem(itemId) {
        if (cartItems[itemId] >= 1) {
            setCartItems(prev => ({ ...prev, [itemId]: cartItems[itemId] - 1 }))
        }
    }

    function getProductTotal(itemId) {
        let item = displayFoods.find(item => item._id == itemId)
        return item.price * cartItems[itemId]
    }

    function getTotal() {
        let total = 0
        for (const key in cartItems) {
            total = total + getProductTotal(key)
        }

        return total
    }

    function getToken() {
        let token = localStorage.getItem("token")
        if (token) {
            return token
        }
    }

    function count() {
        let count = 0
        for (const key in cartItems) {
            if (!cartItems[key] == 0) {
                count += 1
            }
        }
        return count
    }

    const ContextValue = {
        setCategory,
        category,
        addItem,
        removeItem,
        cartItems,
        setCartItems,
        getProductTotal,
        getTotal,
        displayLogin,
        setDisplayLogin,
        isLogIn,
        getToken,
        setIsLogIn,
        displayFoods,
        count,
        url
    }

    return (
        <Context.Provider value={ContextValue}>
            {children}
        </Context.Provider>
    )
}

export default ReactContext
