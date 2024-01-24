import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { createOrderByAny, updateOrder } from '../orders/operations';

const initialState = {
  notifications: [],
};

const handleRequest = (
  state,
  {
    meta: {
      arg: { notifications },
      requestStatus,
    },
  }
) => {
  const { success, fail } = notifications || { success: 'yes', fail: 'no' };

  if (requestStatus === 'fulfilled') {
    state.notifications.push({
      id: new Date().toISOString(),
      message: success,
    });
  } else {
    state.notifications.push({
      id: new Date().toISOString(),
      message: fail,
      type: 'error',
    });
  }
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      const notification = {
        id: new Date().toISOString(),
        ...payload,
      };
      state.notifications.push(notification);
    },

    dismissNotification: (state, { payload }) => {
      const index = state.notifications.findIndex(
        (notification) => notification.id === payload
      );

      if (index !== -1) {
        state.notifications.splice(index, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderByAny.rejected, handleRequest)
      .addCase(createOrderByAny.fulfilled, handleRequest)
      .addCase(updateOrder.rejected, handleRequest)
      .addCase(updateOrder.fulfilled, handleRequest);
  },
});
const { actions } = notificationsSlice;

export const { addNotification, dismissNotification } = actions;

const selectNotifications = (state) => state.notifications.notifications;

export const useNotifications = () => useSelector(selectNotifications);

export const notificationsReducer = notificationsSlice.reducer;
