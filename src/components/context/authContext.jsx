import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from your authentication service or API
    const fetchUserData = async () => {
      try {
        // Replace this with your actual API call to fetch user data
        const userData = await fetchUserFromAPI();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Mock function to simulate fetching user data from an API
const fetchUserFromAPI = async () => {
  return { _id: '60d0fe4f5311236168a109ca', name: 'John Doe' };
};
