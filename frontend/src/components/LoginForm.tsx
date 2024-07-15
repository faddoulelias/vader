import { useState } from "react";

interface LoginFormProps {
	readonly handleLogin: (data: {
		username: string;
		password: string;
	}) => Promise<void>;
}

export default function LoginForm(props: LoginFormProps) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await props.handleLogin({ username, password });
			// Optionally: redirect to another page upon successful login
		} catch (error) {
			console.error("Login error:", error);
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
			<button type="submit">Login</button>
		</form>
	);
}
