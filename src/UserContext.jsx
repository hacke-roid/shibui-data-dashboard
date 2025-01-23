import React, { createContext, useContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Create a UserProvider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData); // Store user data after login
  };

  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
const useUser = () => {
  return useContext(UserContext);
};

// Export the context and provider
export { UserProvider, useUser }; // No default export here
