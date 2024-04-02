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

export const updateProduct = createAsyncThunk(
  'products/update',

  async (data, thunkAPI) => {
    try {
      const response = await api.product.updateProduct(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message, error);
    }
  }
);

export const updateProductsPrice = createAsyncThunk(
  'products/updatePrice',

  async (data, thunkAPI) => {
    try {
      const response = await api.product.updateProductsPrice(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message, error);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  'products/deleteProducts',

  async (productIds, thunkAPI) => {
    try {
      const response = await api.product.deleteProducts(productIds);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message, error);
    }
  }
);

