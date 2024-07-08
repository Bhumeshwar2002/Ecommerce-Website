import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk'; // Import thunk directly
// import thunk from "./store.js"; // Import thunk directly

import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailReducer, productReducer } from "./reducers/productReducers";
// import ProductDetails from "./component/Product/ProductDetails";

const reducer = combineReducers({
  products:productReducer,
  productDetails:productDetailReducer
});

let initialState = {};

const Middleware =[thunk];


const store = configureStore({
  reducer,
  initialState,
  // Middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(Middleware),
  // devTools: composeWithDevTools(),
  // preloadedState: initialState
  Middleware,
  devTools: composeWithDevTools(),
});
// const store = configureStore({
//   reducer,
//   initialState,
//   Middleware: (getDefaultMiddleware) =>
//     composeWithDevTools(applyMiddleware(...Middleware))
// });
composeWithDevTools(applyMiddleware(...Middleware))
export default store;


