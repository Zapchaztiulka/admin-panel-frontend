import ApiClient from '../client';

//operations with products

const fetchProductById = async (productId) => {
  const { data } = await ApiClient.get(`products/${productId}`);
  return data;
};

const addProducts = async (product) => {
  const { data } = await ApiClient.post('products/add', product);
  return data;
};

const updateProduct = async ({ productId, price }) => {
  const { data } = await ApiClient.patch(`products/${productId}`, {price});
  return data;
};

const updateProductsPrice = async ({productsIds}) => {
  const { data } = await ApiClient.patch(`products/update/price-dates`, {
    productIds: productsIds,
  });
  return data;
};

const deleteProducts = async ({productIds}) => {
  const { data } = await ApiClient.delete(`products`, { data: {productIds} });
  return data;
};

const fetchProducts = async ({
  page = 1,
  limit = 10,
  query = '',
  statusId = '',
}) => {
  const { data } = await ApiClient.post(
    `products?page=${page}&limit=${limit}&query=${query}&productStatusIdx=${statusId}`
  );
  return data;
};

export default {
  fetchProductById,
  addProducts,
  updateProduct,
  deleteProducts,
  fetchProducts,
  updateProductsPrice,
};
