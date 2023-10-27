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

export const closeChatRoom = createAsyncThunk(
  "chat/closeChat",
  async ({ chatRoomId, userId }, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/chats/chatRoom/${chatRoomId}`, {
        userId,
      });
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const sendFile = async (formData) => {
  try {
    const { data } = await axios.post("/chats/uploadChatImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (e) {
    return e.message;
  }
};
