import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './PostSender.css'

import { Avatar, Button, IconButton } from '@material-ui/core'
import { Close, PhotoLibrary } from '@material-ui/icons'
import { selectUser } from '../ReduxStore/appSlice'
import { storage } from '../../firebase'
import { AddPost } from '../API/postAPI'
import { useMutation } from "@apollo/react-hooks";

const PostSender = () => {
    
    const user = useSelector(selectUser)
	const [addPost] = useMutation(AddPost);

    const [postInput, setPostInput] = useState('')
    const [postImage, setPostImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.size > 1048576) {
                alert('File must be less than 1MB')
            } else {
                setPostImage(e.target.files[0])
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postText = postInput.trim()
        if (postImage && postText.length > 0) {
            const imageName = Date.now() + postImage.name;
            const uploadTask = storage.ref(`/images/${imageName}`).put(postImage)
            uploadTask.on('state_changed',
                (snapShot) => {
                    // console.log(snapShot)
                }, (err) => {
                    // console.log(err)
                }, () => {
                    storage.ref('images').child(imageName).getDownloadURL()
                        .then(fireBaseUrl => {
                            const postData = {
                                userId: user._id,
                                text: postText,
                                imgUrl: fireBaseUrl,
                                timestamp: String(Date.now())
                            }

                            setPostInput('');
                            setPostImage(null);
                            addPost({ variables: postData});
                        })
                })

        } else if (postText.length > 0) {
            const postData = {
                userId: user._id,
                text: postText,
                timestamp: String(Date.now())
            }

            setPostInput('');
            addPost({ variables: postData});
        }
    }

    return (
        <div className='postSender'>
            <div className='postSender__top'>
                <Avatar src={user.avatar} />

                <form>

                    <input
                        value={postInput}
                        onChange={(e) => setPostInput(e.target.value)}
                        className='postSender__input'
                        placeholder="What's on your mind?"
                    />

                    <Button onClick={handleSubmit} type='submit'>
                        Submit
                    </Button>

                </form>

            </div>

            <div className='postSender__bottom'>

                <div className={`postSender__option ${postImage && 'postSender__option--disable'}`}>
                    <PhotoLibrary style={{ color: "green" }} />
                    <h3> Photos/Videos </h3>
                    <input type='file' onChange={handleImageChange} />
                </div>

                {postImage &&
                    <div className='postSender__optionClose'>
                        <IconButton onClick={() => setPostImage(null)}>
                            <Close />
                        </IconButton>
                    </div>
                }

            </div>
        </div >
    )
}

export default PostSender
