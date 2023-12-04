import ApiClient from '../client'

// get Order by Id
const fetchOrderById = async (orderId) => {
    const { data } = await ApiClient.get(`orders/${orderId}`);
    return data;
};

// get All Orders 
const fetchOrders = async ({ page = 1, limit = 10, query = "" }) => {
    const { data } = await ApiClient.get(
        `orders?page=${page}&limit=${limit}&query=${query}`
    );
    return data;
};

const addOrder = async (orderData) => {
    const { data } = await ApiClient.post("orders/add", orderData);
    return data;
};

const updateOrder = async (orderId, orderData) => {
    const { data } = await ApiClient.patch(`orders/${orderId}`, orderData);
    return data;
};

const deleteOrderById = async (orderId) => {
    const { data } = await ApiClient.delete(`orders/${orderId}`);
    return data;
};

export default {
    fetchOrderById, updateOrder, deleteOrderById, addOrder, fetchOrders
}