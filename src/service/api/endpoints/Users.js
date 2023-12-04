
import ApiClient, { setAuthHeader, clearAuthHeader } from '../client'

//operations with users

const register = async (credentials) => {
  const { data } = await ApiClient.post("users/register", credentials);
  setAuthHeader(data.token);
  return data;
};

const logIn = async (credentials) => {
  const { data } = await ApiClient.post("users/login", credentials);
  setAuthHeader(data.token);
  return data;
};

const logOut = async () => {
  await ApiClient.post("users/logout");
  clearAuthHeader();
};

const refreshUser = async (token) => {
  setAuthHeader(token);
  const { data } = await ApiClient.get("users/current");
  return data;
};


export default {
  register, logIn, logOut, refreshUser
};