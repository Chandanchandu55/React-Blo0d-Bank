import { useEffect, useState } from "react";
import BloodCard from "../components/BloodCard";

export default function AvailableBlood() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch donors from PHP backend
    fetch("http://localhost/bloodray-api/get_donors.php")
      .then((res) => res.json())
      .then((data) => {
        setDonors(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching donors:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading donors...</p>;

  return (
    <div className="container">
      <h2>Available Blood Donors</h2>
      {donors.length === 0 ? (
        <p>No donors available yet.</p>
      ) : (
        <div className="grid">
          {donors.map((donor, index) => (
            <BloodCard donor={donor} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
