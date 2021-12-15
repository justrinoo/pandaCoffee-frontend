import { Layout, Button } from "components";
import { Breadcrumb } from "react-bootstrap";
import Image from "next/image";

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

export default function createPromo() {
	useEffect(() => {
		if (localStorage.getItem("role") != "admin") {
			router.push("/product");
		}
	}, []);
	return (
		<>
			<Layout pageTitle="Create Promo" isLogged={true}>
				<main className="container">
					<Breadcrumb className="mt-4 breadcumb_mobile">
						<Breadcrumb.Item href="#" className="breadcrumb-default" active>
							Promo
						</Breadcrumb.Item>
						<Breadcrumb.Item href="#" active>
							<span className="breadcrumb-active">Add Promo</span>
						</Breadcrumb.Item>
					</Breadcrumb>

					{/* Content New Promo */}
					<section className="row mt-5">
						<section className="col-md-4  mb-5 text-center">
							<div className="promo-rounded-file">
								<img
									src="/images/camera.png"
									className="camera-upload-file"
									alt="upload photo"
								/>
							</div>
							<Button childrenClassName="promo-file-button mt-4">
								Choose from gallery
							</Button>
							<form className="mt-4">
								<div className="mb-2">
									<label htmlFor="discount" className="promo-label-form">
										Enter the discount :
									</label>
									<select
										name="discount"
										id="discount"
										className="form-select promo-form-select mt-3"
									>
										<option hidden>20%</option>
									</select>
								</div>
								<div className="mb-2">
									<label htmlFor="expDate" className="promo-label-form">
										Expire date :
									</label>
									<select
										name="expDate"
										id="expDate"
										className="form-select promo-form-select mt-3"
									>
										<option hidden>October 7th 2021</option>
									</select>
									<select
										name="expDate"
										id="expDate"
										className="form-select promo-form-select mt-3"
									>
										<option hidden>October 10th 2021</option>
									</select>
								</div>
							</form>
						</section>
						<div className="col-md-2"></div>
						<section className="col-md-6 mb-5 ">
							<form>
								<div className="mb-3 promo-form-input-parent">
									<label htmlFor="name">Name: </label>
									<input
										type="text"
										className="promo-form-input"
										placeholder="Type promo name min. 50 characters"
									/>
								</div>
								<div className="row">
									<div className="col-md-6 promo-form-input-parent">
										<label htmlFor="minTotal">Min Total Price : </label>
										<input
											type="text"
											className="promo-form-input"
											placeholder="Type the min total price"
										/>
									</div>
									<div className="col-md-6 promo-form-input-parent">
										<label htmlFor="maxTotal">Max Discount : </label>
										<input
											type="text"
											className="promo-form-input"
											placeholder="Type the max discount"
										/>
									</div>
								</div>
								<div className="mb-3 promo-form-input-parent">
									<label htmlFor="input">Input promo code :</label>
									<input
										type="text"
										className="promo-form-input"
										placeholder="Type the promo code"
									/>
								</div>
								<div className="mb-3 promo-form-input-parent">
									<label htmlFor="description">Description : </label>
									<input
										type="text"
										className="promo-form-input"
										placeholder="Describe your promo min. 150 characters"
									/>
								</div>
								<div className="mb-3">
									<Button type="submit" childrenClassName="promo-form-button">
										Save Promo
									</Button>
									<Button
										type="button"
										childrenClassName="promo-form-button-cancel"
									>
										Cancel
									</Button>
								</div>
							</form>
						</section>
					</section>
					{/* End Content New Promo */}
				</main>
			</Layout>
		</>
	);
}
