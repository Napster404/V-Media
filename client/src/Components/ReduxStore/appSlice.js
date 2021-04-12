import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',

    initialState: {
        user: null,
        events: [],
        activeUsers: []
    },

    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },

        logout: (state) => {
            state.user = null
            state.events = []
            state.rooms = []
            state.activeUsers = []
        },

        setEvents: (state, action) => {
            action.payload.sort((a, b) => a.timestamp - b.timestamp)
            state.events = action.payload;
        },
        
        appendUser: (state, action) => {
            state.activeUsers.push(action.payload)
        },

        popUser: (state, action) => {
            const ind = state.activeUsers.findIndex(obj => obj === action.payload)
            if (state.activeUsers[ind]) {
                state.activeUsers[ind] = state.activeUsers[state.activeUsers.length - 1]
                state.activeUsers.pop()
            }
        }
    },
});

export const { login, logout, setEvents, appendUser, popUser } = appSlice.actions;

export const selectUser = state => state.app.user;
export const selectEvents = state => state.app.events;
export const selectRooms = state => state.app.rooms;
export const selectActiveUsers = state => state.app.activeUsers;

export default appSlice.reducer;