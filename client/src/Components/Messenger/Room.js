import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Room.css'

import { Avatar, Badge, withStyles } from '@material-ui/core'
import { selectActiveUsers, selectUser } from '../ReduxStore/appSlice'

const GreenBadge = withStyles(() => ({ badge: { backgroundColor: '#1EE657' } }))(Badge);
const Room = ({ roomData, setRoomInfo, recentMessageUser, recentMessageContent }) => {
    const history = useHistory()
    const user = useSelector(selectUser)
    const activeUsers = useSelector(selectActiveUsers)

    const [newUser, setNewUser] = useState({})
    useEffect(() => {
        if (!roomData.title && roomData.users) {
            (roomData.users[0]._id === user._id) ? setNewUser(roomData.users[1]) : setNewUser(roomData.users[0])
        }
        else {
            setNewUser({ name: roomData.title, avatar: '' })
        }
    }, [])

    const handleSelect = async () => {
        if (roomData.title) history.push('/messenger/g/' + roomData._id);
        else history.push('/messenger/d/' + roomData._id);

        await setRoomInfo({
            title: newUser.name,
            avatar: newUser.avatar,
            isGroup: (roomData.title) ? ('group') : (newUser._id),
        })
    }

    const sliceMessage = () => {
        if (recentMessageUser && recentMessageUser.length + recentMessageContent.length <= 30) {
            return recentMessageContent;
        } else if (recentMessageUser) {
            return recentMessageContent.slice(0, 30 - recentMessageUser.length) + '...';
        }
    }

    return (
        <div className='room' onClick={handleSelect}>

            {(roomData.title === null && activeUsers.includes(newUser._id) ? (
                <GreenBadge className="room__avatar" variant="dot" overlap="circle">
                    <Avatar
                        style={{ "height": "30px", "width": "30px" }}
                        src={newUser.avatar}
                    />
                </GreenBadge>
            ) : (
                <Avatar
                    className="room__avatar"
                    style={{ "height": "30px", "width": "30px" }}
                    src={newUser.avatar}
                />
            ))
            }

            <div className='room__content'>
                <p>{newUser.name}</p>

                {recentMessageUser && recentMessageUser.length > 0 &&
                    <div className='room__contentRecent'>
                        {
                            recentMessageUser !== 'AAAAA' &&
                            <h3>{recentMessageUser + ':'}</h3>
                        }
                        <p>{sliceMessage()}</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default Room
