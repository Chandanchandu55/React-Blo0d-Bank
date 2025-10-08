export default function BloodCard({ donor }) {
  return (
    <div className="card">
      <p><strong>Name:</strong> {donor.name}</p>
      <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
      <p><strong>Contact:</strong> {donor.contact}</p>
      <p><strong>Location:</strong> {donor.location}</p>
    </div>
  );
}
