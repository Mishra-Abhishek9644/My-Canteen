// src/services/api.js ← FINAL VERSION
import axios from "axios";

const API = axios.create({
  baseURL: "https://my-canteen-backend-f1yq.onrender.com/api",
});

// Attach Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Prevent frontend crash if backend blocks
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 || err.response?.status === 404) {
      return Promise.resolve({ data: [] });
    }
    return Promise.reject(err);
  }
);

// ================== AUTH ==================
export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });

export const registerUser = (username, email, password) =>
  API.post("/auth/register", { username, email, password });

// ================== ORDERS ==================
export const getAllOrders = () => API.get("/orders/all");
export const getMyOrders = () => API.get("/orders/my-orders");
export const createOrder = (data) => API.post("/orders/create", data);

export const updateOrder = (id, status) =>
  API.put(`/orders/${id}/status`, { status });

export const cancelOrderApi = (id) =>
  API.put(`/orders/${id}/cancel`);

export const getMenu = () => API.get("/menu");

// ================== FEEDBACK ==================
export const submitFeedback = (rating, comment) =>
  API.post("/feedback", { rating, comment });

export const getMyFeedbacks = () => API.get("/feedback/mine");

export const getAllFeedbacks = () => API.get("/feedback/all");

// ================== MESSAGES ==================
export const submitMessageApi = (msg) =>
  API.post("/messages", msg);

export const getAllMessages = () => API.get("/messages/all");

export default {
  loginUser,
  registerUser,
  getAllOrders,
  getMyOrders,
  createOrder,
  updateOrder,
  cancelOrderApi,
  getMenu,
  submitFeedback,
  getMyFeedbacks,
  getAllFeedbacks,
  submitMessageApi,
  getAllMessages
};
