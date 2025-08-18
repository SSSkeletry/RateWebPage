import { configureStore } from "@reduxjs/toolkit";
import authReducer from "features/Auth/model";
import userReducer from "entities/User/model";
import websiteReducer from "entities/Website/model";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    websites: websiteReducer,
  },
});
