import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import React from 'react'
import './ChatReply.css'

const ChatReply = ({ messageReply, setMessageReply }) => {
    return (
        <div className='chatReply'>

            <div className='chatReply__content'>
                <h3> {messageReply.username} </h3>
                <p> {messageReply.content} </p>
            </div>

            <div className='chatReply__close'>
                <IconButton onClick={() => setMessageReply(null)}>
                    <Close />
                </IconButton>
            </div>

        </div>
    )
}

export default ChatReply