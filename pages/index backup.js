import { Layout } from "components";

export default function Home() {
	return (
		<Layout pageTitle="Home Page" isLogged={true}>
			<h1>Hello NextJs!</h1>
		</Layout>
	);
}
