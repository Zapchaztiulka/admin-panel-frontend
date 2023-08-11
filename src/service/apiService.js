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
