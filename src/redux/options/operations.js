import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../service/apiService";

export const fetchUserOptions = createAsyncThunk(
  "options/user",

  async (_, thunkAPI) => {
    try {
      const response = await api.fetchUserOptins();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
