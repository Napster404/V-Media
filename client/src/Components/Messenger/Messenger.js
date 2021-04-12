import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './Messenger.css'

import MessengerLeft from './MessengerLeft'
import Inbox from './Inbox'

const Messenger = () => {

    const location = useLocation()
    const [roomPath, setRoomPath] = useState(null)
    const [roomInfo, setRoomInfo] = useState(null)

    useEffect(() => {
        const path = (location.pathname).split('/')
        if (path.length > 3) setRoomPath(path[3])
        else setRoomPath(null)
    }, [location])

    return (
        <div className='messenger'>
            <MessengerLeft setRoomInfo={setRoomInfo} />
            {roomPath ? (
                <Inbox roomId={roomPath} roomInfo={roomInfo} />
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
