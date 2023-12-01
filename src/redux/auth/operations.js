import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/api";
import { toast } from "react-toastify";
import { Error } from "../../utils/icons";

export const register = createAsyncThunk(
  "auth/register",

  async (data, thunkAPI) => {
    try {
      const response = await api.users.register(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logIn = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const response = await api.users.logIn(data);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      toast.error("Неправильний логін чи пароль", {
        draggable: false,
        icon: Error,
      })
    );
  }
});

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await api.users.logOut();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;
    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      const response = await api.users.refreshUser(persistedToken);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
