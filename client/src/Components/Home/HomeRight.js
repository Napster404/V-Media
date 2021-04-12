import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './HomeRight.css'

import Event from './Event'
import CreateNewEvent from './CreateNewEvent'
import { Button } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { selectEvents, selectUser } from '../ReduxStore/appSlice'

const HomeRight = () => {

    const user = useSelector(selectUser)
    const eventData = useSelector(selectEvents)
    const [newEvent, setNewEvent] = useState(false);

    return (
        <div className='homeRight'>

            <div className='homeRight__info'>
                <p> Upcoming Events </p>
            </div>

            <div className='homeRight__new'>
                <Button onClick={() => { setNewEvent(true) }}>
                    <Add />
                    <p> Create New Event</p>
                </Button>
            </div>

            { newEvent && <CreateNewEvent
                open={newEvent}
                onClose={() => setNewEvent(false)}
                userId={user._id}
            />
            }

            <div className='homeRight__eventList'>
                {eventData && eventData.map(event => (
                    <Event
                        key={event._id}
                        eventId={event._id}
                        heading={event.heading}
                        description={event.description}
                        timestamp={event.timestamp}
                    />
                ))
                }
            </div>

        </div>
    )
}

export default HomeRight
