import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import { getDataCookie } from "middleware/authorizationPage";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { Carousel, Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  if (!dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

function manageOrderPage(props) {
  const router = useRouter();
  const [dataDummy, setDataDummy] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const idr = {
    style: "currency",
    currency: "IDR",
  };

  const formattedIDR = (data) =>
    data.toLocaleString("id-ID", data).replace("Rp", "IDR").replace(",00", "");

  useEffect(() => {
    if (localStorage.getItem("role") != "admin") {
      router.push("/product");
    }

    axios
      .get(`/transaction/detail/pending`)
      .then((res) => {
        setDataDummy(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [dataDummy]);

  const [index, setIndex] = useState(0);
  const selectedPayment = dataDummy[index]
    ? dataDummy[index].paymentMethod
    : "";

  useEffect(() => {
    console.log(index);
  }, [index]);

  const updateStatus = () => {
    axios
      .patch(
        `transaction/detail/${dataDummy[index] ? dataDummy[index].id : ""}`,
        {
          statusTransaction: "success",
        }
      )
      .then((res) => {
        handleClose();
        toast.success(res.data.message);

        axios
          .get(`/transaction/detail/pending`)
          .then((res) => {
            setDataDummy(res.data.data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      });
  };

  return (
    <Layout isLogged={true}>
      <ToastContainer />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Done??</Modal.Title>
        </Modal.Header>
        <Modal.Body>Is This Order Already Done??</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NOT YET!!!
          </Button>
          <Button variant="primary" onClick={() => updateStatus()}>
            YES!!!
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid manage-order__background py-4">
        <div className="manage-order__stepper col-12">
          <div className="col-12 d-flex justify-content-center align-items-center ">
            <div className="manage-order__stepper-circle">
              <img src="/icons/Vector.png" alt="" />
            </div>

            <hr style={{ width: "118px", border: "2px solid white" }} />

            <div className="manage-order__stepper-circle">
              <img src="/icons/Vector.png" alt="" />
            </div>

            <hr style={{ width: "118px", border: "2px solid white" }} />

            <div className="manage-order__stepper-circle">
              <div className="stepper-circle__order"></div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row my-4 justify-content-center justify-content-lg-between">
            <div className="col-lg-12 col-12 text-lg-start text-center">
              <p className="fcolor-white fs-40 col-lg-5 col-12 fw-700 text-popins">
                Finish your customer order now.
              </p>
            </div>
            {/* {dataDummy.map((item, index) => ( */}
            <div className="row d-flex justify-content-lg-between justify-content-center">
              <div className="col-lg-6 col-12 row">
                <div className="col-lg-10 col-12 pe-lg-0 p-0">
                  <Carousel
                    activeIndex={index}
                    interval={null}
                    prevIcon={
                      <span
                        aria-hidden="true"
                        className="carousel-control-prev-icon"
                        onClick={() => console.log(index - 1)}
                      />
                    }
                    nextIcon={
                      <span
                        aria-hidden="true"
                        className="carousel-control-next-icon"
                        onClick={() => console.log(index + 1)}
                      />
                    }
                  >
                    {/* <div className="details-order  p-lg-5 p-4"> */}
                    {dataDummy === [] ? (
                      <Carousel.Item key={index}>
                        <div className="details-order card-product p-lg-4 p-4 mx-2">
                          Cant Find Any Order At This Moment
                        </div>
                      </Carousel.Item>
                    ) : (
                      dataDummy.map((item, index) => (
                        <Carousel.Item key={index}>
                          <div className="details-order card-product p-lg-4 p-4 mx-2">
                            <div className="details-order__buyer-name text-center">
                              <div className="details-order__Title">
                                Delivery Order
                              </div>
                              <div className="details-order__name">
                                for{" "}
                                {dataDummy[index]
                                  ? dataDummy[index].nameReceiver
                                  : ""}
                              </div>
                            </div>

                            <div className="list-ordered__cont row mt-5">
                              {item.product.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="details-order__list-ordered col-12 my-3"
                                  >
                                    <div className="col-9">
                                      <div className="d-flex">
                                        <div className="list-order__list p-0">
                                          <img
                                            src={`${process.env.BASE_URL_DEV}/upload/product/${item.image}`}
                                            alt=""
                                          />
                                        </div>

                                        <div className="list-order__details-items ms-4">
                                          <div className="details-items__name">
                                            {item.nameProduct
                                              ? item.nameProduct
                                              : ""}
                                          </div>
                                          <div className="details-items__total">
                                            x{" "}
                                            {item.quantity ? item.quantity : 0}
                                          </div>
                                          <div className="details-items__size">
                                            {item.size ? item.size : "Regular"}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="list-roder__details-price col-3 text-end">
                                      IDR{" "}
                                      {item.totalItemPayment
                                        ? item.totalItemPayment
                                            .toString()
                                            .slice(0, -3)
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
                                  <p>
                                    {item.discount
                                      ? formattedIDR(item.discount)
                                      : 0}
                                  </p>
                                  <p>
                                    {item.totalPayment && item.discount
                                      ? formattedIDR(
                                          item.discount + item.totalPayment
                                        )
                                      : 0}
                                  </p>
                                  {/* <p>{taxFee ? formattedTax : 0}</p> */}
                                </div>
                              </div>
                              <div className="detail-price__total-price fs-30 mt-4 d-flex justify-content-between">
                                <span className="fs-30 fs-sm-25">TOTAL</span>
                                <span className="fs-30 fs-sm-25">
                                  {item.totalPayment
                                    ? formattedIDR(item.totalPayment)
                                    : 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Carousel.Item>
                      ))
                    )}
                  </Carousel>

                  <div className="swipe-text__btn d-flex justify-content-between align-items-center text-center my-5 px-4 py-3">
                    <span
                      aria-hidden="true"
                      className="carousel-control-prev-icon hover-pointer"
                      onClick={() => (index > 0 ? setIndex(index - 1) : null)}
                    />
                    Click arrow to see upcoming orders
                    <span
                      aria-hidden="true"
                      className="carousel-control-next-icon hover-pointer"
                      onClick={() =>
                        index == dataDummy.length - 1
                          ? null
                          : setIndex(index + 1)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="col-12 fcolor-white fs-25 fw-700 text-popins mb-3">
                  Address{" "}
                </div>

                <div className="p-4 card-product mb-5">
                  <div className="addreass-details__buyer-name my-2 fw-400 fs-20">
                    <span className="fw-700 fs-20">Delivery to</span>
                    {/* Iskandar
                    Street */}
                  </div>
                  <div className="addreass-details__buyer-address py-2 fw-400 fs-20">
                    {dataDummy[index] ? dataDummy[index].alamat : ""}
                  </div>
                  <div className="addreass-details__buyer-number my-2 fw-400 fs-20">
                    {dataDummy[index] ? dataDummy[index].noTelpReceiver : ""}
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
                      <span className="fs-20 fw-400 text-poppins">
                        Bank account
                      </span>
                    </div>

                    <div className="payment-method__COD d-flex col-12 my-3 align-items-center hover-pointer">
                      <span className="payment-method__circle me-3 d-flex justify-content-center align-items-center">
                        {selectedPayment === "COD" ? (
                          <div className="cod-active"></div>
                        ) : null}
                      </span>
                      <span className="payment-method__icon method-icon__cod d-flex justify-content-center align-items-center me-3">
                        <img src="/images/paymentMethod/delivery.png" alt="" />
                      </span>
                      <span className="fs-20 fw-400 text-poppins">
                        Cash on delivery
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  onClick={handleShow}
                  className="order__mark-done col-12 py-4 my-5 text-center fw-700 fs-20 fcolor-white text-poppins"
                >
                  {/* <div className="order__mark-done col-12 py-4 my-5 text-center fw-700 fs-20 fcolor-white text-poppins"> */}
                  Mark as Done
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default manageOrderPage;
