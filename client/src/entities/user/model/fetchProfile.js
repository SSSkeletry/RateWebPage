import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "shared/api/axiosInstance";

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/me");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);
