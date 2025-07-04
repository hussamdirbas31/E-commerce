import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/FirebaseConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add this custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};