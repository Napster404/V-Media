import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Messenger.css'

import MessengerLeft from './MessengerLeft'
import Inbox from './Inbox'

const Messenger = () => {

    const location = useLocation()
    const [roomPath, setRoomPath] = useState(null)

    useEffect(() => {
        const path = (location.pathname).split('/')
        if (path.length > 2) {
            setRoomPath(path[2])
        }
        else {
            setRoomPath(null)
        }

    }, [location])

    return (
        <div className='messenger'>
            <MessengerLeft />
            {roomPath ? (
                <Inbox />
            ) : (
                    <div className='messenger__initial'>
                        <img
                            src='https://upload.wikimedia.org/wikipedia/commons/a/aa/V-logo.svg'
                            alt='LogoImage'
                        />
                        <p> Get Started </p>
                    </div>
                )}
        </div>
    )
}

export default Messenger
