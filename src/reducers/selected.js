import {SELECT_LAYER} from "./types";
const initialState = null;

function selected(state = initialState, action){
    switch(action.type){
        case SELECT_LAYER: 
            return action.payload
        default:
            return state
    }
}

export default selected