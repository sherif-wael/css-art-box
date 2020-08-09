import defaultLayerStyles from "../utils/defaultLayerStyles";
import {ADD_LAYER, DELETE_LAYER, SET_LAYER_POSITION, SET_LAYER_DIMENSIONS,
        SET_LAYAER_BORDER, SET_LAYER_TRANSFORM, SET_LAYER_SHADOW, SET_LAYER_BACKGROUND_COLOR,
        ADD_LAYER_SHADOW, TOGGLE_BORDER_VIEW, SET_LAYER_RADIUS, SET_LAYER_Z_INDEX, DELETE_LAYER_SHADOW,
        SET_LAYER_RELATIVITY, SET_LAYER_CLIP_PATH, RESET_STATE, SET_LAYER_GRADIENT,
        SET_GRADIENT_LAYOUT, ADD_GRADIENT_COLOR, 
        DELETE_GRADIENT_COLOR, SET_GRADIENT_COLOR, CHANGE_GRADIENT_TYPE} from "./types";

const initialState = [];

function setGradientLayout(type){
    let linearLayout = {angle: 0};
    let radialLayout = {x: 50, y: 50};
    let conicLayout = {angle: 0, x: 50, y: 50};
    if(type === "linear"){
        return linearLayout
    }
    if(type === "radial"){
        return radialLayout
    }
    return conicLayout
}


function layers(state = [], action){
    switch(action.type){
        case ADD_LAYER:
            let layer = {
                id: action.payload.id,
                styles: defaultLayerStyles
            };
            return [...state, layer];
        case DELETE_LAYER: 
            let newState = state.filter(layer => layer.id != action.payload.id);
            return newState;
        case SET_LAYER_RELATIVITY:
            return state.map(layer => {
                if(layer.id === action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            relativeTo: action.payload.value
                        }
                    }
                }
                return layer
            })
        case SET_LAYER_POSITION:
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer, 
                        styles: 
                        {
                            ...layer.styles, 
                            pos: action.payload.pos
                        }
                    }
                }
                return layer
            })
        case SET_LAYER_DIMENSIONS:
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer, 
                        styles: {
                            ...layer.styles,
                             dimensions: action.payload.dimensions
                            }
                        }
                }
                return layer
            })
        case SET_LAYER_TRANSFORM: 
           return state.map(layer => {
               if(layer.id == action.payload.id){
                   let newLayer = {
                       ...layer, 
                       styles: {
                           ...layer.styles,
                            transform:{
                                ...layer.styles.transform,
                                [action.payload.key]: {
                                    ...layer.styles.transform[action.payload.key],
                                    [action.payload.direc]: action.payload.value
                                }
                            }
                        }
                    }
                    return newLayer
               }
               return layer
           })
        case SET_LAYER_RADIUS:
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            borderRadius: {
                                ...layer.styles.borderRadius,
                                [action.payload.direc]: {
                                    ...layer.styles.borderRadius[action.payload.direc],
                                    [action.payload.key]: action.payload.value 
                                }
                            }
                        }
                    }
                }
                return layer
            })
        case SET_LAYER_BACKGROUND_COLOR:
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer, 
                        styles: {
                            ...layer.styles,
                            backgroundColor: {
                                ...layer.styles.backgroundColor,
                                [action.payload.key]: action.payload.value
                            }
                        }
                    }
                }
                return layer
            })
        case SET_LAYAER_BORDER: 
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            border: {
                                ...layer.styles.border,
                                [action.payload.borderPos]: {
                                    ...layer.styles.border[action.payload.borderPos],
                                    [action.payload.key]: action.payload.value
                                }
                            }
                        }
                    }
                }
                return layer
            })
        case ADD_LAYER_SHADOW: 
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer, 
                        styles: {
                            ...layer.styles,
                            shadows: [...layer.styles.shadows, {inset: false, x: 0, y: 0, blur: 0, color: "#ffffff", spread: 0}]
                        }
                    }
                }
                return layer
            })
        case SET_LAYER_SHADOW:
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            shadows: layer.styles.shadows.map((shadow, i) => {
                                if(i == action.payload.index){
                                    return {
                                        ...shadow,
                                        [action.payload.key]: action.payload.value
                                    }
                                }
                                return shadow
                            })
                        }
                    }
                }
                return layer
            })
        case TOGGLE_BORDER_VIEW: 
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            border: {
                                ...layer.styles.border,
                                [action.payload.borderPos]: {
                                    ...layer.styles.border[action.payload.borderPos],
                                    hidden: action.payload.hidden
                                }
                            }
                        }
                    }
                }
                return layer
            })
        case SET_LAYER_Z_INDEX:
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            zIndex: action.payload.value || 0
                        }
                    }
                }
                return layer
            })
        case DELETE_LAYER_SHADOW:
            return state.map(layer => {
                if(layer.id == action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            shadows: layer.styles.shadows.filter((_, i) => i !== action.payload.index)
                        }
                    }
                }
                return layer
            })
        case SET_LAYER_CLIP_PATH: 
            return state.map(layer => {
                if(layer.id === action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            clipPath: action.payload.value
                        }
                    }
                }
                return layer
            })
        case RESET_STATE:
            return [];
        case SET_LAYER_GRADIENT: 
            return state.map(layer => {
                if(layer.id === action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            gradient: {
                                ...layer.styles.gradient,
                                [action.payload.key]: action.payload.value
                            }
                        }
                    }
                }
                return layer
            })
        case CHANGE_GRADIENT_TYPE: 
            return state.map(layer => {
                if(layer.id === action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            gradient: {
                                ...layer.styles.gradient,
                                type: action.payload.type,
                                layout: setGradientLayout(action.payload.type)
                            }
                        }
                    }
                }
                return layer
            })
        case SET_GRADIENT_LAYOUT:
            return state.map(layer => {
                if(layer.id === action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            gradient: {
                                ...layer.styles.gradient,
                                layout: {
                                    ...layer.styles.gradient.layout,
                                    [action.payload.key]: action.payload.value
                                }
                            }
                        }
                    }
                }
                return layer
            })
        case ADD_GRADIENT_COLOR: 
            return state.map(layer => {
                if(layer.id === action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            gradient: {
                                ...layer.styles.gradient,
                                colors: [...layer.styles.gradient.colors, {color: "#000000", start: action.payload.start}]
                            }
                        }
                    }
                }
                return layer
            })
        case DELETE_GRADIENT_COLOR: 
            return state.map(layer => {
                if(layer.id === action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            gradient: { 
                                ...layer.styles.gradient,
                                colors: layer.styles.gradient.colors.filter((_, i) => i !== action.payload.index)
                            }
                        }
                    }
                }
                return layer
            })
        case SET_GRADIENT_COLOR:
            return state.map(layer => {
                if(layer.id === action.payload.id){
                    return {
                        ...layer,
                        styles: {
                            ...layer.styles,
                            gradient: {
                                ...layer.styles.gradient,
                                colors: layer.styles.gradient.colors.map((color, i) => {
                                    if(i === action.payload.index){
                                        return {
                                            ...color,
                                            [action.payload.key]: action.payload.value
                                        }
                                    }
                                    return color
                                })
                            }
                        }
                    }
                }
                return layer
            })
        default:
            return state
    }
}

export default layers