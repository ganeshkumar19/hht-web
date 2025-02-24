import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);

    const updateUserDetails = (newDetails) => {
        setUserDetails(prevDetails => ({ ...prevDetails, ...newDetails }));
    };

    const addAddress = async (newAddress) => {
      const existingHome = userDetails?.addresses?.find(address => address.category === 'Home') || false;
      const existingWork = userDetails?.addresses?.find(address => address.category === 'Work') || false;
    
      // Validate that only one "Home" or "Work" address can be added
      if (newAddress.category === 'Home' && existingHome) {
        toast.error('Only one address can be added in the Home category. Kindly add multiple addresses in Others Category.');
        return;
      }
    
      if (newAddress.category === 'Work' && existingWork) {
        toast.error('Only one address can be added in the Work category. Kindly add multiple addresses in Others.');
        return;
      }
    
      const isPrimary = userDetails?.addresses?.length === 0 || false;
      const userId = localStorage.getItem('userId'); // Get the unified user ID
      const token = localStorage.getItem('access_token'); // Now only get the access_token
    
      // Construct the body of the request
      const addressPayload = {
        user_id: userDetails?.id || userId,
        is_primary: isPrimary,
        line1: newAddress.line1,
        line2: newAddress.line2,
        city: newAddress.city,
        state: newAddress.state,
        country: newAddress.country,
        pincode: newAddress.pincode,
        status: "active",
        category: newAddress.category,
        landmark: newAddress.landmark,
        contact_no: newAddress.contact_no,
        email: newAddress.email,
        name: newAddress.name
      };
    
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/identity/users/address`, addressPayload, {
          headers: {
            'Authorization': `Bearer ${token}`, // Use only the unified access_token
            'Content-Type': 'application/json',
          },
        });
    
        // Update local state with the new address
        const newId = response.data?.data?.ID;
        const updatedAddresses = [...userDetails.addresses, { ...newAddress, ID: newId, is_primary: isPrimary }];
        
        setUserDetails(prevDetails => ({
          ...prevDetails,
          addresses: updatedAddresses
        }));
    
        return true;
      } catch (error) {
        console.error('Failed to add address:', error);
        toast.error('Failed to add address. Please try again.');
        return false;
      }
    };
    
    
    
      const removeAddress = async (ID) => {
        if (!userDetails) return;
      
        const token = localStorage.getItem('access_token'); // Get the token
      
        try {
          await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/identity/users/address/${ID}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
      
          const updatedAddresses = userDetails.addresses.filter(address => address.ID !== ID);
          setUserDetails(prevDetails => ({ ...prevDetails, addresses: updatedAddresses }));
      
          toast.success('Address deleted successfully!');
        } catch (error) {
          console.error('Failed to delete address:', error);
          toast.error('Failed to delete address. Please try again.');
        }
      };

      const editAddress = async (ID, updatedAddress) => {
        if (!userDetails) return;
    
        const token = localStorage.getItem('access_token');
    
        const addressPayload = {
          ID,
          ...updatedAddress,
        };
    
        try {
          const response = await axios.put(`${import.meta.env.VITE_BASE_API_URL}/identity/users/address/${ID}`, addressPayload, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
    
          const updatedAddresses = userDetails.addresses.map((address) =>
            address.ID === ID ? { ...address, ...updatedAddress } : address
          );
    
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            addresses: updatedAddresses,
          }));
    
          toast.success('Address updated successfully!');
        } catch (error) {
          console.error('Failed to update address:', error);
          toast.error('Failed to update address. Please try again.');
        }
      };
    

    const fetchUserData = useCallback(async (userId) => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await axios.get(`https://dhya.one/hht/identity/users/${userId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.data && response.data.data) {
                setUserDetails(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }, []);

    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails, fetchUserData, updateUserDetails, addAddress, removeAddress, editAddress }}>
            {children}
        </UserDetailsContext.Provider>
    );
};

export const useUserDetails = () => useContext(UserDetailsContext);