import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "utils/axios";

export default function HomePageMobileScreen() {
	const role = localStorage.getItem("role");
	const router = useRouter();

	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState("");
	const filterProduct = () => {};

	const getAllProducts = async () => {
		try {
			const response = await axios.get("product?limit=4");
			setProducts(response.data.data);
		} catch (error) {
			new Error(error.response.data.message);
			setProducts([]);
		}
	};

	const findProduct = async (event) => {
		setSearch(event.target.value);
		if (event.key === "Enter") {
			try {
				const response = await axios.get(`product?search=${search}`);
				setProducts(response.data.data);
			} catch (error) {
				new Error(error.response.data.message);
				setProducts([]);
			}
		}
	};

	useEffect(() => {
		getAllProducts();
	}, []);
	return (
		<>
			{/* MOBILE SCREEN*/}
			<section className="main-mobile d-block d-md-none">
				<h1 className="main-mobile-title">A good coffee is a good day</h1>

				<div className="main-mobile-search">
					<div className="search-container">
						<img src="/icons/search.svg" width={18} height={18} alt="Search" />
					</div>
					<input
						type="text"
						className="home-search"
						placeholder="Search"
						onKeyPress={findProduct}
						name="search"
					/>
				</div>

				<div className="mobile-navigation">
					<div className="container-navigation">
						<span onClick={() => filterProduct("favorite")}>Favorite</span>
						<span onClick={() => filterProduct("discount")}>Promo</span>
						<span onClick={() => filterProduct("coffee")}>Coffee</span>
						<span onClick={() => filterProduct("non-coffee")}>Non Coffee</span>
						<span onClick={() => filterProduct("")}>All Product</span>
					</div>
				</div>

				<div className="list-product-mobile">
					{products.length > 0 ? (
						products.map((value) => (
							<div
								className="card-product"
								key={value.id}
								onClick={() =>
									router.push(
										`${role === "admin" ? "/admin/product" : "/product"}`
									)
								}
							>
								<img
									src={`${
										value.image
											? `${
													process.env.APP_HOST === "PROD"
														? process.env.BASE_URL_PROD
														: process.env.BASE_URL_DEV
											  }upload/product/${value.image}`
											: "/images/coffee-mobile.png"
									} `}
									width={168}
									className="card-product-image"
									height={168}
									alt={value.nameProduct}
								/>
								<h1 className="card-product-title">{value.nameProduct}</h1>
								<p className="card-product-price">
									IDR {new Intl.NumberFormat("id-ID").format(value.price[0])}
								</p>
							</div>
						))
					) : (
						<p className="mt-3 fw-bold text-center mx-auto text-danger">
							Cannot find product.
						</p>
					)}
				</div>
			</section>
			{/* END MOBILE SCREEN */}
		</>
	);
}
