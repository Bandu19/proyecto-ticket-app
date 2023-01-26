import React from 'react'
// import { SocketProvider } from './context/SocketContext'
import { UiProvider } from './context/UiContext'
// Router
import { RouterPage } from './pages/RouterPage'

export const TicketApp = () => {
    return (
        // <SocketProvider>
            <UiProvider>
                <RouterPage />
            </UiProvider>
        // </SocketProvider>
    )
}
