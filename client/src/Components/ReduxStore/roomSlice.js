import { createSlice } from '@reduxjs/toolkit'

export const roomSlice = createSlice({
    name: 'room',

    initialState: {
        roomsData: []
    },

    reducers: {
        setRoomsData: (state, action) => {
            action.payload.forEach((room) => room.messagesArray.sort((a, b) => b.timestamp - a.timestamp))
            state.roomsData = action.payload
        },

        appendRoomData: (state, action) => {
            state.roomsData.push(action.payload)
        },

        popRoomsData: (state, action) => {
            const ind = state.roomsData.findIndex(obj => obj._id === action.payload.roomId)
            if (state.roomsData[ind]) {
                state.roomsData[ind] = state.roomsData[state.roomsData.length - 1]
                state.roomsData.pop()
            }
        },

        updateRoomData: (state, action) => {
            const ind = state.roomsData.findIndex(obj => obj._id === action.payload._id)
            if (state.roomsData[ind]) state.roomsData[ind] = action.payload
        }
    },
});

export const { setRoomsData, appendRoomData, popRoomsData, updateRoomData } = roomSlice.actions;

export const selectRoomsData = state => state.room.roomsData;

export default roomSlice.reducer;