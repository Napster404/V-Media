import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Room.css'

import { Avatar, Badge, withStyles } from '@material-ui/core'
import { selectActiveUsers, selectUser } from '../ReduxStore/appSlice'
import axios from '../Misc/axios'

const GreenBadge = withStyles(() => ({ badge: { backgroundColor: '#1EE657' } }))(Badge);
const Room = ({ roomId, title, usersArray, setRoomInfo, recentMessageUser, recentMessageContent }) => {
    const history = useHistory()
    const user = useSelector(selectUser)
    const activeUsers = useSelector(selectActiveUsers)

    const [newUser, setNewUser] = useState({})
    useEffect(() => {
        if (!title && usersArray) {
            const fetchId = (usersArray[0] === user.userId) ? (usersArray[1]) : (usersArray[0])
            axios.get('retrieve/user', { params: { userId: fetchId } })
                .then((res) => setNewUser(res.data))
        }
        else {
            setNewUser({ name: title, avatar: '' })
        }
    }, [])

    const handleSelect = async () => {
        if (title) history.push('/messenger/g/' + roomId);
        else history.push('/messenger/d/' + roomId);

        await setRoomInfo({
            title: newUser.name,
            avatar: newUser.avatar,
            isGroup: (title) ? ('group') : (newUser.userId),
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

            {(title !== null && activeUsers.includes(newUser.userId) ? (
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
                        <h3>{recentMessageUser + ':'}</h3>
                        <p>{sliceMessage()}</p>
                    </div>
                }

            </div>
        </div>
    )
}

export default Room
