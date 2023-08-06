import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../service/apiService";

export const register = createAsyncThunk(
  "auth/register",

  async (data) => {
    try {
      const response = await api.register(data);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const logIn = createAsyncThunk("auth/login", async (data) => {
  try {
    const response = await api.logIn(data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const logOut = createAsyncThunk("auth/logout", async () => {
  try {
    await api.logOut();
  } catch (error) {
    console.log(error);
  }
});
