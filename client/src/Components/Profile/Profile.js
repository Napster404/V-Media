import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import Post from '../Feed/Post'
import { getPosts } from '../ReduxStore/postSlice'
import { useMutation } from '@apollo/react-hooks'
import { GetUser } from '../API/userAPI'

import './Profile.css'
const Profile = () => {

    const location = useLocation()
    const [user, setUser] = useState(null)
    const [getUser] = useMutation(GetUser)
    const postData = useSelector(getPosts)

    const fetchUserData = async (userId) => {
        let user = await getUser({ variables: { id: userId } })
        setUser(user.data.user)
    }

    useEffect(() => {
        const userId = (location.pathname).split('/')[2]
        fetchUserData(userId)
    }, [location])

    return (

        <div className='profile'>
            <div className='wrapper'>

                <div className='profile__card'>

                    <div className='profile__card__img'>
                        <img src={user && user.avatar} alt="" />
                    </div>

                    <div className='profile__card__info'>

                        <div className='profile__card__info__name'>
                            {user && user.name}
                        </div>

                        <div className='profile__card__info__des'>
                            {user && user.email}
                        </div>

                    </div>

                    <div className='profile__feed'>
                        <h3> Posts </h3>
                        <div className='profile__feedPosts'>

                            {user && postData.map(post => (
                                (post.user._id === user._id) && (
                                    <Post
                                        key={post._id}
                                        post={post}
                                    />
                                )
                            ))
                            }

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile;