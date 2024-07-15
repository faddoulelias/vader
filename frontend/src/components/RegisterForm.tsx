import { useState } from "react";

interface RegisterFormProps {
	readonly handleRegister: (data: {
		username: string;
		password: string;
	}) => Promise<void>;
}

export default function RegisterForm(props: RegisterFormProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			console.error("Passwords do not match");
			return;
		}
		try {
			await props.handleRegister({ username, password });
			// Optionally: redirect to another page upon successful registration
		} catch (error) {
			console.error("Registration error:", error);
			// Handle error (show message, clear inputs, etc.)
		}
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<div className="input-group">
				<label htmlFor="username">Username</label>
				<input
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</div>
			<div className="input-group">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<div className="input-group">
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
				/>
			</div>
			<button type="submit">Register</button>
		</form>
	);
}
