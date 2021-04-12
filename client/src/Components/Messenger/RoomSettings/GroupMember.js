import React from "react";
import { useHistory } from 'react-router-dom'
import "./GroupMember.css";

import { Avatar, Badge, Tooltip, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectActiveUsers } from "../../ReduxStore/appSlice";

const GreenBadge = withStyles(() => ({ badge: { backgroundColor: '#1EE657' } }))(Badge);
const GroupMember = ({ user }) => {

    const history = useHistory()
    const activeUsers = useSelector(selectActiveUsers)

    return (
        (user &&
            <Tooltip
                title={user.email}
                enterDelay={1000}
                placement="left"
            >
                <div
                    className="groupMember__listItem"
                    onClick={() => history.replace('/user/' + user._id)}
                >
                    {(activeUsers.includes(user._id) ? (
                        <GreenBadge variant="dot" overlap="circle">
                            <Avatar
                                style={{ height: '25px', width: '25px' }}
                                src={user.avatar}
                            />
                        </GreenBadge>
                    ) : (
                        <Avatar
                            style={{ height: '25px', width: '25px' }}
                            src={user.avatar}
                        />
                    ))
                    }
                    <p>{user.name}</p>
                </div>

            </Tooltip>
        )
    )
};

export default GroupMember;
