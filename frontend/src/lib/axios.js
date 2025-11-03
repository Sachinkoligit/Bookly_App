import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://bookly-app-vkj1.onrender.com/api",
  withCredentials: true,
});
