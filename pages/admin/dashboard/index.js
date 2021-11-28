import React, { useState } from "react";
import Image from "next/image";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Chart from "components/Chart";
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

	return (
		<Layout title="Dashboard Admin">
			<Navbar />
			<main className="dashboard-admin">
				<div className="row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
						<div className="chart-admin">
							<Chart />
						</div>
					</div>
					<div className="col-md-3"></div>
				</div>
			</main>
			<Footer></Footer>
		</Layout>
	);
}
