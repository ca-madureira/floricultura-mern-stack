// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth-slice";
import cartReducer from "./cart-slice";

const store = configureStore({
  reducer: {
    user: authReducer,
    cart: cartReducer,
  },
});

export default store;
