import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import {
  createOrderByAny,
  updateOrder,
  updateOrderByAdmin,
  deleteOrder,
} from '../orders/operations';

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
  const { success, fail } = notifications || {
    success: 'Success',
    fail: 'Error',
  };

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

const handleReject = (state, { meta, payload }) => {
  let errorMessage = '';
  const { arg, response } = meta || {};

  if (payload?.response?.data?.message) {
    errorMessage = payload?.response?.data?.message;
  } else if (response?.data?.message) {
    errorMessage = response?.data?.message;
  } else {
    const { notifications } = arg;
    if (notifications?.fail) {
      errorMessage = notifications.fail;
    } else {
      errorMessage = 'Unexpected server error';
    }
  }

  state.notifications.push({
    id: new Date().toISOString(),
    message: errorMessage,
    type: 'error',
  });
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

    createTestNotification: (state) => {
      const notification = {
        id: new Date().toISOString(),
        message: 'test error message',
        type: 'error',
      };
      state.notifications.push(notification);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderByAny.rejected, handleReject)
      .addCase(createOrderByAny.fulfilled, handleRequest)
      .addCase(updateOrder.rejected, handleReject)
      .addCase(updateOrder.fulfilled, handleRequest)
      .addCase(updateOrderByAdmin.rejected, handleReject)
      .addCase(updateOrderByAdmin.fulfilled, handleRequest)
      .addCase(deleteOrder.rejected, handleReject)
      .addCase(deleteOrder.fulfilled, handleRequest);
  },
});
const { actions } = notificationsSlice;

export const { addNotification, dismissNotification, createTestNotification } =
  actions;

const selectNotifications = (state) => state.notifications.notifications;

export const useNotifications = () => useSelector(selectNotifications);

export const notificationsReducer = notificationsSlice.reducer;
