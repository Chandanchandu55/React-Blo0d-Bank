import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    // Try localStorage users first (demo mode)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.length === 0) {
      localStorage.setItem("users", JSON.stringify([{ username: "admin", password: "admin" }]));
    }

    const found = users.find((u) => u.username === username && u.password === password);
    if (found) {
      login(username);
    } else {
      setError("Invalid username or password.");
    }
  };

  if (user) {
    return (
      <div className="container">
        <h2>You're already logged in</h2>
        <p>Go to <a href="/home">Home</a></p>
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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: "#b71c1c", marginBottom: 8 }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
