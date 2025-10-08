import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("authUser")) || null;
    setUser(saved);
  }, []);

  const login = (username) => {
    const u = { username };
    localStorage.setItem("authUser", JSON.stringify(u));
    setUser(u);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
