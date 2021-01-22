import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CommentSender.css'

import { Avatar, IconButton } from "@material-ui/core";
import { Send } from '@material-ui/icons';
import { selectUser } from '../ReduxStore/appSlice'
import addComment from '../API/addComment'

const CommentSender = ({ postId }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [commentInput, setCommentInput] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const comment = commentInput.trim()
        if (comment.length > 0) {
            const requestData = {
                commentData: {
                    userId: user.userId,
                    username: user.username,
                    avatar: user.avatarSrc,
                    content: comment,
                    timestamp: Date.now()
                },
                postId: postId
            }

            setCommentInput('');
            await addComment(dispatch, requestData)
        }
    }

    return (
        <div className='commentSender'>
            <Avatar
                style={{ width: '30px', height: '30px' }}
                src={user.avatarSrc}
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
