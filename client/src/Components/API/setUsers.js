import { appendUser } from "../ReduxStore/appSlice";

const setUsers = (dispatch, data) => {
    data.forEach(user => {
        dispatch(appendUser(user.userId))
    });    
}

export default setUsers