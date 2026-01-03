import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	const inputClass =
		"w-full h-11 rounded-lg bg-gray-800/70 backdrop-blur-md border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-[480px] p-10 rounded-2xl shadow-xl bg-gray-900/60 backdrop-blur-xl border border-gray-700">
				<h1 className="text-3xl font-semibold text-center text-gray-300 mb-4">
					Sign Up <span className="text-blue-500">ChatApp</span>
				</h1>

				<form onSubmit={handleSubmit} className="space-y-3">
					<div>
						<label className="text-gray-300 text-sm">Full Name</label>
						<input
							type="text"
							placeholder="  John Doe"
							className={inputClass}
							value={inputs.fullName}
							onChange={(e) =>
								setInputs({ ...inputs, fullName: e.target.value })
							}
						/>
					</div>

					<div>
						<label className="text-gray-300 text-sm">Username</label>
						<input
							type="text"
							placeholder="  johndoe"
							className={inputClass}
							value={inputs.username}
							onChange={(e) =>
								setInputs({ ...inputs, username: e.target.value })
							}
						/>
					</div>

					<div>
						<label className="text-gray-300 text-sm">Password</label>
						<input
							type="password"
							placeholder="  Enter Password"
							className={inputClass}
							value={inputs.password}
							onChange={(e) =>
								setInputs({ ...inputs, password: e.target.value })
							}
						/>
					</div>

					<div>
						<label className="text-gray-300 text-sm">Confirm Password</label>
						<input
							type="password"
							placeholder="  Confirm Password"
							className={inputClass}
							value={inputs.confirmPassword}
							onChange={(e) =>
								setInputs({
									...inputs,
									confirmPassword: e.target.value,
								})
							}
						/>
					</div>

					<GenderCheckbox
						onCheckboxChange={handleCheckboxChange}
						selectedGender={inputs.gender}
					/>

					<Link
						to="/login"
						className="text-sm text-gray-300 hover:underline hover:text-blue-500 inline-block"
					>
						Already have an account?
					</Link>

					<button
						className="w-full mt-2 p-3 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition"
						disabled={loading}
					>
						{loading ? (
							<span className="loading loading-spinner"></span>
						) : (
							"Sign Up"
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
