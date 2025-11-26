// src/services/api.js   ← CREATE THIS FILE NOW
import axios from "axios";

const API = axios.create({
  baseURL: "https://my-canteen-backend-f1yq.onrender.com/api",
  timeout: 10000,
});

// Auto-attach JWT token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });

export const registerUser = (username, email, password) =>
  API.post("/auth/register", { username, email, password });

export const getMenu = () => API.get("/menu");

export const createOrder = (orderData) =>
  API.post("/orders/create", orderData);

export const getMyOrders = () => API.get("/orders/my-orders");

export const getAllOrders = () => API.get("/orders/all"); // for admin

export default API;