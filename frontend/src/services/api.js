import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Product endpoints
  getAllProducts: () => axios.get(`${API_URL}/products`),
  getProductById: (id) => axios.get(`${API_URL}/products/${id}`),
  searchProducts: (query) => axios.get(`${API_URL}/products/search?query=${query}`),
  createProduct: (data, token) =>
    axios.post(`${API_URL}/products`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // User endpoints
  registerUser: (data) => axios.post(`${API_URL}/users/register`, data),
  loginUser: (data) => axios.post(`${API_URL}/users/login`, data),
  getUserProfile: (token) =>
    axios.get(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Cart endpoints
  getCart: (token) =>
    axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  addToCart: (data, token) =>
    axios.post(`${API_URL}/cart`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  removeFromCart: (productId, token) =>
    axios.delete(`${API_URL}/cart/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  clearCart: (token) =>
    axios.delete(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  // Order endpoints
  createOrder: (data, token) =>
    axios.post(`${API_URL}/orders`, data, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  getUserOrders: (token) =>
    axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    }),
  getOrderDetails: (orderId, token) =>
    axios.get(`${API_URL}/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
};
