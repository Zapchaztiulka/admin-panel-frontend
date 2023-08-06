import axios from "axios";

axios.defaults.baseURL = "https://spares-backend-i2mq.onrender.com/api/";

//operations with users

export const signUp = async (credentials) => {
  const { data } = await axios.post("users/register", credentials);
  return data;
};

export const logIn = async (credentials) => {
  const { data } = await axios.post("users/login", credentials);
  return data;
};

export const logOut = async () => {
  await axios.post("users/logout");
};
