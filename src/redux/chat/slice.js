import { createSlice } from "@reduxjs/toolkit";
import { getChatRoomsInProgress } from "./operations";
import {
  updateUserStatus,
  updateIsChatRoomOpen,
  updateManager,
  addMessage,
} from "./actions";

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

      // slices to connect to database
      .addCase(getChatRoomsInProgress.pending, handlePending)
      .addCase(getChatRoomsInProgress.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getChatRoomsInProgress.rejected, handleRejected)

      // slices to update only Redux state
      .addCase(updateManager, (state, { payload }) => {
        const {
          roomId,
          manager: { id, username, userSurname },
          isChatRoomProcessed,
        } = payload;

        const roomIndex = state.chatRooms.findIndex(
          (room) => room._id === roomId
        );

        if (roomIndex !== -1) {
          state.chatRooms[roomIndex].managerId = id;
          state.chatRooms[roomIndex].managerName = username;
          state.chatRooms[roomIndex].managerSurname = userSurname;
          state.chatRooms[roomIndex].isChatRoomProcessed = isChatRoomProcessed;
        }
      })

      .addCase(updateUserStatus, (state, { payload }) => {
        const { userId, isOnline } = payload;
        const chatRoom = state.chatRooms.find((room) => room.userId === userId);
        if (chatRoom) {
          chatRoom.isOnline = isOnline;
        }
      })

      .addCase(updateIsChatRoomOpen, (state, { payload }) => {
        const { userId, isChatRoomOpen } = payload;
        const chatRoom = state.chatRooms.find((room) => room.userId === userId);
        if (chatRoom) {
          chatRoom.isChatRoomOpen = isChatRoomOpen;
        }
      })

      .addCase(addMessage, (state, { payload }) => {
        const { roomId, message } = payload;

        state.chatRooms = state.chatRooms.map((room) => {
          if (room._id === roomId) {
            return {
              ...room,
              messages: [...room.messages, message],
            };
          }
          return room;
        });
      });
  },
});

export const chatReducer = chatSlice.reducer;
