import { combineReducers } from "redux";
import authenticationReducer from "./authentication";
import postReducer from "./api";
import s7Reducer from "./s7_api";

const rootReducer = combineReducers({
    authenticationState: authenticationReducer,
    postState: postReducer,
    s7State: s7Reducer,
});

export default rootReducer;