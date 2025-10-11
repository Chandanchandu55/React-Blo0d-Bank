import { useState } from "react";

export default function BloodRequest() {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  const [hospital, setHospital] = useState("");
  const [units, setUnits] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !bloodGroup || !contact || !hospital || !units) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost/bloodray-api/register_request.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: name,
          blood_type: bloodGroup,
          units,
          location: hospital,
          contact_phone: contact,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Blood request submitted successfully!");
        // Clear form
        setName("");
        setBloodGroup("");
        setContact("");
        setHospital("");
        setUnits(1);
      } else {
        setMessage(data.error || "Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
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
          type="number"
          placeholder="Units Required"
          value={units}
          min={1}
          onChange={(e) => setUnits(e.target.value)}
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

      {message && (
        <p style={{ marginTop: 10, color: message.includes("successfully") ? "green" : "red" }}>
          {message}
        </p>
      )}
    </div>
  );
}
