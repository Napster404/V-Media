import { popRoomsData } from "../ReduxStore/roomSlice";
import addRoom from "./addRoom";

const updateRooms = async (userId, data, userRooms, dispatch, getRoom) => {
    if (typeof (data.usersArray) === 'string' && data.usersArray == userId) {
        addRoom(data.roomId, dispatch, getRoom)
    } else if (typeof (data.usersArray) !== 'string' && userRooms.some((room) => (room._id == data.roomId)) && !data.usersArray.includes(userId)) {
        dispatch(popRoomsData(data))
    }
}

export default updateRooms