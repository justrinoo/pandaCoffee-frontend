import Image from "next/image";
import Link from "next/link";
export default function Navbar() {
	return (
		<>
			<header className="container">
				<nav className="d-flex justify-content-between align-items-center py-4">
					<section>
						<Link href="/">
							<span className="title-brand" style={{ cursor: "pointer" }}>
								Panda Coffee
							</span>
						</Link>
					</section>
					<section>
						<Link href="/">
							<span className="nav-brand-link nav-brand-link-active">Home</span>
						</Link>
						<Link href="/">
							<span className="nav-brand-link">Product</span>
						</Link>
						<Link href="/">
							<span className="nav-brand-link">Orders</span>
						</Link>
						<Link href="/">
							<span className="nav-brand-link">Dashboard</span>
						</Link>
					</section>
					<section className="d-flex flex-row-reverse">
						<img
							src="/images/profileDummy.png"
							width={30}
							height={30}
							className="nav-profile-image mx-4"
							alt="Profile"
						/>
						<img src="/icons/chat.svg" width={30} height={30} alt="Chat" />
						<img
							src="/icons/search.svg"
							width={30}
							height={30}
							style={{ cursor: "pointer" }}
							className="mx-4"
							alt="search icon"
						/>
					</section>
				</nav>
			</header>
			<hr />
		</>
	);
}
