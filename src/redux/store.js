import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./reducers";

const composeEnhancers =
  typeof window === "object" &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const Store = configureStore({ reducer: allReducers }, composeEnhancers);

export default Store;
