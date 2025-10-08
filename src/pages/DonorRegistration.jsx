import { useState } from "react";

export default function DonorRegistration() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !age || !bloodGroup || !contact || !location) {
      alert("Please fill all fields!");
      return;
    }

    const donor = { name, age, bloodGroup, contact, location };
    const existing = JSON.parse(localStorage.getItem("donors")) || [];
    existing.push(donor);
    localStorage.setItem("donors", JSON.stringify(existing));

    alert("Donor registered successfully!");

    // Clear form fields
    setName("");
    setAge("");
    setBloodGroup("");
    setContact("");
    setLocation("");
  };

  return (
    <div className="container">
      <h2>Donor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location / City"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button type="submit">Register Donor</button>
      </form>
    </div>
  );
}
