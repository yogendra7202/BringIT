import { combineReducers, configureStore, createStore, legacy_createStore } from "@reduxjs/toolkit";
import WishListReducer from "./WishListReducer";
import CartReducer from "./CartReducer";
import AddressReducer from "./AddressReducer";

const rootReducer = combineReducers({
    WishListReducer,
    CartReducer,
    AddressReducer
})
// const store = configureStore({ reducer: rootReducer })
const store = createStore(rootReducer)

export default store