import ApiClient from '../client';

// Get Order Details by Id
const getOrderDetails = async (orderId) => {
  const { data } = await ApiClient.get(`orders/${orderId}`);
  return data;
};

// get All Orders
const getAllOrders = async ({
  page = 1,
  limit = 20,
  query = '',
  statusId = '',
}) => {
  let url = `orders?page=${page}&limit=${limit}`;
  if (query) {
    url += `&query=${query}`;
  }
  if (statusId) {
    url += `&orderStatusIdx=${statusId}`;
  }
  const { data } = await ApiClient.get(url);
  return data;
};

// Create Order by User
const createOrderByUser = async (orderData) => {
  const { data } = await ApiClient.post('orders', orderData);
  return data;
};

// Update Order
const updateOrder = async ({ orderId, orderData }) => {
  const { data } = await ApiClient.put(`orders/${orderId}`, orderData);
  return data;
};

// Delete Order by User
const deleteOrder = async (idsArray) => {
  const response = await ApiClient.delete(`orders`, {
  data: idsArray
})
  return response
};

export default {
  getOrderDetails,
  updateOrder,
  getAllOrders,
  createOrderByUser,
  deleteOrder,
};
