import { routesConstants } from "../constants/routes.constants";
import { postConstants } from "../constants/post.constants";
import { s7Constants } from "../constants/s7.constants";

const INITIAL_STATE = {
    state: '',
    posts: [],
    selected_post_idx: -1,
    s7baggages: [],
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
        // case s7Constants.S7_BAGGAGES_GET_ALL:
        //     return {
        //         ...state,
        //         state: routesConstants.S7_BAGGAGES_GET_ALL,
        //         s7baggages: action.s7baggages.payload,
        //     }
        default: return state;
    }
}

export default postReducer;