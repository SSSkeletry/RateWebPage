import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "shared/api/axiosInstance";
import { logout } from "features/Auth/model/logout";

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        dispatch(logout());
      }

      const message =
        error.response?.data?.message || error.message || "Ошибка запроса";
      return rejectWithValue(message);
    }
  }
);
