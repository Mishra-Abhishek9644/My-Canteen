// src/services/api.js  ← REPLACE YOUR CURRENT ONE
import axios from "axios";

const API = axios.create({
  baseURL: "https://my-canteen-backend-f1yq.onrender.com/api",
});

// Auto-attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handler — log to console for debug
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.response?.data || err.message);  // ← DEBUG LOG
    return Promise.reject(err);
  }
);

export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });

export const registerUser = (username, email, password) =>
  API.post("/auth/register", { username, email, password });

export const getMenu = () => API.get("/menu");

export const createOrder = (orderData) => API.post("/orders/create", orderData);

export const getMyOrders = () => API.get("/orders/my-orders");

export const getAllOrders = () => API.get("/orders/all");

export default API;