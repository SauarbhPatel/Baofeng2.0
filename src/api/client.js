import axios from 'axios';

const API_BASE_URL = 'https://api.baofeng.com'; // Change this to your API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = await AsyncStorage.getItem('userToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - logout user
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (phoneNumber) =>
    apiClient.post('/auth/login', { phoneNumber }),
  
  verifyOtp: (phoneNumber, otp) =>
    apiClient.post('/auth/verify-otp', { phoneNumber, otp }),
  
  resendOtp: (phoneNumber) =>
    apiClient.post('/auth/resend-otp', { phoneNumber }),
};

export const productAPI = {
  getProducts: (limit = 20, offset = 0) =>
    apiClient.get('/products', { params: { limit, offset } }),
  
  getProductDetail: (productId) =>
    apiClient.get(`/products/${productId}`),
  
  getCategories: () =>
    apiClient.get('/categories'),
  
  searchProducts: (query) =>
    apiClient.get('/products/search', { params: { q: query } }),
};

export const cartAPI = {
  getCart: () =>
    apiClient.get('/cart'),
  
  addToCart: (productId, quantity) =>
    apiClient.post('/cart/add', { productId, quantity }),
  
  removeFromCart: (productId) =>
    apiClient.delete(`/cart/${productId}`),
  
  updateCart: (productId, quantity) =>
    apiClient.put(`/cart/${productId}`, { quantity }),
};

export const orderAPI = {
  getOrders: (status = null) =>
    apiClient.get('/orders', { params: { status } }),
  
  getOrderDetail: (orderId) =>
    apiClient.get(`/orders/${orderId}`),
  
  createOrder: (orderData) =>
    apiClient.post('/orders', orderData),
  
  cancelOrder: (orderId) =>
    apiClient.post(`/orders/${orderId}/cancel`),
};

export const userAPI = {
  getProfile: () =>
    apiClient.get('/user/profile'),
  
  updateProfile: (profileData) =>
    apiClient.put('/user/profile', profileData),
  
  getAddresses: () =>
    apiClient.get('/user/addresses'),
  
  addAddress: (addressData) =>
    apiClient.post('/user/addresses', addressData),
};

export default apiClient;
