import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Comments.css'

import { Avatar, IconButton, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { selectUser } from '../ReduxStore/appSlice'
import { useMutation } from "@apollo/react-hooks";
import { DeleteComment } from '../API/postAPI'
import { updatePost } from '../ReduxStore/postSlice'

const Comments = ({ postId, comment }) => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const [deleteComment] = useMutation(DeleteComment);

    const handleDelete = async () => {
        let postData = await deleteComment({ variables: { id: postId, commentId: comment._id } })
        dispatch(updatePost(postData.data.deleteComment))
    }

    return (
        <div className='comment'>
            <div className='comment__info'>
                <Avatar
                    style={{ width: '30px', height: '30px' }}
                    src={comment.user.avatar}
                />

                <Tooltip title={new Date(parseInt(comment.timestamp)).toLocaleString()} enterDelay={1000} >

                    <div className='comment__body'>
                        <div className='comment__bodyUsername'>
                            <p>{comment.user.name}</p>
                        </div>
                        <div className='comment__bodyContent'>
                            <p>{comment.content}</p>
                        </div>
                    </div>

                </Tooltip>
            </div>

            { (user._id === comment.user._id) &&
                <IconButton style={{ width: 'fit-content', height: 'fit-content' }} onClick={handleDelete}>
                    <Delete style={{ color: '#FF0000' }} />
                </IconButton>
            }

        </div>
    )
}

export default Comments
