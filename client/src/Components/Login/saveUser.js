import { login, logout } from "../ReduxStore/appSlice";

const saveUser = async (userData, addUser, dispatch, history) => {
    let data = await addUser({
        variables: {
            name: userData.name,
            avatar: userData.avatar,
            email: userData.email
        },
    })

    if (data) {
        dispatch(login(data.data.addUser));
        history.replace("/home");
    }
    else {
        dispatch(logout());
    }
}

export default saveUser;