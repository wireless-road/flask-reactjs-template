import { authenticationConstants } from "../constants/authentication.constants";

const doLogin = user => ({
    type: authenticationConstants.LOGIN_REQUEST,
    user
});

const doLogout = user => ({
    type: authenticationConstants.LOGOUT_REQUEST,
    user
});

export {
    doLogin,
    doLogout,
};