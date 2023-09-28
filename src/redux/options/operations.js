import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../service/apiService";

export const fetchUserOptions = createAsyncThunk(
  "options/user",

  async (_, thunkAPI) => {
    try {
      const response = await api.fetchOptins("user");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategoryOptions = createAsyncThunk(
  "options/category",

  async (_, thunkAPI) => {
    try {
      const response = await api.fetchOptins("category");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductOptions = createAsyncThunk(
  "options/product",

  async (_, thunkAPI) => {
    try {
      const response = await api.fetchOptins("product");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
