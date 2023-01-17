import React, { createContext } from 'react'
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext()  // UTILIZA

export const SocketProvider = ({ children }) => {

    // Cusstom Hook
    // Conectandome al servidor del back en HEROKU
    // const { socket, online } = useSocket('https://reac-tickets-server.herokuapp.com/')
    const { socket, online } = useSocket('http://localhost:8080/')

    return (

        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>

    )

}