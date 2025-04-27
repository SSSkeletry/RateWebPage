import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/Auth/model";
import userReducer from "entities/User/model";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
