import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/api";

export const fetchUserOptions = createAsyncThunk(
  "options/user",

  async (_, thunkAPI) => {
    try {
      const response = await api.options.fetchOptions("user");
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
      const response = await api.options.fetchOptions("category");
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
      const response = await api.options.fetchOptions("product");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchPatternsOptions = createAsyncThunk(
  "options/patterns",

  async (_, thunkAPI) => {
    try {
      const response = await api.options.fetchOptions("patterns");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
