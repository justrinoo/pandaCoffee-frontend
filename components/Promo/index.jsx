import React from "react";
import Image from "next/image";
import Button from "components/Button";
import { useRouter } from "next/dist/client/router";

export default function Promo({ voucher }) {
	const router = useRouter();
	const goToCreatePromo = () => {
		router.push("/admin/promo/new-promo");
	};
	return (
		<>
			<div className="promo">
				<h2>Promo Today</h2>
				<h4>
					Coupons will be updated every weeks. <br /> Check them out!
				</h4>
				<div className="main-banner">
					{voucher.map((promo) => (
						<div className="promo__banner mb-4" key={promo.id}>
							<div className="promo__banner--img">
								<img
									src={
										promo.image
											? `http://localhost:3001/upload/vouchers/${promo.image}`
											: null
									}
									style={{ objectFit: "cover" }}
									alt="Illustration Promo Code"
								/>
							</div>
							<div className="promo__banner--desc">
								<h4>{promo.name}</h4>
								<p>{promo.description}</p>
							</div>
							<div className="promo__manage-action">
								<div
									className="product__icon--trash"
									style={{
										width: "35px",
										height: "32px",
										cursor: "pointer",
										margin: "0px 5px",
									}}
									onClick={() => handleDeletePromo(promo.id)}
								>
									<img src="/icons/trash 1.svg" />
								</div>
								<div
									className="product__icon--pencil"
									style={{
										width: "35px",
										height: "32px",
										cursor: "pointer",
										margin: "0px 5px",
									}}
									onClick={() => handleSetDataPromo(promo, promo.id)}
								>
									<img src="/icons/pencil.svg" />
								</div>
							</div>
						</div>
					))}
				</div>
				<Button
					childrenClassName="promo__button"
					childrenOnClick={goToCreatePromo}
				>
					Add new promo
				</Button>
				<div className="promo__rules">
					<div className="promo__rules--desc">
						<h4>Terms and Condition</h4>
						<p>1. You can only apply 1 coupon per day</p>
						<p>2. It only for dine it</p>
						<p>3. Buy 1 get 1 only for new user</p>
						<p>4. Should make member card to apply coupon</p>
					</div>
				</div>
			</div>
		</>
	);
}
