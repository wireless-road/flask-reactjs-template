import { routesConstants } from "../constants/routes.constants";
import { postConstants } from "../constants/post.constants";
import {s7Constants} from "../constants/s7.constants";

const doSetPosts = posts => ({
    type: postConstants.POSTS_GET_ALL,
    posts
});

const doSelectPost = idx => ({
    type: postConstants.POSTS_SET_ACTIVE,
    idx
});

const doSetS7Baggages = s7baggages => ({
    type: s7Constants.S7_BAGGAGES_GET_ALL,
    s7baggages
});

export {
    doSetPosts,
    doSelectPost,
    doSetS7Baggages,
};