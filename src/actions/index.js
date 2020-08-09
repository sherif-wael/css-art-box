import {SET_CONTAINER_STYLES, ADD_LAYER, DELETE_LAYER, SELECT_LAYER,
        SET_LAYER_RADIUS, SET_LAYER_TRANSFORM, SET_LAYER_POSITION,
        SET_LAYER_DIMENSIONS, SET_LAYER_SHADOW, ADD_LAYER_SHADOW, 
        TOGGLE_BORDER_VIEW, SET_LAYER_BACKGROUND_COLOR, SET_LAYAER_BORDER,
        SET_LAYER_Z_INDEX, DELETE_LAYER_SHADOW, SET_LAYER_RELATIVITY, SET_LAYER_CLIP_PATH, RESET_STATE,
        SET_LAYER_GRADIENT, CHANGE_GRADIENT_TYPE, SET_GRADIENT_LAYOUT,
        ADD_GRADIENT_COLOR, DELETE_GRADIENT_COLOR, SET_GRADIENT_COLOR} from "../reducers/types";


export const addLayer = id => dispatch => {
    let payload = {id};
    dispatch({type: ADD_LAYER, payload})
}

export const deleteLayer = id => dispatch => {
    let payload = {id}
    dispatch({type: DELETE_LAYER, payload})
    dispatch({type: SELECT_LAYER, payload: null})
}

export const setContainerStyles = (key, value) => dispatch => {
    let payload = {key, value};
    dispatch({type: SET_CONTAINER_STYLES, payload})
}

export const setLayerRadius = (id, direc, key, value) => dispatch => {
    let payload = {value, id, direc, key};
    dispatch({type: SET_LAYER_RADIUS, payload})
}

export const setLayerBackground = (id, key, value) => dispatch => {
    let payload = {value, id, key};
    dispatch({type: SET_LAYER_BACKGROUND_COLOR, payload})
}

export const setLayerTransform = (id, key, direc, value) => dispatch => {
    let payload = {id, direc, key, value};
    dispatch({type: SET_LAYER_TRANSFORM, payload})
}

export const setLayerBorder = (id, borderPos, key, value) => dispatch => {
    let payload = {id, borderPos, key, value};
    dispatch({type: SET_LAYAER_BORDER, payload})
}

export const addLayerShadow = id => dispatch => {
    let payload = {id};
    dispatch({type: ADD_LAYER_SHADOW, payload})
}

export const setLayerShadow = (id, index, key, value) => dispatch => {
    let payload = {id, index, key, value};
    dispatch({type: SET_LAYER_SHADOW, payload})
}

export const toggleBorderView = (id, borderPos, hidden) => dispatch => {
    let payload = {id, borderPos, hidden};
    dispatch({type: TOGGLE_BORDER_VIEW, payload})
}

export const setLayerPosition = (id, pos) => dispatch => {
    let payload = {id, pos};
    dispatch({type: SET_LAYER_POSITION, payload})
}

export const setLayerDimensions = (id, dimensions) => dispatch => {
    let payload = {id, dimensions};
    dispatch({type: SET_LAYER_DIMENSIONS, payload})
}

export const setLayerZIndex= (id, value) => dispatch => {
    let payload = {id, value};
    dispatch({type: SET_LAYER_Z_INDEX, payload})
}

export const selectLayer = id => dispatch => {
    dispatch({type: SELECT_LAYER, payload: id})
}

export const deleteLayerShadow = (id, index) => dispatch => {
    let payload = {id, index};
    dispatch({type: DELETE_LAYER_SHADOW, payload})
}


export const setLayerRelativity = (id, value) => dispatch => {
    let payload = {id, value};
    dispatch({type: SET_LAYER_RELATIVITY, payload})
}

export const setLayerClipPath = (id, value) => dispatch => {
    let payload = {id, value};
    dispatch({type: SET_LAYER_CLIP_PATH, payload})
} 


export const resetState = () => dispatch => {
    localStorage.removeItem("state");
    dispatch({type: RESET_STATE})
    dispatch({type: SELECT_LAYER, payload: null})
}


export const setLayerGradient = (id, key, value) => dispatch => {
    let payload = {id, key, value};
    dispatch({type: SET_LAYER_GRADIENT, payload})
}

export const changeGradientType = (id, type) => dispatch => {
    let payload = {id, type};
    dispatch({type: CHANGE_GRADIENT_TYPE, payload})
}

export const setGradientLayout = (id, key, value) => dispatch => {
    let payload = {id, key, value};
    dispatch({type: SET_GRADIENT_LAYOUT, payload})
}

export const addGradientColor = (id, start) => dispatch => {
    let payload = {id, start};
    dispatch({type: ADD_GRADIENT_COLOR, payload})
}

export const deleteGradientColor = (id, index) => dispatch => {
    let payload = {id, index};
    dispatch({type: DELETE_GRADIENT_COLOR, payload})
}

export const setGradientColor = (id, index, key, value) => dispatch => {
    let payload = {id, index, key, value};
    dispatch({type: SET_GRADIENT_COLOR, payload})
}