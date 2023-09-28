import { createSlice } from "@reduxjs/toolkit";
import { fetchUserOptions } from "./operations";

const optionsInitialState = {
  options: {},
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const optionsSlice = createSlice({
  name: "options",
  initialState: optionsInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOptions.pending, handlePending)
      .addCase(fetchUserOptions.rejected, handleRejected)
      .addCase(fetchUserOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.options = action.payload;
      });
  },
});

export const optionsReduser = optionsSlice.reducer;
