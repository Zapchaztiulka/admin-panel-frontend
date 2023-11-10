export const selectChatRooms = (state) => state.chat.chatRooms;

export const selectSelectedRoomId = (state) => state.chat.selectedRoomId;

export const selectActiveChatRoom = (state, roomId) =>
  state.chat.chatRooms.find((room) => room._id === roomId);
