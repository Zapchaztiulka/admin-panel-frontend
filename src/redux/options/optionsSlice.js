import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategoryOptions,
  fetchProductOptions,
  fetchUserOptions,
} from "./operations";

const optionsInitialState = {
  options: {},
  userOptions: {},
  categoryOptions: {},
  productOptions: {},
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
      .addCase(fetchUserOptions.rejected, handleRejected)
      .addCase(fetchCategoryOptions.rejected, handleRejected)
      .addCase(fetchProductOptions.rejected, handleRejected)

      .addCase(fetchUserOptions.fulfilled, (state, action) => {
        console.log("state", state);
        console.log("action", action);
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
      });
  },
});

export const optionsReduser = optionsSlice.reducer;
