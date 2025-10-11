import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const res = await fetch("http://localhost/bloodray-api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Save user in AuthContext
        login(data.user); // assuming login expects the user object
      } else {
        setError(data.error || "Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
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
