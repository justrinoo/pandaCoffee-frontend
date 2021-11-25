import React, { useEffect, useState } from "react";

function DetailsProductRightSide(props) {
  return (
    <>
      <div className="product-details__produc-name text-center fs-65 text-poppins fw-900">
        COLD BREW
      </div>
      <div className="product-details__product-desc mt-4 fw-400 fs-25 text-poppins">
        Cold brewing is a method of brewing that combines ground coffee and cool
        water and uses time instead of heat to extract the flavor. It is brewed
        in small batches and steeped for as long as 48 hours.
      </div>
      <div className="d-flex justify-content-between mt-5 mb-4">
        <div className="product-details__counter-quantity d-flex align-items-center fcolor-029">
          <span className="counter-quantity__min mx-3 fw-900 fs-25">-</span>
          <span className="counter-quantity__count px-4 d-flex align-items-center fw-700 fs-25">
            2
          </span>
          <span className="counter-quantity__plus mx-3  fw-900 fs-25">+</span>
        </div>
        <div className="product-details__price fw-700 fs-35">IDR 30.000</div>
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
              COLD BREW
            </div>
            <div className="item-name-total_total fw-400 fs-20 text-poppins">
              x2 ( Large )
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

export default DetailsProductRightSide;
