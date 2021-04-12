import React, { useEffect } from "react"
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import "./Navbar.css";

import { auth } from "../../firebase";
import { selectUser } from '../ReduxStore/appSlice'
import { Avatar, Tooltip } from "@material-ui/core";
import {
	Search,
	Home,
	Telegram,
	ExitToAppRounded,
	InfoOutlined,
} from "@material-ui/icons";

const Navbar = () => {

	const user = useSelector(selectUser)
	let history = useHistory();
	let location = useLocation();

	useEffect(() => {
		const id = (location.pathname).split('/')[1]
		if (id && (id === 'home' || id === 'messenger')) {
			document.getElementById(id).classList.add("navbar__option--active");
			return () => {
				if (document.getElementById(id)) {
					document.getElementById(id).classList.remove("navbar__option--active");
				}
			}
		}
	}, [location])

	return (
		<div className="navbar">

			<div className="navbar__left">

				<div
					className="navbar__logo"
					onClick={() => history.replace('/home')}
				>
					<Avatar src="https://upload.wikimedia.org/wikipedia/commons/a/aa/V-logo.svg" />
				</div>

				<div className="navbar__input">
					<Search />
					<input placeholder="Type here" />
				</div>

			</div>

			<div className="navbar__center">

				<Tooltip title="Home" enterDelay={1000}>
					<div
						id="home"
						className="navbar__option"
						onClick={() => history.push("/home")}
					>
						<Home />
					</div>
				</Tooltip>

				<Tooltip title="Messenger" enterDelay={1000}>
					<div
						id="messenger"
						className="navbar__option"
						onClick={() => history.push("/messenger")}
					>
						<Telegram />
					</div>
				</Tooltip>

			</div>

			<div className="navbar__right">

				<div
					id='profile'
					className="navbar__info"
					onClick={() => history.push("/user/" + user._id)}
				>

					<Avatar
						src={user.avatar}
						style={{ height: "25px", width: "25px" }}
					/>

					<p> {user.name} </p>
				</div>

				<div className="navbar__settings">

					<div
						className="navbar__settingsOption"
						onClick={() => history.replace('/about')}
					>

						<InfoOutlined style={{ height: "25px", width: "25px" }} />
						<p> About Us </p>

					</div>

					<div
						className="navbar__settingsOption"
						onClick={() => auth.signOut()}
					>

						<ExitToAppRounded style={{ height: "25px", width: "25px" }} />
						<p> Logout </p>

					</div>

				</div>

			</div>

		</div>
	);
};

export default Navbar;
