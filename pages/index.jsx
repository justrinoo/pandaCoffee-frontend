import { Layout } from "components";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";

export default function Home() {
	const router = useRouter();
	const testimonials = [
		{
			image:
				"https://cdn.discordapp.com/avatars/818102343404224523/7334e7a8cf36f4610981642677a47791.png?size=128",
			name: "Fajri Kun",
			address: "Bandung, Indonesia",
			ratings: "9.5",
			feedback:
				"Semenjak saya pakai panda coffee pesanan makanan jadi makin mudah, terima kasih panda coffee sudah membantu saya.",
		},
		{
			image: "/images/people1.png",
			name: "Leo Frank",
			address: "Los Angles, New York",
			ratings: "7.5",
			feedback: "Big thnks for panda coffee.",
		},
		{
			image: "/images/people2.png",
			name: "Natali Hunqoq",
			address: "Osaka, Jepang",
			ratings: "8.5",
			feedback: "Arigatoo Kamamida Panda Coffee!",
		},
		{
			image: "/images/people3.png",
			name: "Imanuel John",
			address: "Paris, France",
			ratings: "9.9",
			feedback: "makasih ya wkwk.",
		},
	];

	const products = [
		{
			images: "/images/nasigoreng.png",
			title: "Nasi Goreng",
			price: "19000",
			path: "/product",
		},
		{
			images: "/images/spageti.png",
			title: "Spageti Carbonara",
			price: "30000",
			path: "/product",
		},
		{
			images: "/images/ice-cream.png",
			title: "Ice Cream Meleleh",
			price: "5000",
			path: "/product",
		},
	];

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			slidesToSlide: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
			slidesToSlide: 1,
		},
	};

	const findProduct = async (event) => {
		if (event.key === "Enter") {
			const response = await axios.get("product");
			console.log("ready product.", response.data);
		}
	};

	return (
		<Layout pageTitle="Home Page" isLogged={true}>
			{/* MOBILE SCREEN*/}
			<section className="main-mobile d-block d-md-none">
				<h1 className="main-mobile-title">A good coffee is a good day</h1>

				<div className="main-mobile-search">
					<div className="search-container">
						<img src="/icons/search.svg" width={18} height={18} alt="Search" />
					</div>
					<input type="text" className="home-search" placeholder="Search" />
				</div>

				<div className="mobile-navigation">
					<div className="container-navigation">
						<Link href="/">
							<span>Favorite</span>
						</Link>
						<Link href="/">
							<span>Promo</span>
						</Link>
						<Link href="/">
							<span>Coffee</span>
						</Link>
						<Link href="/">
							<span>NonCoffee</span>
						</Link>
						<Link href="/">
							<span>AllProduct</span>
						</Link>
					</div>
				</div>

				<div className="list-product-mobile">
					<div className="card-product">
						<img
							src="/images/coffee-mobile.png"
							width={168}
							className="card-product-image"
							height={168}
							alt="Coffee"
						/>
						<h1 className="card-product-title">Hazelnut Latte</h1>
						<p className="card-product-price">IDR 25.000</p>
					</div>
					<div className="card-product">
						<img
							src="/images/coffee-mobile.png"
							width={168}
							className="card-product-image"
							height={168}
							alt="Coffee"
						/>
						<h1 className="card-product-title">Hazelnut Latte</h1>
						<p className="card-product-price">IDR 25.000</p>
					</div>
					<div className="card-product">
						<img
							src="/images/coffee-mobile.png"
							width={168}
							className="card-product-image"
							height={168}
							alt="Coffee"
						/>
						<h1 className="card-product-title">Hazelnut Latte</h1>
						<p className="card-product-price">IDR 25.000</p>
					</div>
				</div>
			</section>
			{/* END MOBILE SCREEN */}

			{/* DESKTOP */}
			<main className="main-desktop">
				<section className="jarak-50" id="HERO">
					<div className="background_image">
						<div className="container text-white">
							<div class="row">
								<div class="col-md-6 m-5">
									<h1 className="lp__title">
										Start Your Day with Coffee and Good Meals
									</h1>
									<p className="lp__hero_desc mt-5 mb-4">
										We provide high quality beans, good taste, and healthy meals
										made by love just for you. Start your day with us for a
										bigger smile!
									</p>
									<button className="btn btn-warning lp__hero_btn">
										Get Started
									</button>
								</div>
								<div class="col-md-3 m-5">
									<input
										type="text"
										className="form-control lp__hero_input"
										placeholder={`Search `}
										onKeyPress={findProduct}
									/>
								</div>
								<div class="d-flex justify-content-center">
									<div className="card card-body card__hero text-dark shadow">
										<div className="d-flex justify-content-between">
											<div className="d-flex">
												<img src="/images/staff.png" width={50} alt="" />
												<div class="d-block mx-3">
													<p className="p__icon">500+</p>
													<small className="p__icon_desc">Staff</small>
												</div>
											</div>
											<div className="d-flex">
												<img src="/images/stores.png" width={50} alt="" />
												<div class="d-block mx-3">
													<p className="p__icon">90+</p>
													<small className="p__icon_desc">Store</small>
												</div>
											</div>
											<div className="d-flex">
												<img src="/images/customers.png" width={50} alt="" />
												<div class="d-block mx-3">
													<p className="p__icon">9999+</p>
													<small className="p__icon_desc">Customer</small>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="jarak-100" id="healty">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<img
									src="/images/teamwork.png"
									width="500px"
									height="450px"
									alt=""
								/>
							</div>
							<div class="col-md-6 align-self-center">
								<h3 className="title">
									We Provide Good Coffee and Healthy Meals
								</h3>
								<p className="mb-4 mt-4 desc">
									You can explore the menu that we provide with fun and have
									their own taste and make your day better.
								</p>
								<ul className="ul__check">
									<li>
										<img src="/images/check.png" className="icon__li" alt="" />{" "}
										High quality beans
									</li>
									<li>
										<img src="/images/check.png" className="icon__li" alt="" />{" "}
										Healthy meals, you can request the ingredients
									</li>
									<li>
										<img src="/images/check.png" className="icon__li" alt="" />{" "}
										Chat with our staff to get better experience for ordering
									</li>
									<li>
										<img src="/images/check.png" className="icon__li" alt="" />{" "}
										Free member card with a minimum purchase of IDR 200.000.
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<section className="jarak-100" id="favorite">
					<div className="container">
						<h3 className="text-center title">Here is People’s Favorite</h3>
						<p className="text-center mb-5 desc">
							Let’s choose and have a bit taste of poeple’s favorite. It might
							be yours too!
						</p>

						<div class="d-flex justify-content-center">
							{products.map((product) => (
								<div className="mx-4">
									<div class="card card-body text-center p-5">
										<div class="d-flex justify-content-center">
											<img
												src={product.images}
												width="128px"
												height="128px"
												className="rounded-circle"
												alt=""
											/>
										</div>
										<p className="fw-bold">{product.title}</p>
										<ul className="ul__check ul__checkks">
											<li>
												<img
													src="/icons/checklist.png"
													className="icon__li"
													alt=""
												/>
												High quality beans
											</li>
											<li>
												<img
													src="/icons/checklist.png"
													className="icon__li"
													alt=""
												/>
												High quality beans
											</li>
											<li>
												<img
													src="/icons/checklist.png"
													className="icon__li"
													alt=""
												/>
												High quality beans
											</li>
											<li>
												<img
													src="/icons/checklist.png"
													className="icon__li"
													alt=""
												/>
												High quality beans
											</li>
										</ul>

										<h4 className="mt-5 text__currency">
											IDR {new Intl.NumberFormat("id-ID").format(product.price)}
										</h4>
										<button
											className="btn btn-outline-warning btn__curency mt-2"
											onClick={() => router.push(product.path)}
										>
											Order Now
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
				<section className="jarak-50" id="map">
					<div class="container text-center mt-5">
						<h3 className="title">
							Visit Our Store in the <br /> Spot on the Map Below
						</h3>
						<p className="desc mt-3">
							See our store in every city on the spot and spen your good day
							there. <br /> See you soon!
						</p>
						<img src="/images/map.png" className="w-100 mt-5" alt="" />
					</div>
				</section>
				<section className="" id="patner">
					<h3 className="text-center title">Our Partner</h3>
					<div class="container">
						<img src="/images/sponsor.png" className="w-100" alt="" />
					</div>
				</section>
				<section className="jarak-100" id="rating">
					<h3 className="text-center title">
						Loved by Thousands of <br /> Happy Customer
					</h3>
					<p className="text-center desc mt-3">
						These are the stories of our customers who have visited us with
						great pleasure.
					</p>
					<div class="container">
						<div class="row">
							<Carousel
								responsive={responsive}
								containerClass="react-multi-carousel-list"
							>
								{testimonials.map((testimonial, idx) => (
									<div className="col-md-4" key={idx} style={{ width: "100%" }}>
										<div class="card card-body card-body-testimonials">
											<div class="d-flex justify-content-between align-items-center">
												<div className="d-flex">
													<img
														src={testimonial.image}
														style={{ borderRadius: "100%" }}
														width="50px"
														alt=""
													/>
													<div class="d-block mx-3">
														<p className="p-0 m-0 card-body-testimonials-name">
															{testimonial.name}
														</p>
														<small className="card-body-testimonials-address">
															{testimonial.address}
														</small>
													</div>
												</div>
												<div className="d-flex">
													<p className="card-body-testimonials-ratings mt-3 mx-2">
														{testimonial.ratings}
													</p>
													<Image
														src="/icons/stars.svg"
														width={16}
														height={16}
														alt="Ratings"
													/>
												</div>
											</div>
											<div className="card-footer-testimonials">
												<p className="card-footer-testimonials-desc">
													“{testimonial.feedback}“!
												</p>
											</div>
										</div>
									</div>
								))}
							</Carousel>
						</div>
					</div>
				</section>
				<section className="jarak-100" id="promo">
					<div class="container">
						<div class="card card-body shadow">
							<div class="d-flex justify-content-between p-5">
								<div class="">
									<h3 className="title">
										Check our promo <br /> today!
									</h3>
									<p>Let's see the deals and pick yours!</p>
								</div>
								<div class="align-self-center">
									<button className="btn btn-warning lp__hero_btn">
										Get Started
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			{/* END DESKTOP */}
		</Layout>
	);
}
