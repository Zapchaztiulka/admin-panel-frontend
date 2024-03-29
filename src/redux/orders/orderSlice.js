import { createSlice } from '@reduxjs/toolkit';
import {
  getAllOrders,
  createOrderByUser,
  createOrderByAny,
  updateOrder,
  updateOrderByAdmin,
  deleteOrder,
} from './operations';
import { isAxiosError } from 'axios';

const ordersInitialState = {
  orders: [],
  orderDetails: {},
  totalCount: 0,
  isLoading: false,
  error: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  if (typeof action.payload === 'string') {
    state.error = action.payload;
  } else if (isAxiosError(action.payload)) {
    state.error =
      action.payload?.response?.data?.message || action.payload.message;
  }

  state.isLoading = false;
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: ordersInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, handlePending)
      .addCase(getAllOrders.rejected, handleRejected)
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = [...action.payload.orders];
        state.totalCount = action.payload.totalCount;
      })

      .addCase(createOrderByUser.pending, handlePending)
      .addCase(createOrderByUser.rejected, handleRejected)
      .addCase(createOrderByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
      })

      .addCase(createOrderByAny.pending, handlePending)
      .addCase(createOrderByAny.rejected, handleRejected)
      .addCase(createOrderByAny.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders.push(action.payload);
      })

      .addCase(updateOrder.pending, handlePending)
      .addCase(updateOrder.rejected, handleRejected)
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = state.orders.map((order) => {
          if (order._id === action.payload._id) {
            return { ...order, ...action.payload };
          }
          return order;
        });
      })

      .addCase(updateOrderByAdmin.pending, handlePending)
      .addCase(updateOrderByAdmin.rejected, handleRejected)
      .addCase(updateOrderByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const updatedIds = action.payload.map((i) => i._id);
        state.orders = state.orders.map((order) => {
          if (updatedIds.includes(order._id)) {
            const findedOrder = action.payload.find((i) => i._id === order._id);
            return { ...order, ...findedOrder };
          }

          return order;
        });
      })

      .addCase(deleteOrder.pending, handlePending)
      .addCase(deleteOrder.rejected, handleRejected)
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const deletedIds = action.meta.arg.data.orderIds;

        state.isLoading = false;
        state.error = null;
        const newOrders = state.orders.filter(
          (order) => !deletedIds.includes(order._id)
        );
        state.orders = newOrders;
        state.totalCount = newOrders.length;
      });
  },
});

export const ordersReducer = ordersSlice.reducer;
