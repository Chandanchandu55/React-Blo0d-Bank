import { useState } from "react";

export default function DonorRegistration() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !age || !bloodGroup || !contact || !location) {
      setMessage("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch("http://localhost/bloodray-api/register_donor.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          age : age,
          blood_type: bloodGroup,
          phone: contact,
          city: location,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Donor registered successfully!");
        // Clear form fields
        setName("");
        setAge("");
        setBloodGroup("");
        setContact("");
        setLocation("");
      } else {
        setMessage(data.error || "Failed to register donor.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
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

      {message && (
        <p style={{ marginTop: 10, color: message.includes("successfully") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
