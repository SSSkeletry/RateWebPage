import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/model";
import userReducer from "../../entities/user/model";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
