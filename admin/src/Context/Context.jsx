import { createContext } from "react"

export let Context = createContext(null)

function ContextFunction({ children }) {

    let url = "http://localhost:4000"

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