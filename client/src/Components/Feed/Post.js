import React from 'react'
import './Post.css'

import { Avatar } from '@material-ui/core'
import { ChatBubbleOutline, NearMe, ThumbUp } from '@material-ui/icons'

const Post = ({ userId, username, avatar, text, image, timestamp }) => {
    return (
        <div className='post'>
            <div className='post__top'>
                <Avatar
                    className='post__avatar'
                    src={avatar}
                />

                <div className='post__topInfo'>
                    <h3>{username}</h3>
                    <p> {new Date(parseInt(timestamp)).toUTCString()} </p>
                </div>
            </div>

            <div className='post__text'>
                <p>{text}</p>
            </div>

            <div className='post__image'>
                {image && <img
                    src={image}
                    alt=''
                />}
            </div>

            <div className='post__bottom'>

                <div className='post__option'>
                    <ThumbUp />
                    <p>Like</p>
                </div>

                <div className='post__option'>
                    <ChatBubbleOutline />
                    <p>Comment</p>
                </div>

                <div className='post__option'>
                    <NearMe />
                    <p>Share</p>
                </div>

            </div>
        </div>
    )
}

export default Post
