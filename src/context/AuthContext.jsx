import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children, initial = Cookies.get("isLoggedIn") }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initial);

  useEffect(() => {
    // Check if the authentication cookie is present
    const authCookie = Cookies.get("isLoggedIn");
    if (authCookie) {
      setIsAuthenticated(true);
    } else setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
