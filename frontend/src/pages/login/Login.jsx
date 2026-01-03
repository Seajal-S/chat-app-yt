import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};
return (
	<div className="flex items-center justify-center h-screen">
		<div
			className="w-[420px] p-8 rounded-xl
			bg-gray-900/40 backdrop-blur-md
			border border-white/10 shadow-lg"
		>
			<h1 className="text-3xl font-semibold text-center text-gray-200 mb-6">
				Login <span className="text-blue-500">ChatApp</span>
			</h1>

			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-sm text-gray-300 mb-1">Username</label>
					<input
						type="text"
						placeholder="Enter username"
						className="w-full px-4 py-2 rounded-md
						bg-gray-900 text-gray-200
						placeholder-gray-400 outline-none"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm text-gray-300 mb-1">Password</label>
					<input
						type="password"
						placeholder="Enter Password"
						className="w-full px-4 py-2 rounded-md
						bg-gray-900 text-gray-200
						placeholder-gray-400 outline-none"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<Link
					to="/signup"
					className="text-sm text-gray-400 hover:text-blue-400 inline-block mb-4"
				>
					{"Don't"} have an account?
				</Link>

				<button
					className="w-full py-2 rounded-md
					bg-gray-900 text-gray-200
					hover:bg-gray-600 transition"
					disabled={loading}
				>
					{loading ? <span className="loading loading-spinner"></span> : "Login"}
				</button>
			</form>
		</div>
	</div>
);

};

export default Login;
