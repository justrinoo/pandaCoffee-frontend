import React, { useState } from "react";
import Image from "next/image";
import { Layout } from "components";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unAuthPage } from "middleware/authorizationPage";

export default function Register() {
	// Handle Register
	const router = useRouter();
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		phoneNumber: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("/auth/register", form)
			.then((res) => {
				toast.success(res.data.message);
				setTimeout(() => {
					router.push("/auth/login");
				}, 5000);
			})
			.catch((err) => {
				toast.warn(err.response.data.message);
			});
	};
	const handleChangeText = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};
	// Handle Register End
	return (
		<Layout title="Sign Up Panda Coffee" isLogged={true}>
			<div className="row">
				<div className="col-md-6">
					<img src="/images/coffee-left.png" />
				</div>
				<div className="col-md-6">
					{/* Auth Navbar */}
					<NavbarSign />
					{/* Auth Navbar End */}
					<h2 className="register-title">SIGN UP</h2>
					<ToastContainer />
					{/* Auth Register Form */}
					<div className="container auth-form">
						<form onSubmit={handleSubmit}>
							<label className="form-label">First Name</label>
							<div className="input-group input-group-sm mb-3">
								<input
									type="text"
									className="form-control"
									name="firstName"
									onChange={handleChangeText}
								/>
							</div>
							<label className="form-label">Last Name</label>
							<div className="input-group input-group-sm mb-3">
								<input
									type="text"
									className="form-control"
									name="lastName"
									onChange={handleChangeText}
								/>
							</div>
							<label className="form-label">Email</label>
							<div className="input-group input-group-sm mb-3">
								<input
									type="email"
									className="form-control"
									name="email"
									onChange={handleChangeText}
								/>
							</div>
							<label className="form-label">Password</label>
							<div className="input-group input-group-sm mb-3">
								<input
									type="password"
									className="form-control"
									name="password"
									onChange={handleChangeText}
								/>
							</div>
							<label className="form-label">Phone Number</label>
							<div className="input-group input-group-sm mb-3">
								<input
									type="number"
									className="form-control"
									name="phoneNumber"
									onChange={handleChangeText}
								/>
							</div>
							<button className="button-submit btn btn-warning mt-3 rounded-pill">
								Sign UP
							</button>
							<button className="button-submit btn btn-light mt-3 rounded-pill">
								<img src="/images/google-logo.png" className="image-google" />
								Sign UP with Google
							</button>
						</form>
					</div>
					{/* Auth Register Form End */}
				</div>
			</div>

			<Footer></Footer>
		</Layout>
	);
}
