import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk'; // Import thunk directly
// import thunk from "./store.js"; // Import thunk directly

import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  products:productReducer
});

let initialState = {};

const Middleware = [thunk];


const store = configureStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;

