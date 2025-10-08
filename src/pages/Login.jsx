import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);

  useEffect(() => {
    // Ensure a demo user exists so people can try the app quickly
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
      localStorage.setItem(
        "users",
        JSON.stringify([{ username: "admin", password: "admin" }])
      );
    }
  }, []);

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.username === username && u.password === password);

    if (found) {
      login(found.username);
    } else {
      setError("Invalid username or password. Try admin / admin or use the demo button.");
    }
  };

  const useDemo = () => {
    // ensure demo user exists and log in
    localStorage.setItem("users", JSON.stringify([{ username: "admin", password: "admin" }]));
    setUsername("admin");
    setPassword("admin");
    // directly call login for demo
    login("admin");
  };

  const resetDemo = () => {
    localStorage.setItem("users", JSON.stringify([{ username: "admin", password: "admin" }]));
    localStorage.removeItem("authUser");
    setUsername("");
    setPassword("");
    setError("Demo user reset. Use the 'Use demo account' button to sign in.");
  };

  if (user) {
    return (
      <div className="container">
        <h2>You're already logged in</h2>
        <p>Go to <a href="/">Home</a></p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Login to BloodRay</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div style={{ color: "#b71c1c", marginBottom: 8 }}>{error}</div>
        )}

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button type="submit">Login</button>
          <button type="button" onClick={useDemo} style={{ background: "#444", padding: "8px 12px" }}>
            Use demo account
          </button>
          <button type="button" onClick={resetDemo} style={{ background: "#666", padding: "8px 12px" }}>
            Reset demo user
          </button>
        </div>

        <p style={{ marginTop: 10, fontSize: 14, color: "#666" }}>
          Demo credentials: <strong>admin</strong> / <strong>admin</strong>
        </p>
      </form>
    </div>
  );
}
