import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";

const authInitialState = {
  user: {
    id: null,
    username: null,
    userSurname: null,
    email: null,
    phone: null,
    role: null,
    token: null,
  },
  token: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: true,
};

const handlePending = (state) => {
  state.isLoading = true;
};
export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  extraReducers: (biulder) => {
    biulder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = authInitialState.user;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
