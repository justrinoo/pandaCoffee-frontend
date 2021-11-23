import Image from "next/image";
import Link from "next/link";
export default function Footer() {
	return (
		<>
			<footer className="footer-main py-5">
				<section className="container">
					<div className="row">
						<div className="col-md-6">
							<h3 className="px-2 title-brand">Panda Coffee</h3>
							<p className="px-2 footer-title-description mt-4">
								Coffee Shop is a store that sells some good meals, and
								especially coffee. We provide high quality beans
							</p>
							<div className="flex  mt-4">
								<Image
									src="/images/Facebook.png"
									width={50}
									height={50}
									className="me-2"
									alt="Facebook Icon"
								/>
								<Image
									src="/images/Twitter.png"
									width={50}
									height={50}
									className="me-2"
									alt="Twitter Icon"
								/>
								<Image
									src="/images/Instagram.png"
									width={50}
									height={50}
									className="me-2"
									alt="Instagram Icon"
								/>
							</div>
						</div>
						<div className="col-md-3">
							<div className="d-flex flex-column">
								<Link href="/">
									<span className="fw-bold footer-link mt-3">Product</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">Download</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">Pricing</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">Locations</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">Countries</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">Blog</span>
								</Link>
							</div>
						</div>
						<div className="col-md-3">
							<div className="d-flex flex-column">
								<Link href="/">
									<span className="fw-bold footer-link mt-3">Engage</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">
										Coffe Shop ?
									</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">FAQ</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">About Us</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">
										Privacy Policy
									</span>
								</Link>
								<Link href="/">
									<span className="text-muted footer-link mt-3">
										Terms of Service
									</span>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</footer>
		</>
	);
}
