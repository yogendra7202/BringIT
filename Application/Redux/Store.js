import { combineReducers, configureStore, createStore, legacy_createStore } from "@reduxjs/toolkit";
import WishListReducer from "./WishListReducer";
import CartReducer from "./CartReducer";

const rootReducer = combineReducers({
    WishListReducer,
    CartReducer
})
const store = configureStore({ reducer: rootReducer })
// const store = legacy_createStore(WishListReducer)

export default store