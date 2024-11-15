import axios from "axios";

// export const BASE_URL = "http://16.170.215.79:4000/api/v1/"
export const BASE_URL = "http://16.171.25.99:5200/";

const dataservice = axios.create({
  baseURL: BASE_URL,
});

dataservice.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default dataservice;
