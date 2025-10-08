import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
	const { user } = useContext(AuthContext);
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
			<h2>Welcome back{user ? `, ${user.username}` : ""}!</h2>
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
		</div>
	);
}
