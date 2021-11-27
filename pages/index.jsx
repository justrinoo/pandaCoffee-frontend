import { Layout } from "components";
export default function Home() {
	return (
		<Layout pageTitle="Home Page" isLogged={true}>
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
									made by love just for you. Start your day with us for a bigger
									smile!
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
								You can explore the menu that we provide with fun and have their
								own taste and make your day better.
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
						Let’s choose and have a bit taste of poeple’s favorite. It might be
						yours too!
					</p>

					<div class="d-flex justify-content-center">
						<div className="mx-4">
							<div class="card card-body text-center p-5">
								<div class="d-flex justify-content-center">
									<img
										src="/images/ice.png"
										width="128px"
										height="128px"
										className="rounded-circle"
										alt=""
									/>
								</div>
								<p className="fw-bold">Hazelnut Latte</p>
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

								<h4 className="mt-5 text__currency">IDR 25.000</h4>
								<button className="btn btn-outline-warning btn__curency mt-2">
									Order Now
								</button>
							</div>
						</div>
						<div className="mx-4">
							<div class="card card-body text-center p-5">
								<div class="d-flex justify-content-center">
									<img
										src="/images/ice.png"
										width="128px"
										height="128px"
										className="rounded-circle"
										alt=""
									/>
								</div>
								<p className="fw-bold">Hazelnut Latte</p>
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

								<h4 className="mt-5 text__currency">IDR 25.000</h4>
								<button className="btn btn-outline-warning btn__curency mt-2">
									Order Now
								</button>
							</div>
						</div>
						<div className="mx-4">
							<div class="card card-body text-center p-5">
								<div class="d-flex justify-content-center">
									<img
										src="/images/ice.png"
										width="128px"
										height="128px"
										className="rounded-circle"
										alt=""
									/>
								</div>
								<p className="fw-bold">Hazelnut Latte</p>
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

								<h4 className="mt-5 text__currency">IDR 25.000</h4>
								<button className="btn btn-outline-warning btn__curency mt-2">
									Order Now
								</button>
							</div>
						</div>
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
					These are the stories of our customers who have visited us with great
					pleasure.
				</p>
				<div class="container">
					<div class="row">
						<div class="card card-body">
							<div class="d-flex">
								<img src="/images/review.png" width="50px" alt="" />
								<div class="d-block mx-3">
									<p className="p-0 m-0">Viezh Robert</p>
									<small>Warsaw, Poland</small>
								</div>
							</div>
						</div>
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
		</Layout>
	);
}
