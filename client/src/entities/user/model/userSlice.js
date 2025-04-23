import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "./fetchCurrentUser";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    websites: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.websites = action.payload.websites || [];
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch user";
      });
  },
});

export default userSlice.reducer;
