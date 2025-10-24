import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";


/*
steps for statemanagemnet
submit action
handle action in its reducer
register here -> reducer
*/


export const store = configureStore({
    reducer:{
        auth : authReducer
    }
})