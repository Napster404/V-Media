import React, { useEffect, useState } from 'react'
import './Chat.css'

import { IconButton, Tooltip } from "@material-ui/core";
import { Delete, Reply } from '@material-ui/icons';
import { useMutation } from "@apollo/react-hooks";
import { DeleteMessage } from '../../API/roomAPI';

const Chat = ({ roomId, userId, message, messagesArray, setMessageReply }) => {

    const [messageReplied, setMessageReplied] = useState(null);
    const [deleteMessage] = useMutation(DeleteMessage)

    useEffect(() => {
        if (message && message.replyId) {

            const ind = messagesArray.findIndex(obj => obj._id === message.replyId)
            if (messagesArray[ind]) {
                setMessageReplied({
                    username: messagesArray[ind].username,
                    content: messagesArray[ind].content
                })
            } else {
                setMessageReplied({
                    username: 'Message has been deleted!',
                    content: ''
                })
            }
        }
    }, [])

    const handleReplySelection = () => {
        const messageReply = {
            messageId: message._id,
            username: message.username,
            content: message.content
        }
        setMessageReply(messageReply)
    }

    const handleDelete = async () => {
        await deleteMessage({ variables: { id: roomId, messageId: message._id } })
    }

    return (
        <>
            {message.username === 'AAAAA' ? (
                <div className='chat chat__info'>
                    <div className='chat__infoContent'>
                        <p>{message.content}</p>
                    </div>
                </div>
            ) : (
                <div className={`chat ${userId === message.userId && 'chat__sent'}`}>
                    <div className='chat__container'>
                        <p> {message.username} </p>

                        <div className='chat__message'>
                            <Tooltip
                                title={new Date(parseInt(message.timestamp)).toLocaleString()}
                                enterDelay={1000}
                            >

                                <div className='chat__messageBody'>

                                    {messageReplied &&
                                        <div className='chat__messageBodyReply'>
                                            <h3> {messageReplied.username} </h3>
                                            <p> {messageReplied.content} </p>
                                        </div>
                                    }

                                    <p> {message.content} </p>
                                </div>

                            </Tooltip>

                            <div className='chat__forward'>

                                <IconButton onClick={handleReplySelection}>
                                    <Reply />
                                </IconButton>

                                {userId === message.userId &&
                                    <IconButton onClick={handleDelete}>
                                        <Delete />
                                    </IconButton>
                                }

                            </div>

                        </div>

                    </div>
                </div >
            )}
        </>


    )
}

export default Chat;