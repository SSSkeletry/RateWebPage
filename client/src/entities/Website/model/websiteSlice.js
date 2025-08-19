import { createSlice } from "@reduxjs/toolkit";
import { fetchWebsites } from "./fetchWebsites";

const websitesSlice = createSlice({
  name: "websites",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebsites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWebsites.fulfilled, (state, action) => {
        console.log("📡 fetchWebsites data:", action.payload);
        state.status = "succeeded";
        state.list = action.payload;
      })

      .addCase(fetchWebsites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default websitesSlice.reducer;
