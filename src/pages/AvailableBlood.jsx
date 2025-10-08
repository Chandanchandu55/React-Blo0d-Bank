import { useEffect, useState } from "react";
import BloodCard from "../components/BloodCard";

export default function AvailableBlood() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const savedDonors = JSON.parse(localStorage.getItem("donors")) || [];
    setDonors(savedDonors);
  }, []);

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
