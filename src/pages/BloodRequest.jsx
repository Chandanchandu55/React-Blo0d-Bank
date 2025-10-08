import { useState } from "react";

export default function BloodRequest() {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  const [hospital, setHospital] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !bloodGroup || !contact || !hospital) {
      alert("Please fill all fields");
      return;
    }

    const request = { name, bloodGroup, contact, hospital };
    const existing = JSON.parse(localStorage.getItem("requests")) || [];
    existing.push(request);
    localStorage.setItem("requests", JSON.stringify(existing));

    alert("Blood request submitted!");
    setName(""); setBloodGroup(""); setContact(""); setHospital("");
  };

  return (
    <div className="container">
      <h2>Blood Request Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Blood Group"
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          type="text"
          placeholder="Hospital / Location"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
        />
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
}
