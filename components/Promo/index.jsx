import React, { useEffect, useState } from "react";
import Button from "components/Button";
import { useRouter } from "next/dist/client/router";
import { setDataPromo, deleteNewPromo } from "store/action/voucher";
import { useDispatch } from "react-redux";
import Pagination from "react-paginate";
import { toast, ToastContainer } from "react-toastify";

export default function Promo({ data, pagination, role }) {
	console.log("role =>", role);
	const router = useRouter();
	const dispatch = useDispatch();

	const goToCreatePromo = () => {
		router.push({
			pathname: "/admin/promo",
		});
	};
	const changePagePagination = async (event) => {
		const query = router.query;
		query.page = event.selected + 1;
		router.push({
			query: query,
		});
	};

	const handleDeletePromo = async (id) => {
		const question = confirm(`are you sure delete this cuppon ?`);
		if (question) {
			const response = await dispatch(deleteNewPromo(id));
			toast.success(response.value.data.message);
			window.location.reload();
		} else {
			return;
		}
	};

	return (
		<>
			<div className="promo">
				<ToastContainer />
				<h2>Promo Today</h2>
				<h4>
					Coupons will be updated every weeks. <br /> Check them out!
				</h4>
				<div className="main-banner">
					{data.map((promo) => (
						<div className="promo__banner mb-4" key={promo.id}>
							<div className="promo__banner--img">
								<img
									src={
										promo.image
											? `${
													process.env.APP_HOST === "PROD"
														? process.env.BASE_URL_PROD
														: process.env.BASE_URL_DEV
											  }/upload/vouchers/${promo.image}`
											: "/images/PeoplePeace.png"
									}
									style={{ objectFit: "cover" }}
									alt="Illustration Promo Code"
								/>
							</div>
							<div className="promo__banner--desc">
								<h4>{promo.name}</h4>
								<p>{promo.description}</p>
							</div>
							{role === "admin" ? (
								<div className="promo__manage-action">
									<div
										className="product__icon--trash"
										style={{
											width: "35px",
											height: "32px",
											cursor: "pointer",
											margin: "0px 5px",
										}}
										onClick={() => handleDeletePromo(promo.id)}
									>
										<img src="/icons/trash 1.svg" alt="delete cupppon" />
									</div>
									<div
										className="product__icon--pencil"
										style={{
											width: "35px",
											height: "32px",
											cursor: "pointer",
											margin: "0px 5px",
										}}
										onClick={() => {
											dispatch(setDataPromo(promo));
											router.push({
												pathname: "/admin/promo/update-promo",
											});
										}}
									>
										<img src="/icons/pencil.svg" width={55} />
									</div>
								</div>
							) : null}
						</div>
					))}
					<Pagination
						previousLabel="Previous"
						nextLabel="Next"
						containerClassName="d-flex justify-content-center list-unstyled"
						nextClassName="mx-2"
						pageCount={pagination.totalPage}
						pageClassName="mx-2"
						activeClassName="fw-bold"
						onPageChange={changePagePagination}
						nextLinkClassName="text-decoration-none text-dark"
						previousLinkClassName="text-decoration-none text-dark"
					/>
				</div>
				{role === "admin" ? (
					<Button
						childrenClassName="promo__button"
						childrenOnClick={goToCreatePromo}
					>
						Add new promo
					</Button>
				) : (
					<Button
						childrenClassName="promo__button"
						childrenOnClick={() => router.push("/customer/checkout")}
						// tambahin event apply cuppon
					>
						Apply Cuppon
					</Button>
				)}

				<div className="promo__rules">
					<div className="promo__rules--desc">
						<h4>Terms and Condition</h4>
						<p>1. You can only apply 1 coupon per day</p>
						<p>2. It only for dine it</p>
						<p>3. Buy 1 get 1 only for new user</p>
						<p>4. Should make member card to apply coupon</p>
					</div>
				</div>
			</div>
		</>
	);
}
