import axios from "axios";

axios.defaults.baseURL = "https://spares-backend-i2mq.onrender.com/api/";

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

export const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`products/${productId}`);
  return data;
};
