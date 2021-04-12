import { updateRoomData } from "../ReduxStore/roomSlice";

const fetchRoomData = async (roomId, userRooms, dispatch, getRoom) => {
    if (userRooms.some((room) => (room._id == roomId))) {
        const room = await getRoom({ variables: { id: roomId } });
        if (room.data.room) {
            room.data.room.messagesArray.sort((a, b) => b.timestamp - a.timestamp)
            dispatch(updateRoomData(room.data.room))
        }

    }
}

export default fetchRoomData