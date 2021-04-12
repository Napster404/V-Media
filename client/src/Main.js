import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Messenger from "./Components/Messenger/Messenger";
import Profile from "./Components/Profile/Profile";
import fetchData from "./Components/API/fetchData";
import { appendUser, popUser, selectUser } from "./Components/ReduxStore/appSlice";
import socketIOClient from "socket.io-client";
import AboutUs from "./Components/AboutUs/AboutUs";
import fetchRoomData from "./Components/API/fetchRoomData";
import addRoom from "./Components/API/addRoom";
import updateRooms from "./Components/API/updateRooms";
import setUsers from "./Components/API/setUsers";
import { useMutation } from "@apollo/react-hooks";
import { GetEvents, GetRooms } from "./Components/API/userAPI";
import { GetPosts } from "./Components/API/postAPI";
import fetchPosts from "./Components/API/fetchPosts";
import { GetRoom } from "./Components/API/roomAPI";
import { popRoomsData, selectRoomsData } from "./Components/ReduxStore/roomSlice";

const Main = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const userRooms = useSelector(selectRoomsData);

	const userRoomsRef = useRef(userRooms);
	useEffect(() => {
		userRoomsRef.current = userRooms;
	}, [userRooms]);

	// Defining Queries
	const [getEvents] = useMutation(GetEvents);
	const [getPosts] = useMutation(GetPosts);
	const [getRooms] = useMutation(GetRooms);
	const [getRoom] = useMutation(GetRoom);

	useEffect(() => {
		if (!user) {
			history.replace("/login");
		} else {
			// Fetching All Data
			fetchData(user._id, dispatch, getEvents, getPosts, getRooms);

			// Setup Sockets
			const socket = socketIOClient("http://localhost:8000");
			// const socket = socketIOClient("https://network-backend-server.herokuapp.com/");

			// Setting Triggers
			socket.on("refresh", () => fetchPosts(dispatch, getPosts));
			socket.on("New Room Created", (data) => { if (data.usersArray.includes(user._id)) addRoom(data._id, dispatch, getRoom) });
			socket.on("message", (data) => fetchRoomData(data, userRoomsRef.current, dispatch, getRoom));
			socket.on("users", (data) => updateRooms(user._id, data, userRoomsRef.current, dispatch, getRoom));
			socket.on("Room Deleted", (data) => dispatch(popRoomsData(data)));

			socket.emit("Joined", user._id)
			socket.on("Welcome", (data) => setUsers(dispatch, data))
			socket.on("Someone Connected", (data) => dispatch(appendUser(data)))
			socket.on("Someone Disconnected", (data) => dispatch(popUser(data)))

			return () => {
				socket.disconnect();
			};
		}
	}, []);

	return (
		<Router>
			{user && (
				<>
					<Navbar />
					<div className="app__body">
						<Switch>
							<Route exact path="/about">
								<AboutUs />
							</Route>

							<Route exact path="/home">
								<Home />
							</Route>

							<Route path="/user">
								<Profile />
							</Route>

							<Route path="/messenger">
								<Messenger />
							</Route>
						</Switch>
					</div>
				</>
			)}
		</Router>
	);
};

export default Main;
