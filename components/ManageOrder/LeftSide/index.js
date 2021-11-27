import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

function ManageOrderLeftSide(props) {
  const [dataDummy, setDataDummy] = useState([
    [
      {
        name: "Hazelnut Latte 1",
        total: 1,
        size: "Reguler",
        totalPriceItem: 25000,
      },
      {
        name: "Hazelnut Latte 2",
        total: 2,
        size: "Large",
        totalPriceItem: 25000,
      },
      {
        name: "Hazelnut Latte 3",
        total: 3,
        size: "Extra Large",
        totalPriceItem: 30000,
      },
      {
        name: "Hazelnut Latte 3",
        total: 3,
        size: "Extra Large",
        totalPriceItem: 30000,
      },
    ],
    [
      {
        name: "Hazelnut Latte 3",
        total: 3,
        size: "Extra Large",
        totalPriceItem: 30000,
      },
      {
        name: "Hazelnut Latte 3",
        total: 3,
        size: "Extra Large",
        totalPriceItem: 30000,
      },
    ],
  ]);

  let subTotal = 0;
  dataDummy.map((item) => {
    subTotal += item.totalPriceItem;
    console.log(subTotal);
  });

  const [taxFee, setTaxFee] = useState(subTotal * 0.1);

  const [discount, setDiscount] = useState(10000);

  const [totalPayment, setTotalPayment] = useState(
    subTotal - discount + taxFee
  );

  const idr = {
    style: "currency",
    currency: "IDR",
  };

  const formattedTotal = totalPayment
    .toLocaleString("id-ID", idr)
    .replace("Rp", "IDR")
    .replace(",00", "");
  const formattedDiscount = discount
    .toLocaleString("id-ID", idr)
    .replace("Rp", "IDR")
    .replace(",00", "");
  const formattedSubtotal = subTotal
    .toLocaleString("id-ID", idr)
    .replace("Rp", "IDR")
    .replace(",00", "");
  const formattedTax = taxFee
    .toLocaleString("id-ID", idr)
    .replace("Rp", "IDR")
    .replace(",00", "");

  return (
    <>
      <div className="col-lg-10 col-12 pe-lg-0 p-0">
        <Carousel interval={null}>
          {/* <div className="details-order  p-lg-5 p-4"> */}

          {dataDummy.map((item, index) => (
            <Carousel.Item>
              <div
                className="details-order card-product p-lg-5 p-4 mx-2"
                style={{ minHeight: "868px" }}
              >
                <div className="details-order__buyer-name text-center">
                  <div className="details-order__Title">Delivery Order</div>
                  <div className="details-order__name">for Zulaikha</div>
                </div>

                <div
                  className="list-ordered__cont row mt-5"
                  style={{ minHeight: "415px" }}
                >
                  {item.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="details-order__list-ordered col-12 my-3"
                      >
                        <div className="col-9">
                          <div className="row">
                            <div className="list-order__list col-4 p-0">
                              <img src="/images/bg-profile.png" alt="" />
                            </div>

                            <div className="list-order__details-items col-8">
                              <div className="details-items__name">
                                {item.name ? item.name : ""}
                              </div>
                              <div className="details-items__total">
                                x {item.total ? item.total : 0}
                              </div>
                              <div className="details-items__size">
                                {item.size ? item.size : "Regular"}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-roder__details-price col-3 text-end">
                          IDR{" "}
                          {item.totalPriceItem
                            ? item.totalPriceItem.toString().slice(0, -3)
                            : 0}
                          .0
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="details-order__details-price mt-3">
                  <div className=" d-flex justify-content-between">
                    <div className="details-price_left">
                      <p>DISCONT</p>
                      <p>SUBTOTAL</p>
                      <p>TAX & FEES</p>
                    </div>
                    <div className="details-price_right text-start">
                      <p>{discount ? formattedDiscount : 0}</p>
                      <p>{subTotal ? formattedSubtotal : 0}</p>
                      <p>{taxFee ? formattedTax : 0}</p>
                    </div>
                  </div>
                  <div className="detail-price__total-price fs-30 mt-4 d-flex justify-content-between">
                    <span className="fs-30 fs-sm-25">TOTAL</span>
                    <span className="fs-30 fs-sm-25">
                      {totalPayment ? formattedTotal : 0}
                    </span>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="swipe-text__btn text-center my-5 py-3">
          Slide to see upcoming orders
        </div>
      </div>
    </>
  );
}

export default ManageOrderLeftSide;
