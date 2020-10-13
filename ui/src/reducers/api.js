import { routesConstants } from "../constants/routes.constants";
import { postConstants } from "../constants/post.constants";

const INITIAL_STATE = {
    state: '',
    posts: [],
    selected_post_idx: -1,
}

const postReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case postConstants.POSTS_GET_ALL:
            return {
                ...state,
                state: routesConstants.POSTS_GET_ALL,
                posts: action.posts.payload,
            };
        case postConstants.POSTS_SET_ACTIVE:
            return {
                ...state,
                selected_post_idx: action.idx,
            };
        default: return state;
    }
}

export default postReducer;