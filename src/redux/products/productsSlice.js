import { createSlice } from '@reduxjs/toolkit';
import {
  deleteProducts,
  fetchProducts,
  updateProduct,
  updateProductsPrice,
} from './operations';

const optionsInitialState = {
  products: [],
  isLoading: false,
  error: null,
  totalCount: 0,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const productsSlice = createSlice({
  name: 'products',
  initialState: optionsInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(deleteProducts.pending, handlePending)
      .addCase(updateProduct.pending, handlePending)
      .addCase(updateProductsPrice.pending, handlePending)
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(deleteProducts.rejected, handleRejected)
      .addCase(updateProduct.rejected, handleRejected)
      .addCase(updateProductsPrice.rejected, handleRejected)

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload.products;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter((item) => {
          return !action.meta.arg.productIds.includes(item._id);
        });
        state.isLoading = false;
        state.error = null;
        state.totalCount = state.products.length;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((item) =>
          item._id === action.payload._id
            ? { ...item, ...action.payload }
            : item
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateProductsPrice.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const productsReduser = productsSlice.reducer;
