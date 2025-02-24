import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

// Create the AddressContext
const AddressContext = createContext();

// Custom hook to use the AddressContext
export const useAddress = () => useContext(AddressContext);

// Create the AddressProvider component
export const AddressProvider = ({ children }) => {
  // State to hold the list of addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Darshan',
      houseNo: '15',
      address: 'Dhya Innovation, Sivasakthi Colony, Ganapathy',
      pincode: '641035',
      state: 'Tamil Nadu',
      country: 'India',
      contactNo: '9123949560',
      label: 'Work',
    },
    {
      id: 2,
      name: 'Ganesh Kumar',
      houseNo: '15',
      address: 'Dhya Innovation, Sivasakthi Colony, Ganapathy',
      pincode: '641035',
      state: 'Tamil Nadu',
      country: 'India',
      contactNo: '7695941098',
      label: 'Work',
    },
  ]);

  // Function to add a new address
  const addAddress = useCallback((newAddress) => {
    setAddresses((prevAddresses) => {
      const newId = prevAddresses.length > 0 ? Math.max(...prevAddresses.map((a) => a.id)) + 1 : 1;
      return [...prevAddresses, { ...newAddress, id: newId }];
    });
  }, []);

  // Function to remove an address by id
  const removeAddress = useCallback((id) => {
    setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== id));
  }, []);

  // Function to edit an existing address by id
  const editAddress = useCallback((id, updatedAddress) => {
    setAddresses((prevAddresses) =>
      prevAddresses.map((address) => (address.id === id ? { ...updatedAddress, id } : address))
    );
  }, []);

  // Memoize context values to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      addresses,
      addAddress,
      removeAddress,
      editAddress,
    }),
    [addresses, addAddress, removeAddress, editAddress]
  );

  return (
    <AddressContext.Provider value={value}>
      {children}
    </AddressContext.Provider>
  );
};