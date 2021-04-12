import {configureStore} from '@reduxjs/toolkit';
import appReducer from './appSlice'
import roomReducer from './roomSlice'
import postReducer from './postSlice'

export default configureStore({
    reducer: {
        app: appReducer,
        room: roomReducer,
        post: postReducer
    },
});