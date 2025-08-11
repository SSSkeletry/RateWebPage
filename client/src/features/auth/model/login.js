import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, recaptchaToken }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
        recaptchaToken,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Unknown error" }
      );
    }
  }
);
