import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
	const { user, logout } = useContext(AuthContext);
	const [donorsCount, setDonorsCount] = useState(0);
	const [requestsCount, setRequestsCount] = useState(0);

	useEffect(() => {
		const donors = JSON.parse(localStorage.getItem("donors")) || [];
		const reqs = JSON.parse(localStorage.getItem("requests")) || [];
		setDonorsCount(donors.length);
		setRequestsCount(reqs.length);
	}, []);

	return (
		<div className="container">
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<h2 style={{ margin: 0 }}>Welcome back{user ? `, ${user.username}` : ""}!</h2>
				
			</div>
			<p style={{ textAlign: "center", marginBottom: 20 }}>
				This is the BloodRay dashboard. Use the navigation to register donors,
				submit requests, and view available blood.
			</p>

			<div className="grid">
				<div className="card">
					<h3>Donors</h3>
					<p style={{ fontSize: 28, fontWeight: 700 }}>{donorsCount}</p>
					<p>Registered donors</p>
				</div>

				<div className="card">
					<h3>Requests</h3>
					<p style={{ fontSize: 28, fontWeight: 700 }}>{requestsCount}</p>
					<p>Open blood requests</p>
				</div>

				<div className="card">
					<h3>Quick Tip</h3>
					<p>
						Keep donor contact and blood group updated. In emergencies, use the
						Available Blood page to contact donors quickly.
					</p>
				</div>
			</div>

					<div style={{ marginTop: 24 }}>
						<h3>Open Requests</h3>
						{requestsCount === 0 ? (
							<p>No open requests.</p>
						) : (
							<div className="grid">
								{JSON.parse(localStorage.getItem("requests") || "[]").map((r, i) => (
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
