import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setDataOrder, setTotal } from "store/action/product";

function DetailsProductRightSide(props) {
	const { data } = props;
	console.log("data =>", data);
	const priceItem =
		props.product.selectedSize === 1
			? data.price[0]
			: props.product.selectedSize === 2
			? data.price[1]
			: props.product.selectedSize === 3
			? data.price[2]
			: 0;

	const [counter, setCounter] = useState(0);
	const [totalPrice, setTotalPrice] = useState(counter * priceItem);

	useEffect(() => {
		console.log(counter);
		console.log(priceItem);
		setTotalPrice(counter * priceItem);
		console.log(totalPrice);
		props.setTotal({ totalOrder: counter, totalPay: totalPrice });
	}, [counter]);

	const hanldeMin = () => {
		setCounter(counter - 1);
		// console.log(totalPrice);
	};
	const handlePlus = () => {
		setCounter(counter + 1);
		// console.log(totalPrice);
	};
	// console.log(props);

	const formatIDR = (data) => {
		return parseInt(data)
			.toLocaleString("id-ID", parseInt(data))
			.replace("Rp", "IDR")
			.replace(",00", "");
	};
	return (
		<>
			<div className="product-details__produc-name text-center fs-65 text-poppins fw-900">
				{data.nameProduct}
			</div>
			<div className="product-details__product-desc mt-4 fw-400 fs-25 text-poppins">
				{data.description === undefined ? "" : data.description}
			</div>
			<div className="d-flex justify-content-between mt-5 mb-4">
				<div className="product-details__counter-quantity d-flex align-items-center fcolor-029">
					<span
						className="counter-quantity__min noselect d-flex text-center justify-content-center align-items-center fw-900 fs-25 hover-pointer"
						style={{ width: "50px" }}
						onClick={counter > 0 ? () => hanldeMin() : null}
					>
						-
					</span>
					<input
						className="counter-quantity__count d-flex text-center justify-content-center align-items-center fw-700 fs-25"
						style={{ width: "50px", borderTop: "0", borderBottom: "0" }}
						value={counter}
						onChange={(event) =>
							setCounter(parseInt(event.target.value ? event.target.value : 0))
						}
						type="number"
					/>

					<span
						className="counter-quantity__plus noselect d-flex text-center justify-content-center align-items-center fw-900 fs-25 hover-pointer"
						style={{ width: "50px" }}
						onClick={() => handlePlus()}
						disabled
					>
						+
					</span>
				</div>
				<div className="product-details__price fw-700 fs-35">
					IDR{" "}
					{/* {props.product.selectedSize === 1
            ? formatIDR(data.price[0])
            : props.product.selectedSize === 2
            ? formatIDR(data.price[1])
            : props.product.selectedSize === 3
            ? formatIDR(data.price[2])
            : 0} */}
					{formatIDR(priceItem)}
				</div>
			</div>
			<div className="p-4 card-product d-flex justify-content-between align-items-center">
				<div className="d-flex justify-content-between align-items-center">
					<img
						src="/images/nathan-dumlao-71u2fOofI-U-unsplash 2.png"
						alt=""
						className="product-details__img-product__checkout-details me-3"
					/>
					<div className="checkout-details__item-name-total">
						<div className="item-name-total__name fw-900 fs-25 text-poppins">
							{props.data.nameProduct}
						</div>
						<div className="item-name-total_total fw-400 fs-20 text-poppins">
							x{counter} ({" "}
							{props.product.selectedSize === 1
								? "Reguler"
								: props.product.selectedSize === 2
								? "Large"
								: props.product.selectedSize === 3
								? "Exta Large"
								: ""}
							)
						</div>
					</div>
				</div>
				<div className="checkout-details_checkout d-flex justify-content-between align-items-center">
					<span className="fw-700 fs-25 me-3">Checkout</span>
					<div className="checkout-details_checkout-arrow d-flex align-items-center justify-content-center">
						<img src="/icons/arrow3.png" alt="" />
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({
	product: state.product,
});
const mapDispatchToProps = {
	setDataOrder,
	setTotal,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DetailsProductRightSide);
