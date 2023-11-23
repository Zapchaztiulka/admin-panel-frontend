import { createSlice } from "@reduxjs/toolkit";
import { getChatRoomsInProgress, closeChatRoom } from "./operations";
import {
  createChatByUser,
  updateUserStatus,
  updateIsChatRoomOpen,
  updateIsLeavePage,
  updateManager,
  disconnectManager,
  closeChat,
  addMessage,
  selectRoom,
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
  selectedRoomId: null,
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

      .addCase(closeChatRoom.pending, handlePending)
      .addCase(closeChatRoom.fulfilled, (state, { payload }) => {
        const roomIndex = state.chatRooms.findIndex(
          (room) => room._id === payload.roomId
        );

        if (roomIndex !== -1) {
          state.chatRooms[roomIndex].chatRoomStatus = "completed";
          state.chatRooms[roomIndex].isChatRoomProcessed = false;
        }

        state.isLoading = false;
        state.error = null;
      })
      .addCase(closeChatRoom.rejected, handleRejected)

      // slices to update only Redux state
      .addCase(createChatByUser, (state, { payload }) => {
        const { room, isOnline, isChatRoomOpen, username, userSurname } =
          payload;
        const newRoom = {
          ...room,
          isOnline,
          isChatRoomOpen,
          username,
          userSurname,
        };
        state.chatRooms.push(newRoom);
      })

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

      .addCase(disconnectManager, (state, { payload }) => {
        state.chatRooms = state.chatRooms.map((chatRoom) => {
          const roomIndex = payload.findIndex(
            (room) => room._id === chatRoom._id
          );

          if (roomIndex !== -1) {
            return {
              ...chatRoom,
              managerId: "",
              managerName: "",
              managerSurname: "",
              isChatRoomProcessed: false,
            };
          }

          return chatRoom;
        });
      })

      .addCase(updateUserStatus, (state, { payload }) => {
        const { userId, isOnline } = payload;
        const chatRoom = state.chatRooms.find(
          (room) =>
            room.userId === userId && room.chatRoomStatus === "in progress"
        );
        if (chatRoom) {
          chatRoom.isOnline = isOnline;
        }
      })

      .addCase(updateIsChatRoomOpen, (state, { payload }) => {
        const { userId, isChatRoomOpen } = payload;
        const chatRoom = state.chatRooms.find(
          (room) =>
            room.userId === userId && room.chatRoomStatus === "in progress"
        );
        if (chatRoom) {
          chatRoom.isChatRoomOpen = isChatRoomOpen;
        }
      })

      .addCase(updateIsLeavePage, (state, { payload }) => {
        const { userId, isLeavePage } = payload;
        const chatRoom = state.chatRooms.find(
          (room) =>
            room.userId === userId && room.chatRoomStatus === "in progress"
        );
        if (chatRoom) {
          chatRoom.isLeavePage = isLeavePage;
        }
      })

      .addCase(closeChat, (state, { payload }) => {
        const chatRoom = state.chatRooms.find(
          (room) => room._id === payload.room._id
        );
        if (chatRoom) {
          chatRoom.chatRoomStatus = "completed";
          chatRoom.isChatRoomOpen = false;
          chatRoom.isChatRoomProcessed = false;
          chatRoom.isOnline = false;
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
      })

      .addCase(selectRoom, (state, { payload }) => {
        state.selectedRoomId = payload;
      });
  },
});

export const chatReducer = chatSlice.reducer;
