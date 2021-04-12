import { auth, provider } from "../../firebase";
import { logout } from "../ReduxStore/appSlice";
import saveUser from "./saveUser";

const checkAuth = async (addUser, dispatch, history) => {
	await auth.onAuthStateChanged((authUser) => {
		if (authUser) {
			const userData = {
				name: authUser.displayName,
				avatar: authUser.photoURL,
				email: authUser.email,
			};

			saveUser(userData, addUser, dispatch, history);
		} else {
			dispatch(logout());
			history.replace("/login");
		}
	});
};

const signIn = async (addUser, dispatch, history) => {
	await auth.signInWithPopup(provider)
		.then(result => {
			const userData = {
				name: result.user.displayName,
				avatar: result.user.photoURL,
				email: result.user.email
			};

			saveUser(userData, addUser, dispatch, history);
		})
		.catch(err => console.log("Error with Google Authorization"))
}

export { checkAuth, signIn };
