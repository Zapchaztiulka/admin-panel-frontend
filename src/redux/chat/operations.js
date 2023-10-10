import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getChatRoomsInProgress = createAsyncThunk(
  "chat/getChatRoomsInProgress",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("chats?chatRoomStatus=in progress");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
