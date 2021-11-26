import { Layout, Button } from "components";
import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { setDataPromo, updateNewPromo } from "store/action/voucher";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/dist/client/router";

export default function FormUpdatePromo() {
	const router = useRouter();
	const voucher = useSelector((state) => state.voucher);
	const id = voucher.data.id;
	const dispatch = useDispatch();
	console.log("data voucher =>", voucher);
	// console.log("data voucher =>", updatePromo === "true" ? voucher : null);
	const inputFile = useRef(null);

	const [isError, setError] = useState(false);
	const [message, setMessage] = useState("");
	const [messagePrice, setMessagePrice] = useState("");
	const [displayImage, setDisplayImage] = useState(null);
	const [formVoucher, setFormVoucher] = useState({
		name: voucher.data.name,
		minTotalPrice: voucher.data.minTotalPrice,
		maxDiscount: voucher.data.maxDiscount,
		promoCode: voucher.data.promoCode,
		description: voucher.data.description,
		discount: voucher.data.discount,
		startDate: voucher.data.startDate,
		endDate: voucher.data.endDate,
		image: voucher.data.image,
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
				...formVoucher,
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

	const createUpdatePromoSubmit = async (event) => {
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
			const setDataUpdatePromo = {
				name,
				minTotalPrice,
				maxDiscount,
				promoCode,
				description,
				discount,
				startDate: new Date(startDate).toISOString().split("T")[0],
				endDate: new Date(endDate).toISOString().split("T")[0],
				image,
			};
			console.log(setDataUpdatePromo);
			const formUpdateData = new FormData();
			for (const value in setDataUpdatePromo) {
				if (setDataUpdatePromo[value] === "") {
					setError(true);
					setMessage("Please input is required.");
				}
				formUpdateData.append(value, setDataUpdatePromo[value]);
			}
			const response = await dispatch(updateNewPromo(formUpdateData, id));
			toast.success(response.value.data.message);
			setTimeout(() => {
				router.push("/admin/product");
			}, 2000);
		} catch (error) {
			console.log("error =>", error);
		}
	};

	const CancelCreatePromo = () => {
		router.push("/admin/product");
	};

	return (
		<>
			<Layout pageTitle="Update Promo" isLogged={true}>
				<main className="container">
					<Breadcrumb className="mt-4">
						<Breadcrumb.Item href="#" className="breadcrumb-default" active>
							Promo
						</Breadcrumb.Item>
						<Breadcrumb.Item href="#" active>
							<span className="breadcrumb-active">Update promo</span>
						</Breadcrumb.Item>
					</Breadcrumb>
					<ToastContainer />
					{/* Content New Promo */}
					<form onSubmit={createUpdatePromoSubmit} className="mt-4">
						<section className="row mt-5">
							<section className="col-md-4 mb-5 text-center">
								<div className="promo-rounded-file">
									<img
										src={
											displayImage
												? displayImage
												: formVoucher.image
												? `http://localhost:3001/upload/vouchers/${formVoucher.image}`
												: "/images/camera.png"
										}
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
										value={formVoucher.discount}
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
										value={formVoucher.name}
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
											value={formVoucher.minTotalPrice}
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
											value={formVoucher.maxDiscount}
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
										value={formVoucher.promoCode}
										autoComplete="off"
										onChange={ChangeTextFile}
										placeholder="Type the promo code"
									/>
								</div>
								<div className="mb-3 promo-form-input-parent">
									<label htmlFor="description">Description : </label>
									<textarea
										rows="4"
										cols="10"
										type="text"
										value={formVoucher.description}
										name="description"
										className="promo-form-input"
										autoComplete="off"
										onChange={ChangeTextFile}
										maxLength={150}
										placeholder="Describe your promo min. 150 characters"
									/>
								</div>
								{isError ? (
									<small className="text-danger fw-bold">{message}</small>
								) : null}
								<div className="mb-3">
									<Button type="submit" childrenClassName="promo-form-button">
										Update Promo
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
