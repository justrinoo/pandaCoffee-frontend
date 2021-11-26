import React, { useState, useEffect } from "react";
import { Layout, Button, Promo } from "components";
import Image from "next/image";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { getDataCookie } from "middleware/authorizationPage";
import axios from "utils/axios";
import Paginate from "react-paginate";

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
	const dataProduct = await axios
		.get(`${process.env.BASE_URL_DEV}product/favorite`, {
			headers: {
				Authorization: `Bearer ${dataCookie.token}`,
			},
		})
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			return [];
		});

	return {
		props: { listProduct: dataProduct },
	};
}

function ProductAdmin(props) {
	const { auth } = props;
	const router = useRouter();
	const { search, sortField, sort, page, category } = router.query;
	const [activePage, setPage] = useState(page);
	const [pageInfo, setPageInfo] = useState({});

	const [listProduct, setListProduct] = useState(props.listProduct);
	console.log(pageInfo);

	// FORMATING TO IDR CURRENCY
	const formatIDR = (data) => {
		return parseInt(data)
			.toLocaleString("id-ID", parseInt(data))
			.replace("Rp", "IDR")
			.replace(",00", "");
	};

	useEffect(() => {
		if (
			!router.query.search &&
			!router.query.sortField &&
			!router.query.sort &&
			!router.query.page &&
			!router.query.category
		) {
			null;
		} else {
			axios
				.get(
					`${process.env.BASE_URL_DEV}product?search=${
						search ? search : ""
					}&sortField=${sortField ? sortField : ""}&sort=${
						sort ? sort : ""
					}&page=${page ? page : ""}&category=${category ? category : ""}`
				)
				.then((res) => {
					console.log("TEST");
					setListProduct(res.data.data);
					setPageInfo(res.data.pagination);
				})
				.catch((err) => {
					toast.error(err.response.data.message);
					setListProduct([]);
				});
		}
	}, [router.query]);

	const hanldeFavorite = () => {
		router.push("/product");
		axios.get(`${process.env.BASE_URL_DEV}product/favorite`).then((res) => {
			console.log(res.data.data);
			setListProduct(res.data.data);
			setPageInfo({ totalPage: 1 });
		});
	};

	const handlePagination = (event) => {
		console.log(event.selected + 1);
		router.push(
			`/product?search=${search ? search : ""}&sortField=${
				sortField ? sortField : ""
			}&sort=${sort ? sort : ""}&page=${event.selected + 1}&category=${
				category ? category : ""
			}`
		);
	};
	return (
		<>
			<ToastContainer />
			<Layout pageTitle="Product Admin" isLogged={true}>
				<div className="container">
					<div className="row">
						<div className="col-lg-4 ">
							{/* <Promo role={auth.userLogin[0].role} /> */}
						</div>
						<div className="col-lg-8 product">
							<div className="product__filter ">
								<h2 onClick={() => hanldeFavorite()}>Favorite Product</h2>
								<h2
									onClick={() =>
										router.push(
											"/product?search=&sortField=&sort=&page=1&category=coffee"
										)
									}
								>
									Coffe
								</h2>
								<h2
									onClick={() =>
										router.push(
											"/product?search=&sortField=&sort=&page=1&category=non-coffee"
										)
									}
								>
									Non Coffe
								</h2>
								<h2
									onClick={() =>
										router.push(
											"/product?search=&sortField=&sort=&page=1&category=foods"
										)
									}
								>
									Foods
								</h2>
								<h2
									onClick={() =>
										router.push(
											"/product?search=&sortField=&sort=&page=1&category=add-on"
										)
									}
								>
									Add-on
								</h2>
								<h2
									onClick={() =>
										router.push(
											"/product?search=&sortField=&sort=&page=1&category="
										)
									}
								>
									All Product
								</h2>
							</div>
							<div className="row product__grid">
								{listProduct.map((item, index) => (
									<div
										key={index}
										className="col-lg-3 col-md-4 col-sm-6 col-6 px-1 my-4"
										onClick={
											auth.userLogin[0].role === "admin"
												? () => {}
												: () => router.push(`/productDetails/${item.id}`)
										}
									>
										<div className=" product__list ">
											<div className="d-flex justify-content-center">
												<img
													src={`${process.env.BASE_URL_DEV}upload/product/${item.image}`}
													alt="ada"
												/>
											</div>
											<h2>{item.nameProduct}</h2>
											<h4>IDR {formatIDR(parseInt(item.price[0]))}</h4>
										</div>
										{auth.userLogin[0].role === "admin" ? (
											<div className="product__icon">
												<div className="product__icon--trash">
													<img src="/icons/trash 1.svg" />
												</div>
												<div className="product__icon--pencil">
													<img src="/icons/pencil.svg" />
												</div>
											</div>
										) : null}
									</div>
								))}
							</div>

							{auth.userLogin[0].role === "admin" ? (
								<Button childrenClassName="product__button">
									Add new product
								</Button>
							) : null}
						</div>
					</div>
				</div>

				<Paginate
					previousLabel={"Previous"}
					nextLabel={"Next"}
					breakLabel={"..."}
					pageCount={pageInfo.totalPage}
					onPageChange={(event) => handlePagination(event)}
					containerClassName={"pagination"}
					disabledClassName={"pagination__disabled"}
					activeClassName={"pagination__active"}
					className="justify-content-center pagination d-flex align-items-center"
					pageRangeDisplayed={5}
				/>
			</Layout>
		</>
	);
}

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(ProductAdmin);
