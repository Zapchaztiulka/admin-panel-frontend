import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

const ApiClient = axios;
export  { setAuthHeader, clearAuthHeader }
export default ApiClient 