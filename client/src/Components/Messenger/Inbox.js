import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Inbox.css';

import Chat from './Chat/Chat.js'
import RoomSettings from './RoomSettings/RoomSettings'
import ChatReply from './Chat/ChatReply'
import { Avatar, Badge, IconButton, withStyles } from "@material-ui/core";
import { EmojiEmotions, Send } from '@material-ui/icons';

import { selectActiveUsers, selectUser } from '../ReduxStore/appSlice'
import { selectRoomsData } from '../ReduxStore/roomSlice';
import { useHistory } from 'react-router-dom';
import { useMutation } from "@apollo/react-hooks";
import { AddMessage } from '../API/roomAPI';

const GreenBadge = withStyles(() => ({ badge: { backgroundColor: '#1EE657' } }))(Badge);
const Inbox = ({ roomId, roomInfo }) => {
    const history = useHistory()
    const user = useSelector(selectUser)
    const roomsData = useSelector(selectRoomsData)
    const activeUsers = useSelector(selectActiveUsers)

    const [addMessage] = useMutation(AddMessage);

    const [messages, setMessages] = useState([])
    const [usersArray, setUsersArray] = useState([])
    useEffect(() => {
        if (roomsData && roomId) {
            const ind = roomsData.findIndex(obj => obj._id === roomId)
            if (roomsData[ind]) {
                setMessages(roomsData[ind].messagesArray);
                setUsersArray(roomsData[ind].users)
            } else {
                history.replace('/messenger')
            }
        }
    }, [roomId, roomsData])


    const [newMessage, setNewMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();

        const messageText = newMessage.trim()
        if (messageText.length > 0) {
            const messageData = {
                id: roomId,
                userId: user._id,
                username: user.name,
                content: messageText,
                timestamp: String(Date.now()),
                replyId: (messageReply) ? (messageReply.messageId) : (null)
            }

            await addMessage({ variables: messageData })
            setNewMessage('')
            setMessageReply(null)
        }
    }

    const [messageReply, setMessageReply] = useState(null)
    useEffect(() => {
        setMessageReply(null)
    }, [roomId])

    return (
        <div className='inbox'>
            <div className='inbox__navbar'>

                <div className='inbox__navbarLeft'>
                    {(roomInfo.isGroup !== 'group' && activeUsers.includes(roomInfo.isGroup) ? (
                        <GreenBadge variant="dot" overlap="circle">
                            <Avatar
                                style={{ "height": "30px", "width": "30px" }}
                                src={roomInfo.avatar}
                            />
                        </GreenBadge>
                    ) : (
                        <Avatar
                            style={{ "height": "30px", "width": "30px" }}
                            src={roomInfo.avatar}
                        />
                    ))
                    }

                    <p>{roomInfo.title}</p>
                </div>


                <div className='inbox__navbarRight' >
                    <RoomSettings
                        roomId={roomId}
                        isGroup={roomInfo.isGroup}
                        usersArray={usersArray}
                    />
                </div>

            </div>

            <div className='inbox__bodyContainer'>
                <div className='inbox__bodyContainer2'>
                    <div className='inbox__body'>
                        {
                            messages.map(message => (
                                <Chat
                                    key={message.timestamp + message.content}
                                    roomId={roomId}
                                    userId={user._id}
                                    message={message}
                                    messagesArray={messages}
                                    setMessageReply={setMessageReply}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="inbox__bottom">

                {messageReply &&
                    <ChatReply
                        messageReply={messageReply}
                        setMessageReply={setMessageReply}
                    />
                }

                <div className='inbox__bottomInput'>

                    <IconButton >
                        <EmojiEmotions />
                    </IconButton>

                    <form>

                        <input
                            value={newMessage}
                            placeholder="Enter your message"
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            className='submit--hidden'
                            onClick={handleSubmit}
                            type='submit'
                        />

                    </form>

                    <IconButton onClick={handleSubmit}>
                        <Send />
                    </IconButton>

                </div>

            </div>

        </div>
    )
}

export default Inbox;


