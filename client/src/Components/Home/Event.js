import React, { useState } from 'react'
import './Event.css'

import ShowEvent from './ShowEvent'

const Event = ({ eventId, heading, description, timestamp }) => {

    const [showEvent, setShowEvent] = useState(false)

    return (
        <div>
            <div className='event' onClick={() => setShowEvent(true)} >

                <div className='event__top'>
                    <p>You</p>
                    <p>{new Date(parseInt(timestamp)).toLocaleString()}</p>
                </div>

                <div className='event__bottom'>
                    <p>{heading}</p>
                </div>

            </div >

            { showEvent &&
                <ShowEvent
                    open={showEvent}
                    onClose={() => setShowEvent(false)}
                    eventId={eventId}
                    heading={heading}
                    description={description}
                    timestamp={timestamp}
                />
            }

        </div>
    )
}

export default Event
