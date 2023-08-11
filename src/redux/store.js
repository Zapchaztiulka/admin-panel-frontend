import { configureStore } from "@reduxjs/toolkit";
// import { rootReducer } from "./reducer";
import { authReducer } from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
