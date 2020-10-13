import { authenticationConstants } from "../constants/authentication.constants";

const INITIAL_STATE = {
    username: localStorage.getItem('username'),
    access_token: localStorage.getItem('access_token'),
    refresh_token: localStorage.getItem('refresh_token'),
    state: localStorage.getItem('state'),
};

const applyLogin = (state, action) => {
    return { ...state, username: action.user.username,
                        access_token: action.user.access_token,
                        refresh_token: action.user.refresh_token,
                        state: action.user.state,
            }
}

const applyLogout = (state, action) => {
    return { ...state,  username: '',
                        access_token: '',
                        refresh_token: '',
                        state: action.user.state,
            }
}

const authenticationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case authenticationConstants.LOGIN_REQUEST: {
            return applyLogin(state, action);
        }
        case authenticationConstants.LOGOUT_REQUEST: {
            return applyLogout(state, action);
        }
        default: return state;
    }
}

export default authenticationReducer;
