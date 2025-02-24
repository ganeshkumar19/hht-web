import axios from 'axios';

// Fetch existing cart data
export const fetchCartData = async (accessToken) => {
  // Check if accessToken is null or undefined
  if (!accessToken) {
    return; // Return null or handle as needed
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/merchant/cart/user`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return response.data.data; // Return the cart data
  } catch (error) {
    console.error('Error fetching cart data:', error);
    throw error; // Handle error appropriately
  }
};
