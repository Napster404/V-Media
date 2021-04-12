import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
    name: 'post',

    initialState: {
        posts: []
    },

    reducers: {
        setPosts: (state, action) => {
            action.payload.sort((a, b) => b.timestamp - a.timestamp)
            state.posts = action.payload
        },

        appendPosts: (state, action) => {
            state.posts.push(action.payload)
        },
        
        updatePost: (state, action) => {
            const ind = state.posts.findIndex(obj => obj._id === action.payload._id)
            state.posts[ind] = action.payload
        }
    },
});

export const { setPosts, appendPosts, updatePost } = postSlice.actions;

export const getPosts = state => state.post.posts;

export default postSlice.reducer;