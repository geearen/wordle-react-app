import { configureStore } from "@reduxjs/toolkit";
import allReducers from "./reducers";

const Store = configureStore({ reducer: allReducers });

export default Store;
