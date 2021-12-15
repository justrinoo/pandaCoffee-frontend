import { Layout, Button } from "components";
import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { createNewPromo } from "store/action/voucher";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/dist/client/router";

export default function FormNewPromo() {
	const router = useRouter();
	const inputFile = useRef(null);
	const dispatch = useDispatch();

	const [isError, setError] = useState(false);
	const [message, setMessage] = useState("");
	const [messagePrice, setMessagePrice] = useState("");
	const [displayImage, setDisplayImage] = useState(null);
	const [formVoucher, setFormVoucher] = useState({
		name: "",
		minTotalPrice: "",
		maxDiscount: "",
		promoCode: "",
		description: "",
		discount: "",
		startDate: "",
		endDate: "",
		image: null,
	});

	const changeFile = (event) => {
		if (
			event.target.files.length !== 0 &&
			event.target.files[0].size >= 1024 * 1024
		) {
			toast.error("File to large.");
			setFormVoucher({ image: null });
			return false;
		}
		if (event.target.files.length !== 0) {
			setDisplayImage(URL.createObjectURL(event.target.files[0]));
			setFormVoucher({
				image: event.target.files[0],
			});
		}
	};

	const showInputFile = () => {
		inputFile.current.click();
	};

	const ChangeTextFile = (event) => {
		if (
			typeof formVoucher.minTotalPrice !== "number" &&
			typeof formVoucher.maxDiscount !== "number"
		) {
			setError(true);
			setMessagePrice("Total Price & Discount must be number.");
		}
		setFormVoucher({
			...formVoucher,
			[event.target.name]: event.target.value,
		});
	};

	const createNewPromoSubmit = async (event) => {
		try {
			event.preventDefault();
			const {
				name,
				minTotalPrice,
				maxDiscount,
				promoCode,
				description,
				discount,
				startDate,
				endDate,
				image,
			} = formVoucher;

			const setDataVoucher = {
				name,
				minTotalPrice,
				maxDiscount,
				promoCode,
				description,
				discount,
				startDate,
				endDate,
				image,
			};

			const formDataVoucher = new FormData();
			for (const value in setDataVoucher) {
				formDataVoucher.append(value, setDataVoucher[value]);
			}

			const response = await dispatch(createNewPromo(formDataVoucher));
			toast.success(response.value.data.message);
			setFormVoucher({
				name: "",
				minTotalPrice: "",
				maxDiscount: "",
				promoCode: "",
				description: "",
				discount: "",
				startDate: "",
				endDate: "",
				image: null,
			});
			setMessagePrice("");
			setMessage("");
			event.target.reset();
			router.push("/admin/product");
		} catch (error) {
			setMessage(error.response.data.message);
			setError(true);
			new Error(error.response);
		}
	};

	const CancelCreatePromo = () => {
		router.push("/admin/product");
	};

	useEffect(() => {
		if (localStorage.getItem("role") != "admin") {
			router.push("/product");
		}
	}, []);

	const goBack = () => {
		router.push("/admin/product");
	};

	return (
		<>
			<Layout pageTitle="Create Promo" isLogged={true}>
				<main className="container">
					<div className="px-4 py-3 menu_mobile_promo">
						<img src="/icons/arrow-left.svg" onClick={goBack} />
						<h3 className="text-center">New Promo</h3>
					</div>
					<Breadcrumb className="breadcumb_mobile mt-4">
						<Breadcrumb.Item href="#" className="breadcrumb-default" active>
							Promo
						</Breadcrumb.Item>
						<Breadcrumb.Item href="#" active>
							<span className="breadcrumb-active">add promo</span>
						</Breadcrumb.Item>
					</Breadcrumb>
					<ToastContainer />
					{/* Content New Promo */}
					<form onSubmit={createNewPromoSubmit} className="mt-4">
						<section className="row mt-5">
							<section className="col-md-4 mb-5 text-center">
								<div
									className={formVoucher.image ? null : "promo-rounded-file"}
								>
									<img
										src={displayImage ? displayImage : "/images/camera.png"}
										className={`${
											formVoucher.image
												? "file-image-active"
												: "camera-upload-file"
										}`}
										alt="upload photo"
									/>
									<input
										type="file"
										name="image"
										ref={inputFile}
										onChange={changeFile}
										style={{ display: "none" }}
									/>
								</div>
								<Button
									type="button"
									childrenClassName="promo-file-button mt-4"
									childrenOnClick={showInputFile}
								>
									Choose from gallery
								</Button>
								<div className="mb-2  mt-3">
									<label htmlFor="discount" className="promo-label-form">
										Enter the discount :
									</label>
									<select
										name="discount"
										id="discount"
										onChange={ChangeTextFile}
										className="form-select promo-form-select mt-3"
									>
										<option hidden>Choose Discount</option>
										<option value="20">5%</option>
										<option value="10">10%</option>
										<option value="15">15%</option>
										<option value="20">20%</option>
										<option value="25">25%</option>
										<option value="30">30%</option>
										<option value="35">35%</option>
										<option value="40">40%</option>
										<option value="45">45%</option>
										<option value="50">50%</option>
									</select>
								</div>
								<div className="mb-2  mt-3">
									<label className="promo-label-form">Expire date :</label>
									<input
										type="date"
										name="startDate"
										onChange={ChangeTextFile}
										id="startDate"
										className="form-control promo-form-select mt-3"
									/>

									<input
										type="date"
										name="endDate"
										id="endDate"
										onChange={ChangeTextFile}
										className="form-control promo-form-select mt-3"
									/>
								</div>
							</section>
							<div className="col-md-2"></div>
							<section className="col-md-6 mb-5 ">
								<div className="mb-3 promo-form-input-parent">
									<label htmlFor="name">Name: </label>
									<input
										type="text"
										name="name"
										maxLength={50}
										className="promo-form-input"
										autoComplete="off"
										onChange={ChangeTextFile}
										placeholder="Type promo name min. 50 characters"
									/>
								</div>
								<div className="row">
									<div className="col-md-6 promo-form-input-parent">
										<label htmlFor="minTotal">Min Total Price : </label>
										<input
											type="text"
											name="minTotalPrice"
											className="promo-form-input"
											autoComplete="off"
											onChange={ChangeTextFile}
											placeholder="Type the min total price"
										/>
										{isError ? (
											<small className="text-danger fw-bold">
												{typeof formVoucher.minTotalPrice !== "number"
													? messagePrice
													: null}
											</small>
										) : null}
									</div>
									<div className="col-md-6 promo-form-input-parent">
										<label htmlFor="maxTotal">Max Discount : </label>
										<input
											type="text"
											name="maxDiscount"
											className="promo-form-input"
											autoComplete="off"
											onChange={ChangeTextFile}
											placeholder="Type the max discount"
										/>
										{isError ? (
											<small className="text-danger fw-bold">
												{typeof formVoucher.maxDiscount !== "number"
													? messagePrice
													: null}
											</small>
										) : null}
									</div>
								</div>
								<div className="mb-3 promo-form-input-parent">
									<label htmlFor="input">Input promo code :</label>
									<input
										type="text"
										name="promoCode"
										className="promo-form-input"
										autoComplete="off"
										onChange={ChangeTextFile}
										placeholder="Type the promo code"
									/>
									{isError ? (
										<small className="text-danger fw-bold">{message}</small>
									) : null}
								</div>
								<div className="mb-3 promo-form-input-parent">
									<label htmlFor="description">Description : </label>
									<textarea
										rows="4"
										cols="10"
										type="text"
										name="description"
										className="promo-form-input"
										autoComplete="off"
										onChange={ChangeTextFile}
										maxLength={150}
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
										childrenOnClick={CancelCreatePromo}
									>
										Cancel
									</Button>
								</div>
							</section>
						</section>
					</form>
					{/* End Content New Promo */}
				</main>
			</Layout>
		</>
	);
}
