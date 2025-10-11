export default function BloodCard({ donor }) {
  return (
    <div className="card">
      <p><strong>Name:</strong> {donor.full_name}</p>
      <p><strong>Blood Group:</strong> {donor.blood_type}</p>
      <p><strong>Contact:</strong> {donor.phone}</p>
      <p><strong>Location:</strong> {donor.city}</p>
    </div>
  );
}
