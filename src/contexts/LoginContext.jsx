import React, { createContext, useCallback, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showAccessMessage, setShowAccessMessage] = useState(true);
    const [showGuestModal, setShowGuestModal] = useState(false);

    const toggleLoginModal = useCallback((showMessage = true) => {
      setShowAccessMessage(showMessage); 
      setShowLoginModal((prev) => !prev); // Toggle without triggering re-render
  }, []); // Empty dependency array ensures it's stable

  const toggleGuestModal = useCallback(() => { 
      setShowGuestModal((prev) => !prev);
  }, []);

    return (
        <LoginContext.Provider value={{ showLoginModal, toggleLoginModal, showAccessMessage, showGuestModal, toggleGuestModal }}>
            {children}
        </LoginContext.Provider>
    );
};