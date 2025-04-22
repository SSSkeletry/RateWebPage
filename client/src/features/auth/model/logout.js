import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
});
