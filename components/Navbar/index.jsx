import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Navbar() {
	const user = useSelector((state) => state.auth.userLogin);
	const role = localStorage.getItem("role");
	console.log("role", role);
	const token = Cookies.get("token");
	const router = useRouter();

	const LogoutHandler = () => {
		Cookies.remove("token");
		Cookies.remove("id");
		localStorage.clear();
		router.push("/");
	};

	return (
		<>
			<header className="container">
				<nav className="d-flex justify-content-between align-items-center py-4">
					<section className="navbar-brand-main flex align-items-center	">
						<img
							src="/images/logo-pandaCoffe.png"
							width={60}
							height={60}
							className="navbar-brand-logo"
							style={{ objectFit: "cover" }}
							alt="Logo"
						/>
						<img
							src="/icons/menu-hamburger.svg"
							width={22}
							className="mx-3 nav-icon-mobile d-flex d-md-none"
							height={14}
							style={{ objectFit: "cover" }}
							alt="Menu"
						/>
						<Link href="/">
							<span className="title-brand" style={{ cursor: "pointer" }}>
								Panda Coffee
							</span>
						</Link>
					</section>
					<section className="navbar-link-content">
						{role === "admin" ? (
							<>
								<Link href="/">
									<span className="nav-brand-link nav-brand-link-active">
										Home
									</span>
								</Link>
								<Link href="/admin/product">
									<span className="nav-brand-link">Product</span>
								</Link>
								<Link href="/admin/manageOrder">
									<span className="nav-brand-link">Orders</span>
								</Link>
								<Link href="/admin/dashboard">
									<span className="nav-brand-link">Dashboard</span>
								</Link>
							</>
						) : role !== "admin" && token ? (
							<>
								<Link href="/product">
									<span className="nav-brand-link">Product</span>
								</Link>
								<Link href="/customer/checkout">
									<span className="nav-brand-link">Your cart</span>
								</Link>
								<Link href="/customer/history">
									<span className="nav-brand-link">History</span>
								</Link>
							</>
						) : null}
					</section>
					{token ? (
						<section className="navbar-section-profile d-flex flex-row-reverse align-items-center">
							<div className="dropdown">
								<img
									src={
										user[0].image
											? `${process.env.BASE_URL_DEV}upload/user/${user[0].image}`
											: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
									}
									width={45}
									height={45}
									className="nav-profile-image mx-4"
									style={{ cursor: "pointer" }}
									id="dropdownMenuLink"
									data-bs-toggle="dropdown"
									alt="Profile"
								/>

								<ul
									className="dropdown-menu"
									aria-labelledby="dropdownMenuLink"
								>
									<li>
										<a className="dropdown-item" href="/profile">
											Profile
										</a>
									</li>
									<li>
										<a className="dropdown-item" onClick={LogoutHandler}>
											Logout
										</a>
									</li>
								</ul>
							</div>

							<img
								src="/icons/shopping-cart.svg"
								width={24}
								height={24}
								className="nav-icon-mobile d-flex d-md-none"
								alt="Shoping Cart"
							/>
							<img
								src="/icons/chat-bubbles.svg"
								width={24}
								height={24}
								className="nav-icon-mobile d-flex d-md-none mx-3"
								alt="Chat"
							/>

							<img
								src="/icons/chat.svg"
								width={30}
								height={30}
								className="nav-profile-icon"
								alt="Chat"
							/>
							<img
								src="/icons/search.svg"
								width={30}
								height={30}
								style={{ cursor: "pointer" }}
								className="nav-profile-icon mx-4"
								alt="search icon"
							/>
						</section>
					) : (
						<div className="d-flex flex-row-reverse">
							<button
								className="nav-button-auth-signup mx-1"
								onClick={() => router.push("/auth/register")}
							>
								Sign Up
							</button>
							<button
								className="nav-button-auth-login mx-1"
								onClick={() => router.push("/auth/login")}
							>
								Login
							</button>
						</div>
					)}
				</nav>
			</header>
			<hr style={{ margin: "0px" }} />
		</>
	);
}
