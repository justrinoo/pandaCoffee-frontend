import Head from "next/head";
import { Navbar, Footer } from "components";
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
		</>
	);
}
