import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Login.css";

import { Button } from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { AddUser } from "../API/userAPI";
import { checkAuth, signIn } from "./checkAuth";

const Login = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [addUser] = useMutation(AddUser);

	// For Auto-Authentication from Cache
	useEffect(() => {
		checkAuth(addUser, dispatch, history);
	}, [])

	// For SignIn/SignUp
	const signInHandler = () => {
		signIn(addUser, dispatch, history);
	};

	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/a/aa/V-logo.svg"
					alt="LogoImage"
				/>
				<Button variant="outlined" onClick={signInHandler}>
					Sign In
				</Button>
			</div>
		</div>
	);
};

export default Login;
