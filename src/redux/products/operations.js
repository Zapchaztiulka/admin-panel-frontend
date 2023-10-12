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
