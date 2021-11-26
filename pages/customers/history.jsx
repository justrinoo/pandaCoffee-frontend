import { Layout } from "components";
import { useState } from "react";
export default function history() {
	const [cardClicked, setCardClicked] = useState(false);
	const dataDummy = [
		{ id: "12345678", totalPayment: "34.000", status: "Done" },
		{ id: "14567892", totalPayment: "21.000", status: "Done" },
		{ id: "12682372", totalPayment: "29.000", status: "Done" },
		{ id: "13098492", totalPayment: "54.000", status: "Done" },
	];

	const clickProductActive = (event, id) => {
		console.log(`${event.target.value} = ${id}`);
		setCardClicked(true);
	};
	return (
		<>
			<Layout pageTitle="History Page" isLogged={true}>
				<main className="history-main text-center mb-5">
					<section className="history-content pt-5">
						<h3 className="history-content-title">
							Let’s see what you have bought!
						</h3>
						<span className="history-content-description">
							Long press to delete item
						</span>
					</section>
					<section className="history-content-list-container container">
						<div className="row">
							{dataDummy.map((historyProduct) => (
								<div className="col-md-4" key={historyProduct.id}>
									<section
										className="history-content-list-card mt-5"
										onClick={(event) =>
											clickProductActive(historyProduct.id, event)
										}
									>
										<img
											src="/images/makanan.png"
											width={75}
											height={75}
											style={{ objectFit: "cover" }}
											alt="Product Order"
										/>
										<div className="history-content-list-card-body">
											<h5 className="history-content-list-card-body-title-invoice">
												CS-{historyProduct.id}
											</h5>
											<span className="history-content-list-card-body-title-idr">
												IDR {historyProduct.totalPayment}
											</span>
											<span className="history-content-list-card-body-title-status">
												{historyProduct.status}
											</span>
										</div>
									</section>
								</div>
							))}
						</div>
					</section>
				</main>
			</Layout>
		</>
	);
}
