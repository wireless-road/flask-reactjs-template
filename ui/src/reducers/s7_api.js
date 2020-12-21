import { routesConstants } from "../constants/routes.constants";
import { postConstants } from "../constants/post.constants";
import { s7Constants } from "../constants/s7.constants";

const INITIAL_STATE = {
    state: '',
    s7baggages: [],
}

const s7Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case s7Constants.S7_BAGGAGES_GET_ALL:
            return {
                ...state,
                state: routesConstants.S7_BAGGAGES_GET_ALL,
                s7baggages: action.s7baggages.payload,
            }
        default: return state;
    }
}

export default s7Reducer;