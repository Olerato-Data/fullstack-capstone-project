/* written by Brian McCarthy */
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('auth-token'));
  const [userName, setUserName] = useState(sessionStorage.getItem('name'));

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAppContext must be used within AuthProvider');
  return context;
};
