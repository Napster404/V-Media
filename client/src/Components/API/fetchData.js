import { setEvents } from '../ReduxStore/appSlice'
import { setRoomsData } from '../ReduxStore/roomSlice';
import fetchPosts from './fetchPosts'

const fetchData = async (userId, dispatch, getEvents, getPosts, getRooms) => {

    // Fetching Events
    const events = await getEvents({ variables: { id: userId } });
    dispatch(setEvents(events.data.user.eventsArray));

    // Fetching Posts
    await fetchPosts(dispatch, getPosts);

    // fetchUserRooms(dispatch, userId)
    const rooms = await getRooms({ variables: {id: userId} });
    dispatch(setRoomsData(rooms.data.user.userRooms))
}

export default fetchData;

