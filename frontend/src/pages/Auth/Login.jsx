import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helpers";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const { updateUser } = useContext(UserContext);
	const navigate = useNavigate();

	const isMounted = useRef(true);

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	// Handle Login forrm submit
	const handleLogin = async (e) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		if (!password) {
			setError("Please enter your password");
			return;
		}

		setError("");

		//Login API Call
		try {
			const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password, });

			const { token } = response.data;

			if (token && isMounted.current) {
				localStorage.setItem("token", token);
				updateUser(response.data);
				navigate("/dashboard");
			}
		} catch (error) {
			console.log("error", error);

			if (isMounted.current) {
				if (error.response?.data?.message) {
					setError(error.response.data.message);
				} else if (error.message === 'Network Error') {
					setError("Cannot connect to server. Please try again later.");
				} else if (error.code === 'ERR_NETWORK') {
					setError("Network error. Check your internet connection.");
				} else {
					setError("Something went wrong. Please try again.");
				}
			}
		}
	};

	return (
		<div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
			<h3 className="text-lg font-semibold text-black">
				Welcome Back
			</h3>
			<p className="text-xs text-slate-700 mt-[5px] mb-6">
				Please enter your details to log in
			</p>
			<form onSubmit={handleLogin}>
				<Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="john@example.com" type="text" autoComplete="email" />
				<Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Min 8 Characters" type="password" autoComplete="password" />
				{error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
				<button type="submit" className="btn-primary">LOGIN</button>
				<p className="text-[13px] text-slate-800 mt-3">
					Don't have an account?{" "}
					<button className="font-medium text-primary underline cursor-pointer" onClick={() => setCurrentPage("signup")}>
						Sign Up
					</button>
				</p>
			</form>
		</div>
	);
};

export default Login;