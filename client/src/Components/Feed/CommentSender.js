import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CommentSender.css'

import { Avatar, IconButton } from "@material-ui/core";
import { Send } from '@material-ui/icons';
import { selectUser } from '../ReduxStore/appSlice'
import { useMutation } from "@apollo/react-hooks";
import { AddComment } from '../API/postAPI';
import { updatePost } from '../ReduxStore/postSlice';

const CommentSender = ({ postId }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [addComment] = useMutation(AddComment);

    const [commentInput, setCommentInput] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = commentInput.trim()
        if (comment.length > 0) {
            const commentData = {
                id: postId,
                userId: user._id,
                content: comment,
                timestamp: String(Date.now())
            }

            setCommentInput('');
            let postData = await addComment({ variables: commentData })
            dispatch(updatePost(postData.data.addComment))
        }
    }

    return (
        <div className='commentSender'>
            <Avatar
                style={{ width: '30px', height: '30px' }}
                src={user.avatar}
            />

            <form>
                <div className='commentSender__input'>
                    <input
                        placeholder='Enter Comment'
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <IconButton
                        type='submit'
                        onClick={handleSubmit}
                    >
                        <Send />
                    </IconButton>
                </div>
            </form>

        </div>
    )
}

export default CommentSender
