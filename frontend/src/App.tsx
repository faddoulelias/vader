import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// Check if there is a token in localStorage to determine authentication status
		if (localStorage.getItem("token")) {
			setIsAuthenticated(true);
		}
	}, []);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={isAuthenticated ? <HomePage /> : <AuthPage />}
				/>
				<Route path="/auth" element={<AuthPage />} />
				<Route path="*" element={<div>404 Not Found</div>} />
			</Routes>
		</Router>
	);
};

export default App;
