import { appendRoomData } from "../ReduxStore/roomSlice";

const addRoom = async (roomId, dispatch, getRoom) => {
    const room = await getRoom({ variables: { id: roomId } });
    room.data.room.messagesArray.sort((a, b) => b.timestamp - a.timestamp)
    dispatch(appendRoomData(room.data.room))
}

export default addRoom
