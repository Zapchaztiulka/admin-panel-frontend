import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./operations";

const optionsInitialState = {
  products: {},
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

export const productsSlice = createSlice({
  name: "products",
  initialState: optionsInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.rejected, handleRejected)

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload;
      });
  },
});

export const productsReduser = productsSlice.reducer;
