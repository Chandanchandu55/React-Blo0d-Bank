import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("authUser")) || null;
    setUser(saved);
    // Seed sample donors and requests if not present
    const donors = JSON.parse(localStorage.getItem("donors")) || [];
    const requests = JSON.parse(localStorage.getItem("requests")) || [];

    if (donors.length === 0) {
      const sampleDonors = [
        { name: "Asha Patel", age: 28, bloodGroup: "A+", contact: "+91-9876543210", location: "Bengaluru" },
        { name: "Rahul Kumar", age: 34, bloodGroup: "O-", contact: "+91-9123456780", location: "Mysuru" },
        { name: "Sara Nair", age: 25, bloodGroup: "B+", contact: "+91-9988776655", location: "Bengaluru" }
      ];
      localStorage.setItem("donors", JSON.stringify(sampleDonors));
    }

    if (requests.length === 0) {
      const sampleRequests = [
        { name: "Priya Sharma", bloodGroup: "A+", contact: "+91-9000000001", hospital: "City Hospital" },
        { name: "Vikram Singh", bloodGroup: "O-", contact: "+91-9000000002", hospital: "General Hospital" }
      ];
      localStorage.setItem("requests", JSON.stringify(sampleRequests));
    }

    // expose a quick helper to reseed sample data from the console
    window.seedSampleData = () => {
      localStorage.setItem("donors", JSON.stringify([
        { name: "Asha Patel", age: 28, bloodGroup: "A+", contact: "+91-9876543210", location: "Bengaluru" },
        { name: "Rahul Kumar", age: 34, bloodGroup: "O-", contact: "+91-9123456780", location: "Mysuru" },
        { name: "Sara Nair", age: 25, bloodGroup: "B+", contact: "+91-9988776655", location: "Bengaluru" }
      ]));
      localStorage.setItem("requests", JSON.stringify([
        { name: "Priya Sharma", bloodGroup: "A+", contact: "+91-9000000001", hospital: "City Hospital" },
        { name: "Vikram Singh", bloodGroup: "O-", contact: "+91-9000000002", hospital: "General Hospital" }
      ]));
      return true;
    };
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
