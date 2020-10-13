import { combineReducers } from "redux";
import authenticationReducer from "./authentication";
import postReducer from "./api";

const rootReducer = combineReducers({
    authenticationState: authenticationReducer,
    postState: postReducer,
});

export default rootReducer;