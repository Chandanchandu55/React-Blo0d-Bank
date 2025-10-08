import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>🩸 BloodRay</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/donor">Donor Registration</Link></li>
        <li><Link to="/request">Blood Request</Link></li>
        <li><Link to="/available">Available Blood</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
