import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './CreateNewEvent.css'

import StyledDialog from '../Misc/StyledDialog'
import { Close } from '@material-ui/icons'
import { Button, IconButton, TextField } from '@material-ui/core'
import { selectUser, setEvents } from '../ReduxStore/appSlice'
import { AddEvent } from '../API/userAPI'
import { useMutation } from "@apollo/react-hooks";

const CreateNewEvent = ({ open, onClose }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [addEvent] = useMutation(AddEvent)

    const [heading, setHeading] = useState('')
    const [description, setDescription] = useState('')
    const [dateTime, setDateTime] = useState('2021-01-01T12:00')

    const [errorHeading, setErrorHeading] = useState(false)
    const [errorDescription, setErrorDescription] = useState(false)

    const validateHeading = (value) => {
        if (value.length >= 6 && value.length <= 30) setErrorHeading(false)
        else setErrorHeading(true)
    }

    const validateDescription = (value) => {
        if (value.length > 0) setErrorDescription(false)
        else setErrorDescription(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        validateHeading(heading)
        validateDescription(description)

        if (heading.length >= 6 && heading.length <= 30 && description.length > 0) {
            const uploadData = {
                id: user._id,
                heading: heading,
                description: description,
                timestamp: String(Date.parse(dateTime))
            }

            const events = await addEvent({ variables: uploadData });
            dispatch(setEvents(events.data.addEvent.eventsArray));
            onClose();
        }
    }

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            component={
                <div className='createNewEvent'>

                    <div className='createNewEvent__top'>
                        <p>Create New Event</p>
                        <IconButton onClick={onClose}>
                            <Close />
                        </IconButton>
                    </div>

                    <form>

                        <div className='createNewEvent__body'>

                            <div className='createNewEvent__bodyEntry'>
                                <TextField
                                    label="Event Heading"
                                    value={heading}
                                    onChange={(e) => { setHeading(e.target.value); validateHeading(e.target.value) }}
                                />
                                {errorHeading &&
                                    <p> Heading must be more than 6 and less than 30 characters long </p>}
                            </div>

                            <div className='createNewEvent__bodyEntry'>
                                <TextField
                                    label="Event Description"
                                    multiline
                                    rowsMax={5}
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value); validateDescription(e.target.value) }}
                                />
                                {errorDescription &&
                                    <p> Description cannot be empty </p>}
                            </div>

                            <div className='createNewEvent__bodyEntry'>
                                <TextField
                                    label="Event Timing"
                                    type="datetime-local"
                                    value={dateTime}
                                    onChange={(e) => setDateTime(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className='createNewEvent__bottom'>
                            <Button
                                type='submit'
                                onClick={handleSubmit}>
                                <p> Create </p>
                            </Button>
                        </div>

                    </form>
                </div>
            }
        />
    )
}

export default CreateNewEvent
