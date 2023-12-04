import ApiClient from '../client'

//operations with products

const fetchProductById = async (productId) => {
    const { data } = await ApiClient.get(`products/${productId}`);
    return data;
};

const addProducts = async (product) => {
    const { data } = await ApiClient.post("products/add", product);
    return data;
};

const updateProduct = async (productId, product) => {
    const { data } = await ApiClient.patch(`products/${productId}`, product);
    return data;
};

const deleteProductById = async (productId) => {
    const { data } = await ApiClient.delete(`products/${productId}`);
    return data;
};

const deleteMultipleProducts = async (products) => {
    const { data } = await ApiClient.delete(`products/`, products);
    return data;
};

const fetchProducts = async ({ page = 1, limit = 10, query = "" }) => {
    const { data } = await ApiClient.get(
        `products?page=${page}&limit=${limit}&query=${query}`
    );
    return data;
};

export default {
    fetchProductById, addProducts, updateProduct,
    deleteProductById, deleteMultipleProducts, fetchProducts
}