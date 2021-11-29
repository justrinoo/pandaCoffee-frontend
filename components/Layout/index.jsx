import Head from "next/head";
import { Navbar, Footer } from "components";
import Script from "next/script";
export default function Layout({ pageTitle, children, isLogged }) {
	{
		/*isLogged ketika usernya belum login  */
	}

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			{isLogged ? (
				<div>
					<Navbar />
					{children}
					<Footer />
				</div>
			) : (
				children
			)}
			<Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" />
		</>
	);
}
