"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext<{
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}>({
  isAuth: false,
  setIsAuth: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/validate-token`,
          { withCredentials: true }
        );
        setIsAuth(response.data.isValid);
      } catch (error) {
        setIsAuth(false);
        console.log(error);
        // Don't redirect here, let the middleware handle it
      }
    };

    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);