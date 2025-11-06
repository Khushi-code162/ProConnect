import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import postReducer from "./postReducer/index.js"

/*
steps for statemanagemnet
submit action
handle action in its reducer
register here -> reducer
*/


export const store = configureStore({
    reducer:{
        auth : authReducer,
        posts: postReducer
    }
})
