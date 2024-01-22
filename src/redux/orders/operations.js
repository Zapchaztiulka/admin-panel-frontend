import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/api";

export const getAllOrders = createAsyncThunk(
    "orders/getAllOrders",
    async (data, thunkAPI) => {
      try {
        const response = await api.order.getAllOrders(data);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);
  
export const getOrderDetails = createAsyncThunk(
    "orders/getOrderDetails",
    async (orderId, thunkAPI) => {
      try {
        const response = await api.order.getOrderDetails(orderId);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);
  
export const createOrderByUser = createAsyncThunk(
    "orders/createOrderByUser",
    async (data, thunkAPI) => {
      try {
        const response = await api.order.createOrderByUser(data);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const createOrderByAny = createAsyncThunk(
  "orders/createOrderByAny",
  async (data, thunkAPI) => {
    try {
      const response = await api.order.createOrderByAny(data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
  
export const updateOrder = createAsyncThunk(
    "orders/updateOrder",
    async (data, thunkAPI) => {
      try {
        const response = await api.order.updateOrder(data);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

export const deleteOrder = createAsyncThunk(
    "orders/deleteOrder",
    async (data, thunkAPI) => {
      try {
        const response = await api.order.deleteOrder(data);
        return  response

      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);