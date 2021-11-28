import React, { useState } from "react";
import Image from "next/image";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import ChartWeek from "components/Chart/Week";
import Footer from "components/Footer/index";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { getDataCookie } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
	const dataCookie = await getDataCookie(context);
	if (!dataCookie.isLogin) {
		return {
			redirect: {
				destination: "/auth/login",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function dashboardAdmin() {
	const router = useRouter();
	const Day = (e) => {
		e.preventDefault();
		router.push("/admin/dashboard/day");
	};
	const Week = (e) => {
		e.preventDefault();
		router.push("/admin/dashboard/week");
	};
	const Month = (e) => {
		e.preventDefault();
		router.push("/admin/dashboard/month");
	};

	// Report
	// const redirectLink = (e) => {
	//   e.preventDefault();
	//   axios.get(`/dashboard/MONTH`).then((res) => {
	//     console.log(res.data.data.redirect_url);
	//   });
	// };
	const reportLink = (e) => {
		e.preventDefault();
		axios
			.get(`/dashboard/WEEK`)
			.then((res) => {
				router.push(res.data.data.redirect_url);
			})
			.catch((err) => {
				toast.warn(err.response.data.message);
				// console.log(err);
			});
	};
	return (
		<Layout title="Dashboard Admin">
			<Navbar />
			<main className="dashboard-admin">
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						{/* Navbar Dashboard */}
						<div className="row">
							<div className="col-md-3"></div>
							<div className="col-md-6">
								<div className="dashboard-navbar row">
									<div className="col-md-4">
										<Image
											src="/images/dashboard-nav-non.png"
											width={30}
											height={33}
											className="image-auth"
										/>
										<br />
										<a
											href="/admin/dashboard/day"
											onClick={Day}
											className="link-dashboard"
										>
											DAY
										</a>
									</div>
									<div className="col-md-4">
										<Image
											src="/images/dashboard-nav.png"
											width={30}
											height={33}
											className="image-auth"
										/>
										<br />
										<a
											href="/admin/dashboard/week"
											onClick={Week}
											className="link-dashboard"
										>
											WEEK
										</a>
									</div>
									<div className="col-md-4">
										<Image
											src="/images/dashboard-nav-non.png"
											width={30}
											height={33}
											className="image-auth"
										/>
										<br />
										<a
											href="/admin/dashboard/month"
											onClick={Month}
											className="link-dashboard"
										>
											MONTH
										</a>
									</div>
								</div>
							</div>
							<div className="col-md-3"></div>
						</div>
						{/* Navbar Dashboard ENd */}
						<br />
						<div className="chart-admin card p-5">
							<div className="dashboard-title">
								<h4>WEEKLY REPORT</h4>
							</div>
							<ChartWeek />
						</div>
						<button
							type="submit"
							className="button-dashboard btn btn-warning mb-3 rounded"
							onClick={reportLink}
						>
							Download Report
						</button>
					</div>
					<div className="col-md-3"></div>
				</div>
			</main>
			<Footer></Footer>
		</Layout>
	);
}
