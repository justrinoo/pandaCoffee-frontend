import React, { useEffect, useState } from "react";

function DetailsProductLeftSide(props) {
  return (
    <>
      <div className="product-details__product-name d-flex flex-column justify-content-center text-center fs-35 text-poppins">
        <div className="d-flex justify-content-center mb-4">
          <img
            src="/images/nathan-dumlao-71u2fOofI-U-unsplash 2.png"
            alt=""
            className="product-details__img-product"
          />
        </div>
        <div className="d-flex justify-content-center">
          <div className="card-product col-8 fw-700 fs-25  p-4 text-center d-flex flex-column align-items-center">
            Choose a size
            <div className="d-flex mt-2 text-poppins justify-content-evenly align-items-center margin-auto">
              <div className="d-flex fs-30 fw-700 justify-content-center mx-2 align-items-center details-product__size-list">
                R
              </div>
              <div className="d-flex fs-30 fw-700 justify-content-center mx-2 align-items-center details-product__size-list">
                L
              </div>
              <div className="d-flex fs-30 fw-700 justify-content-center mx-2 align-items-center details-product__size-list">
                XL
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="text-center text-poppins fcolor-white fw-700 fs-25 py-3 col-8 d-flex justify-content-center details-product__btn-add-cart my-4">
            Add to Cart
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsProductLeftSide;
