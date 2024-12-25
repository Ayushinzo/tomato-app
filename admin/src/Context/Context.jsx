import { createContext } from "react"

export let Context = createContext(null)

function ContextFunction({ children }) {

    let url = "https://tomato-app-nrcm.onrender.com"

    let contextValue = {
        url
    }
    
    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}

export default ContextFunction
