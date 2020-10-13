import { routesConstants } from "../constants/routes.constants";
import { postConstants } from "../constants/post.constants";

const doSetPosts = posts => ({
    type: postConstants.POSTS_GET_ALL,
    posts
});

const doSelectPost = idx => ({
    type: postConstants.POSTS_SET_ACTIVE,
    idx
});

export {
    doSetPosts,
    doSelectPost,
};