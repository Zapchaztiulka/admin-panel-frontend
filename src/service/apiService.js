import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

//operations with users

export const register = async (credentials) => {
  const { data } = await axios.post("users/register", credentials);
  setAuthHeader(data.token);
  return data;
};

export const logIn = async (credentials) => {
  const { data } = await axios.post("users/login", credentials);
  setAuthHeader(data.token);
  return data;
};

export const logOut = async () => {
  await axios.post("users/logout");
  clearAuthHeader();
};

export const refreshUser = async (token) => {
  setAuthHeader(token);
  const { data } = await axios.get("users/current");
  return data;
};

//operations with products

export const fetchProductById = async (productId) => {
  const { data } = await axios.get(`products/${productId}`);
  return data;
};

export const addProduct = async (product) => {
  const { data } = await axios.post("products", product);
  return data;
};

export const updateProduct = async (productId, product) => {
  const { data } = await axios.patch(`products/${productId}`, product);
  return data;
};

export const deleteProductById = async (productId) => {
  const { data } = await axios.delete(`products/${productId}`);
  return data;
};

export const deleteMultipleProducts = async (products) => {
  const { data } = await axios.delete(`products/`, products);
  return data;
};

export const fetchProducts = async ({ page = 1, limit = 10, query = "" }) => {
  const { data } = await axios.get(
    `products?page=${page}&limit=${limit}&query=${query}`
  );
  return data;
};

//operations with categories

export const getAllCategories = async () => {
  const { data } = await axios.get("categories");
  return data.categories;
};

//operations with options

export const fetchOptins = async (endpoint) => {
  const { data } = await axios.get(`options/${endpoint}`);
  return data;
};
