import axios from 'axios';

// Function to add items to the cart
export const addToCartAPI = async (cartItem, sizeId, setCartItemIds, setCart, setAddingToCart) => {
  setAddingToCart(true);
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/merchant/cartItem`, cartItem, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    const { ID } = response.data.data;
    setCartItemIds(prev => ({ ...prev, [sizeId]: ID })); // Update cart item IDs
    setCart(prevCart => [...prevCart, { ...cartItem, ID }]); // Update local cart state
  } catch (error) {
    console.error('Error adding item to cart:', error);
  } finally {
    setAddingToCart(false); // End loading
  }
};

// Function to remove items from the cart
export const removeFromCartAPI = async (sizeId, cartItemIds, setCart, setCartItemIds,  setRemovingFromCart) => {
  setRemovingFromCart(true);
  const cartItemId = cartItemIds[sizeId];
  if (!cartItemId) return;

  try {
    await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/merchant/cartItem/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    setCart(prevCart => prevCart.filter(item => item.ID !== cartItemId)); // Remove item from local cart
    setCartItemIds(prev => {
      const updatedCartItemIds = { ...prev };
      delete updatedCartItemIds[sizeId]; // Update cart item IDs
      return updatedCartItemIds;
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
  } finally {
    setRemovingFromCart(false); // End loading
  }
};
