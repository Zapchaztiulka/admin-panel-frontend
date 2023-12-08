import ApiClient from '../client'

// Get Order Details by Id
const getOrderDetails = async (orderId) => {
    const { data } = await ApiClient.get(`orders/${orderId}`);
    return data;
};

// get All Orders 
const getAllOrders = async ({ page = 1, limit = 10, query = "" }) => {
    const { data } = await ApiClient.get(
        `orders?page=${page}&limit=${limit}&query=${query}`
    );
    return data;
};

// Create Order by User
const createOrderByUser = async (orderData) => {
    const { data } = await ApiClient.post("orders", orderData);
    return data;
};

// Update Order
const updateOrder = async ({ orderId, orderData }) => {
    const { data } = await ApiClient.put(`orders/${orderId}`, orderData);
    return data;
};

// Delete Order by User
const deleteOrder = async (orderId) => {
    const { data } = await ApiClient.delete(`orders/${orderId}`);
    return data;
};

export default {
    getOrderDetails, updateOrder, getAllOrders, createOrderByUser, deleteOrder
}