import initialState from "../utils/defaultContainerStyles";
import {SET_CONTAINER_STYLES, RESET_STATE} from "./types";

function container(state = initialState, action){
    switch(action.type){
        case SET_CONTAINER_STYLES:
            let {key, value} = action.payload;
            return {...state, [key]: value}
        case RESET_STATE:
            return initialState;
        default:
            return state
    }
}

export default container