import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../service/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProduct',

  async (data, thunkAPI) => {
    try {
      const response = await api.product.fetchProducts(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message, error);
    }
  }
);

export const deleteProductById = createAsyncThunk(
  'products/deleteProductByID',

  async (productId, thunkAPI) => {
    try {
      const response = await api.product.deleteProductById(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message, error);
    }
  }
);

export const deleteMultipleProducts = createAsyncThunk(
  'products/deleteMultipleProducts',

  async (products, thunkAPI) => {
    try {
      const response = await api.product.deleteMultipleProducts(products);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message, error);
    }
  }
);
