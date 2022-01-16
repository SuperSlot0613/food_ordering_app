import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../feature/navSlice";


export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
});

