import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../service/apiService";

export const register = createAsyncThunk(
  "auth/register",

  async (data, thunkAPI) => {
    try {
      const response = await api.register(data);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await api.logIn(data);
    console.log(response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.logOut();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
