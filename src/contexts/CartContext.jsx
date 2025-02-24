import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchCartData } from '../apifunctions/fetchCart';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);  // Store cart ID

  // Now only using 'access_token', no need for guest/regular distinction
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

  useEffect(() => {
    const getCartData = async () => {
      
      if (!accessToken) {
        return; // Return early if there's no access token
      }

      try {
        const cartData = await fetchCartData(accessToken);
        setCartId(cartData.ID); // Set cart ID
        setCart(cartData.items || []); // Set cart items
      } catch (error) {
      }
    };

    getCartData(); // Call the function to fetch cart data
  }, [accessToken]); // Run effect when the token changes

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.ID !== id));
  };

  // Expose a way to update the token (e.g., after guest or regular login)
  const setNewAccessToken = (token) => {
    localStorage.setItem('access_token', token); // Always store the token as 'access_token'
    setAccessToken(token); // Update the token in state
  };

  const value = {
    cart,
    setCart,
    cartId, 
    setCartId, // Provide cartId to consumers
    removeFromCart,
    setNewAccessToken, // Expose function to update access token
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
