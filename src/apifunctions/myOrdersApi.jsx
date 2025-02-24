import axios from 'axios';

// Fetch orders for logged-in users
export const fetchLoggedInUserOrders = async (page = 0, token) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/merchant/order/user/5/${page}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  return response.data;
};

// Fetch guest orders with pagination
export const fetchGuestOrders = async (page = 0, email, phone) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/merchant/order/guest/5/${page}`, {
    params: {
      email,
      phone,
    },
  });
  return response.data;
};
