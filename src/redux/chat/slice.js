import { createSlice } from "@reduxjs/toolkit";
import { getChatRoomsInProgress } from "./operations";
import { updateUserStatus } from "./actions";

const handlePending = (state) => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  chatRooms: [],
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(getChatRoomsInProgress.pending, handlePending)
      .addCase(getChatRoomsInProgress.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getChatRoomsInProgress.rejected, handleRejected)

      .addCase(updateUserStatus, (state, { payload }) => {
        const { userId, isOnline } = payload;
        const chatRoom = state.chatRooms.find((room) => room.userId === userId);
        if (chatRoom) {
          chatRoom.isOnline = isOnline;
        }
      });
  },
});

export const chatReducer = chatSlice.reducer;
