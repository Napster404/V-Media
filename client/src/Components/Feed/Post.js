import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './Post.css'

import Comment from './Comments'
import CommentSender from './CommentSender'
import { Avatar, IconButton } from '@material-ui/core'
import { ChatBubbleOutline, Delete, Sync, ThumbUp } from '@material-ui/icons'
import { selectUser } from '../ReduxStore/appSlice'

import { storage } from '../../firebase'
import { useMutation } from "@apollo/react-hooks";
import { AddLike, DeleteLike, DeletePost, GetPost } from '../API/postAPI'
import { updatePost } from '../ReduxStore/postSlice'

const Post = ({ post }) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [deletePost] = useMutation(DeletePost);
    const [addLike] = useMutation(AddLike);
    const [deleteLike] = useMutation(DeleteLike);
    const [getPost] = useMutation(GetPost);

    const [showComments, setShowComments] = useState(false)

    const handleDelete = async () => {
        if (post.imgUrl) storage.refFromURL(post.imgUrl).delete();
        deletePost({ variables: { id: post._id } });
    }

    const handleRefresh = async () => {
        let postData = await getPost({ variables: { id: post._id } })
        dispatch(updatePost(postData.data.post))
    }

    const handleLike = async () => {
        if (post.likesArray.some((like) => (like.user._id === user._id))) {
            let postData = await deleteLike({ variables: { id: post._id, userId: user._id } })
            dispatch(updatePost(postData.data.deleteLike))
        } else {
            const likeData = { id: post._id, userId: user._id, likeType: 0 }
            let postData = await addLike({ variables: likeData })
            dispatch(updatePost(postData.data.addLike))
        }
    }

    return (
        <div className='post'>
            <div className='post__top'>

                <div className='post__topLeft'>
                    <Avatar
                        className='post__avatar'
                        src={post.user.avatar}
                        onClick={() => history.replace('/user/' + post.user._id)}
                    />

                    <div className='post__topInfo'>
                        <h3 onClick={() => history.replace('/user/' + post.user._id)}>{post.user.name}</h3>
                        <p> {new Date(parseInt(post.timestamp)).toLocaleString()} </p>
                    </div>
                </div>

                <div className='post__topIcons'>

                    {post.user._id === user._id &&
                        <IconButton
                            className='post__topIconsDelete'
                            onClick={handleDelete}
                        >
                            <Delete />
                        </IconButton>
                    }

                    <IconButton
                        className='post__topIconsRefresh'
                        onClick={handleRefresh}
                    >
                        <Sync />
                    </IconButton>

                </div>

            </div>

            <div className='post__text'>
                <p>{post.text}</p>
            </div>

            <div className='post__image'>
                {post.imgUrl && <img
                    src={post.imgUrl}
                    alt=''
                />}
            </div>

            <div className={`post__bottom ${showComments && 'post__bottom--active'}`}>

                <div
                    className={`post__option ${post.likesArray.some((like) => (like.user._id === user._id)) && 'post__option--active'}`}
                    onClick={handleLike}
                >
                    <ThumbUp />
                    <p>Like</p>
                    <p>{post.likesArray.length}</p>
                </div>

                <div
                    className={`post__option ${showComments && 'post__option--active'}`}
                    onClick={() => setShowComments(!showComments)}
                >
                    <ChatBubbleOutline />
                    <p>Comment</p>
                    <p>{post.commentsArray.length}</p>
                </div>

            </div>

            {showComments &&
                <div className='post__comments'>

                    {
                        post.commentsArray.map(comment => (
                            <Comment
                                key={comment._id}
                                postId={post._id}
                                comment={comment}
                            />
                        ))
                    }

                    <CommentSender
                        postId={post._id}
                    />

                </div>
            }

        </div>
    )
}

export default Post
