import Button from "components/Button";
import React, { useEffect, useState } from "react";

function ManageOrderRightSide(props) {
  const [selectedPayment, setSelectedPayment] = useState("cod");

  return (
    <>
      <div className="col-12 fcolor-white fs-25 fw-700 text-popins mb-3">
        Address{" "}
      </div>

      <div className="p-4 card-product mb-5">
        <div className="addreass-details__buyer-name my-2 fw-400 fs-20">
          <span className="fw-700 fs-20">Delivery to</span> Iskandar Street
        </div>
        <div className="addreass-details__buyer-address py-2 fw-400 fs-20">
          Km 5 refinery road oppsite re public road, effurun, Jakarta
        </div>
        <div className="addreass-details__buyer-number my-2 fw-400 fs-20">
          +62 81348287878
        </div>
      </div>
      <p className="fcolor-white fs-25 fw-700 text-popins mt-5">
        Payment method
      </p>
      <div className="p-4 card-product order__payment-method col-12 d-flex align-items-center">
        <div className="row">
          <div className="payment-method__card d-flex col-12 my-3 align-items-center hover-pointer">
            <span className="payment-method__circle me-3 d-flex justify-content-center align-items-center">
              {selectedPayment === "card" ? (
                <div className="card-active"></div>
              ) : null}
            </span>
            <span className="payment-method__icon method-icon__card d-flex justify-content-center align-items-center me-3">
              <img src="/images/paymentMethod/card.png" alt="" />
            </span>
            <span className="fs-20 fw-400 text-poppins">Card</span>
          </div>

          <div className="payment-method__bank d-flex col-12 my-3 align-items-center hover-pointer">
            <span className="payment-method__circle me-3 d-flex justify-content-center align-items-center">
              {selectedPayment === "bank" ? (
                <div className="bank-active"></div>
              ) : null}
            </span>
            <span className="payment-method__icon method-icon__bank d-flex justify-content-center align-items-center me-3">
              <img src="/images/paymentMethod/bank.png" alt="" />
            </span>
            <span className="fs-20 fw-400 text-poppins">Bank account</span>
          </div>

          <div className="payment-method__COD d-flex col-12 my-3 align-items-center hover-pointer">
            <span className="payment-method__circle me-3 d-flex justify-content-center align-items-center">
              {selectedPayment === "cod" ? (
                <div className="cod-active"></div>
              ) : null}
            </span>
            <span className="payment-method__icon method-icon__cod d-flex justify-content-center align-items-center me-3">
              <img src="/images/paymentMethod/delivery.png" alt="" />
            </span>
            <span className="fs-20 fw-400 text-poppins">Cash on delivery</span>
          </div>
        </div>
      </div>
      <Button childrenClassName="order__mark-done col-12 py-4 my-5 text-center fw-700 fs-20 fcolor-white text-poppins">
        {/* <div className="order__mark-done col-12 py-4 my-5 text-center fw-700 fs-20 fcolor-white text-poppins"> */}
        Mark as Done
        {/* </div> */}
      </Button>
    </>
  );
}

export default ManageOrderRightSide;
