import { Layout } from "components";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";

export default function history() {
	const router = useRouter();
	const id = Cookies.get("id");
	const [histories, setHistories] = useState([]);
	const [statusCheked, setStatusCheked] = useState(false);
	const [cardClicked, setCardClicked] = useState("");
	const [showPopUp, setShowPopUp] = useState(false);

	const getDetailHistoryTransaction = async () => {
		try {
			const response = await axios.get(`transaction/detail/get-user/${id}`);
			const dataHistory = response.data.data;
			const filterDataHistorySuccess = dataHistory.filter(
				(value) => value.statusTransaction === "success"
			);
			setHistories(filterDataHistorySuccess);
		} catch (error) {
			new Error(error.response);
		}
	};

	const clickProductActive = (id) => {
		setCardClicked(id);
	};

	const handleCancel = () => {
		setCardClicked("");
	};
	const popUpDeleteHistory = (id) => {
		setShowPopUp(true);
	};

	const deleteHistoryTransactionUser = async (id) => {
		const response = await axios.delete(`transaction/detail/${id}`);
		toast.success(response.data.message);
		getDetailHistoryTransaction();
		setShowPopUp(false);
	};

	const handleClose = () => {
		setShowPopUp(false);
	};

	useEffect(() => {
		getDetailHistoryTransaction();
	}, []);

	return (
		<>
			<Layout
				pageTitle="History Page"
				isLogged={window.screen.width === 320 ? false : true}
			>
				<main className="history-main history-main-mobile text-center">
					{/* MOBILE SCREEN */}
					<section className="d-flex d-md-none">
						<button className="history-menu-mobile">
							<img
								src="/icons/arrow-left.svg"
								className="img-fluid"
								alt="Back"
							/>
						</button>
						<p className="history-menu-title">Order History</p>
					</section>
					<section className="d-flex d-md-none align-items-center justify-content-center mt-4">
						<div>
							<img
								src="/icons/touch.svg"
								width={13}
								className="mx-auto mb-3"
								height={14}
								alt="Select Item"
							/>
						</div>
						<div>
							<p className="history-menu-title-select-item mx-2">
								Select an item to delete
							</p>
						</div>
					</section>

					<section className="d-flex d-md-none">
						<section className="history-content-row">
							<div>
								<p></p>
							</div>
							<div className="mt-2">
								<p className="history-content-action-delete-title">Delete</p>
							</div>
						</section>
					</section>
					{histories.map((product) => (
						<section
							className="d-flex d-md-none history-content-list-menu align-items-center mx-4"
							key={product.id}
						>
							<div className="d-block text-start mx-2">
								<p className="history-content-list-menu-title">
									{product.nameReceiver}
								</p>
								<p className="history-content-list-menu-price">
									IDR{" "}
									{new Intl.NumberFormat("id-ID").format(product.totalPayment)}
								</p>
								<p className="history-content-list-menu-size">
									{product.statusTransaction}, Delivered {product.alamat}
								</p>
							</div>
							<div className="text-end">
								<input
									type="checkbox"
									className="history-content-list-action-manage-checked"
									onClick={() => clickProductActive(product.id)}
									defaultChecked={statusCheked}
								/>
							</div>
						</section>
					))}

					{/* DESKTOP */}
					<section className="history-content pt-5">
						<h3 className="history-content-title">
							Let’s see what you have bought!
						</h3>
						<span className="history-content-description">
							Long press to delete item
						</span>
					</section>
					<section className="history-content-list-container container d-none d-md-block">
						<ToastContainer />
						<div className="row">
							{histories.length > 0 ? (
								histories.map((historyProduct) => (
									<div className="col-md-4" key={historyProduct.id}>
										{cardClicked === historyProduct.id ? (
											<div className="history-content-list-card-manage-action">
												<div
													className="history-content-card-manage-cancel"
													onClick={handleCancel}
												>
													<img
														src="/icons/x.svg"
														width={14}
														height={16}
														className="history-content-card-trash"
														alt="Cancel"
													/>
												</div>
												<div
													className="history-content-card-manage-delete"
													onClick={() => popUpDeleteHistory(historyProduct.id)}
												>
													<img
														src="/icons/trash.svg"
														width={14}
														height={16}
														className="history-content-card-trash"
														alt="Delete"
													/>
												</div>
												<Modal
													show={showPopUp}
													onHide={handleClose}
													centered
													contentClassName="history-modal-main"
												>
													<Modal.Body className="history-modal-body">
														<p className="history-modal-body-title">
															Are you sure want to delete the selected items?
														</p>
													</Modal.Body>
													<Modal.Footer className="history-modal-footer">
														<button
															className="history-modal-button-cancel"
															onClick={handleClose}
														>
															Cancel
														</button>
														<button
															className="history-modal-button"
															onClick={() =>
																deleteHistoryTransactionUser(historyProduct.id)
															}
														>
															Delete
														</button>
													</Modal.Footer>
												</Modal>
											</div>
										) : null}
										<section
											className={`${
												cardClicked === historyProduct.id
													? "history-content-list-card-active"
													: "history-content-list-card"
											} mt-5`}
											onClick={() => clickProductActive(historyProduct.id)}
										>
											<img
												src="/images/makanan.png"
												width={75}
												height={75}
												style={{ objectFit: "cover" }}
												alt="Product Order"
											/>
											<div className="history-content-list-card-body">
												<h5 className="history-content-list-card-body-title-invoice">
													CS-{historyProduct.id}
												</h5>
												<span className="history-content-list-card-body-title-idr">
													IDR{" "}
													{new Intl.NumberFormat("id-ID").format(
														historyProduct.totalPayment
													)}
												</span>
												<span className="history-content-list-card-body-title-status">
													{historyProduct.statusTransaction}
												</span>
											</div>
										</section>
									</div>
								))
							) : (
								<p className="text-center fs-4 fw-bold mt-5 text-white">
									You dont Have History Transaction.
								</p>
							)}
						</div>
					</section>
				</main>
			</Layout>
		</>
	);
}
