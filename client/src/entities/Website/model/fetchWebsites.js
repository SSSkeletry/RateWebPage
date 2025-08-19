import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "shared/api/axiosInstance";

export const fetchWebsites = createAsyncThunk(
  "websites/fetchWebsites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/websites");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Ошибка запроса";
      return rejectWithValue(message);
    }
  }
);
