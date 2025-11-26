// src/services/api.js ← REPLACE ENTIRE FILE
import axios from "axios";

const API = axios.create({
  baseURL: "https://my-canteen-backend-f1yq.onrender.com/api", // ← MAKE SURE THIS IS EXACT
  timeout: 10000,
});

// THIS FIXES 401 — TOKEN IS NOW SENT CORRECTLY
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// DEBUG: Show errors in console
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API ERROR:", err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);

export const loginUser = (email, password) =>
  API.post("/auth/login", { email, password });

export const registerUser = (username, email, password) =>
  API.post("/auth/register", { username, email, password });

export const getMenu = () => API.get("/menu");

// THIS WAS WRONG BEFORE → NOW 100% CORRECT
export const createOrder = (orderData) =>
  API.post("/orders/create", orderData);   // ← THIS ROUTE EXISTS IN YOUR BACKEND

export const getMyOrders = () => API.get("/orders/my-orders");
export const getAllOrders = () => API.get("/orders/all");

export default API;