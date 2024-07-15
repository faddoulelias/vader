import React from "react";
import CompanyTable from "../components/CompanyTable";
import data from "../data/data.json";
import "./styles/HomePage.css";
import { getCSAData } from "../client/CSA";

export default function HomePage() {
	const [data, setData] = React.useState([]);
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.href = "/";
	};

	React.useEffect(() => {
		getCSAData()
			.then((response) => response.json())
			.then((data) => setData(data));
	}, []);

	return (
		<>
			<div className="HomePage">
				<div className="home-header">
					<h1>Company Sentiment Analysis</h1>
					<button className="logout-button" onClick={handleLogout}>
						Logout
					</button>
				</div>
				<CompanyTable data={data} />
			</div>
		</>
	);
}
