import React, { createContext, useState } from 'react'

export const SocketContext = createContext()


export const UiProvider = ({ children }) => {
    // METODO PARA OCULTAR MENU sea "true" o "false"

    const [ocultarMenu, setOcultarMenu] = useState(true)

    const showMenu = () => {
        setOcultarMenu(false)
    }

    const hideMenu = () => {
        setOcultarMenu(true)
    }


    return (

        <SocketContext.Provider value={{ ocultarMenu, showMenu, hideMenu }}>
            {children}
        </SocketContext.Provider>
    )
}
