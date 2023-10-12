export const updateUserStatus = (userId, isOnline) => ({
  type: "UPDATE_USER_STATUS",
  payload: { userId, isOnline },
});
