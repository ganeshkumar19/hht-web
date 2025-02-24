// OrderContext.js
import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the OrderContext
const OrderContext = createContext();

// Dummy data for ordersList
const dummyOrders = [
  {
    id: 1,
    orderNumber: 'ORD123456',
    date: '2024-09-25',
    status: 'Delivered',
    total: 2999,
    items: [
      { name: 'T-shirt', quantity: 2, price: 999 },
      { name: 'Sneakers', quantity: 1, price: 1001 }
    ]
  },
  {
    id: 2,
    orderNumber: 'ORD123457',
    date: '2024-09-18',
    status: 'Shipped',
    total: 1599,
    items: [
      { name: 'Cap', quantity: 1, price: 599 },
      { name: 'Jacket', quantity: 1, price: 1000 }
    ]
  }
];

// Create the provider component
export const OrderProvider = ({ children }) => {
  const [ordersList, setOrdersList] = useState(dummyOrders);
  
  {/*useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = localStorage.getItem('access_token'); 
// Adjust as per your token retrieval method
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_API_URL}/merchant/order/user`, // Adjust the URL based on your base URL config
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            }
          }
        );
      } catch (error) {
        
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders(); // Call the function to fetch orders
  }, []);// Initialize with dummy data*/}

  return (
    <OrderContext.Provider value={{ ordersList }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use OrderContext
export const useOrders = () => useContext(OrderContext);
