import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import selected from "./selected";
import container from "./container";
import layers from "./layers";



const middleware = applyMiddleware(thunk);

const rootReducer = combineReducers({
    container,
    layers,
    selected
})

let initialState = JSON.parse(localStorage.getItem("state")) || {};

const store = createStore(rootReducer, initialState, middleware);


store.subscribe(() => {
    localStorage.setItem("state", JSON.stringify(store.getState()))
})

export default store;