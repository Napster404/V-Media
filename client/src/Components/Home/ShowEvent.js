import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './ShowEvent.css'

import StyledDialog from '../Misc/StyledDialog'
import { Close, Delete } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { selectUser, setEvents } from '../ReduxStore/appSlice'
import { useMutation } from "@apollo/react-hooks";
import { DeleteEvent } from '../API/userAPI'

const ShowEvent = ({ open, onClose, eventId, heading, description, timestamp }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
	const [deleteEvent] = useMutation(DeleteEvent)

    const handleDelete = async () => {
        onClose()
        const events = await deleteEvent({ variables: { id: user._id, eventId: eventId}});
        dispatch(setEvents(events.data.deleteEvent.eventsArray));
    }

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            component={
                <div className='showEvent'>

                    <div className='showEvent__top'>
                        <div className='showEvent__topTitle'>
                            <p>{heading}</p>
                        </div>

                        <div className='showEvent__topIcons'>

                            <IconButton onClick={handleDelete}>
                                <Delete style={{ color: '#FF0000' }} />
                            </IconButton>

                            <IconButton onClick={onClose}>
                                <Close />
                            </IconButton>

                        </div>
                    </div>

                    <div className='showEvent__body'>

                        <div className='showEvent__bodyDescription'>
                            <p>{description}</p>
                        </div>

                        <div className='showEvent__bodyInfo'>

                            <div className='showEvent__bodyInfoSection'>
                                <h3>Posted by:</h3>
                                <p>You</p>
                            </div>

                            <div className='showEvent__bodyInfoSection'>
                                <h3>Event Timing:</h3>
                                <p>{new Date(parseInt(timestamp)).toLocaleString()}</p>
                            </div>

                        </div>

                    </div>

                </div >
            }
        />
    )
}

export default ShowEvent
