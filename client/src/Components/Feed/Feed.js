import React from 'react'
import { useSelector } from 'react-redux'
import './Feed.css'

import PostSender from './PostSender'
import Post from './Post'
import { getPosts } from '../ReduxStore/postSlice'

const Feed = () => {

    const postData = useSelector(getPosts)
    return (
        <div className='feed'>
            <PostSender />
            {
                postData.map(post => (
                    <Post
                        key={post._id}
                        post={post}
                    />
                ))
            }

        </div>
    )
}

export default Feed
