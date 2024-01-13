import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategoryOptions,
  fetchPatternsOptions,
  fetchProductOptions,
  fetchUserOptions,
} from "./operations";

const optionsInitialState = {
  options: {},
  userOptions: {},
  categoryOptions: {},
  productOptions: {},
  patterns: {},
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
      .addCase(fetchCategoryOptions.pending, handlePending)
      .addCase(fetchProductOptions.pending, handlePending)
      .addCase(fetchPatternsOptions.pending, handlePending)
      .addCase(fetchUserOptions.rejected, handleRejected)
      .addCase(fetchCategoryOptions.rejected, handleRejected)
      .addCase(fetchProductOptions.rejected, handleRejected)
      .addCase(fetchPatternsOptions.rejected, handleRejected)

      .addCase(fetchUserOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userOptions = action.payload;
      })
      .addCase(fetchCategoryOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.categoryOptions = action.payload;
      })
      .addCase(fetchProductOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.productOptions = action.payload;
      })
      .addCase(fetchPatternsOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.patterns = action.payload.patterns;
      });
  },
});

export const optionsReduser = optionsSlice.reducer;
