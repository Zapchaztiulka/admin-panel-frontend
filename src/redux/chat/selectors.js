export const selectChatRooms = (state) => state.chat.chatRooms;

export const selectActiveChatRoom = (state, roomId) =>
  state.chat.chatRooms.find((room) => room._id === roomId);
