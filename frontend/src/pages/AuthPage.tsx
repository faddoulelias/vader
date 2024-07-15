import React from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { login, register } from "../client/Authentication";

async function handleLogin(data: { username: string; password: string }) {
	const res = await login(data);
	const body = await res.json();
	if (!res.ok) {
		throw new Error(body.message);
	}

	localStorage.setItem("token", body.token);
	window.location.href = "/";
}

async function handleRegister(data: { username: string; password: string }) {
	const res = await register(data);
	const body = await res.json();
	if (!res.ok) {
		throw new Error(body.message);
	}

	localStorage.setItem("token", body.token);
	window.location.href = "/";
}

export default function AuthPage() {
	const [isLogin, setIsLogin] = React.useState(true);

	return (
		<div className="authentication-page">
			<div className="auth-container">
				<div className="form-container">
					<h1>{isLogin ? "Login" : "Register"}</h1>
					{isLogin ? (
						<LoginForm handleLogin={handleLogin} />
					) : (
						<RegisterForm handleRegister={handleRegister} />
					)}
					<p onClick={() => setIsLogin(!isLogin)}>
						{isLogin
							? "Don't have an account? Register"
							: "Already have an account? Login"}
					</p>
				</div>
			</div>
		</div>
	);
}
