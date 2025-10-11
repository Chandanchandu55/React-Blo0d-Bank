import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [get_donors, setDonors] = useState([]);
  const [get_requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch donors
    fetch("http://localhost/bloodray-api/get_donors.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.get_donors)) {
          setDonors(data.get_donors);
        }
      })
      .catch((err) => console.error("Error fetching donors:", err));

    // Fetch requests
    fetch("http://localhost/bloodray-api/get_requests.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.get_requests)) {
          setRequests(data.get_requests);
        }
      })
      .catch((err) => console.error("Error fetching requests:", err));
  }, []);

  return (
    <div className="container">
      <h2>Welcome back to Blood Ray...!</h2>


      <p>This is the BloodRay dashboard. Use the navigation to register donors,
         submit requests, and view available blood.</p>

      <div className="grid">
        <div className="card">
          <h3>Donors</h3>
          <p style={{ fontSize: 28, fontWeight: 700 }}>{get_donors.length}</p>
          <p>Registered donors</p>
        </div>

        <div className="card">
          <h3>Requests</h3>
          <p style={{ fontSize: 28, fontWeight: 700 }}>{get_requests.length}</p>
          <p>Open blood requests</p>
        </div>

        <div className="card">
          <h3>Quick Tip</h3>
          <p>Keep donor contact and blood group updated for emergencies.Please do not misuse the data.</p>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Open Requests</h3>
        {get_requests.length === 0 ? (
          <p>No open requests.</p>
        ) : (
          <div className="grid">
            {get_requests.map((r, i) => (
              <div key={i} className="card">
                <p><strong>Patient:</strong> {r.name}</p>
                <p><strong>Blood Group:</strong> {r.bloodGroup}</p>
                <p><strong>Hospital:</strong> {r.hospital}</p>
                <p><strong>Contact:</strong> {r.contact}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
