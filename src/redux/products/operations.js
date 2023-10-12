import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../service/apiService";

export const fetchProducts = createAsyncThunk(
  "products/fetchProduct",

  async (data, thunkAPI) => {
    try {
      const response = await api.fetchProducts(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "products/deleteProductByID",

  async (productId, thunkAPI) => {
    try {
      const response = await api.deleteProductById(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteMultipleProducts = createAsyncThunk(
  "products/deleteMultipleProducts",

  async (products, thunkAPI) => {
    try {
      const response = await api.deleteMultipleProducts(products);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
