import React, { useEffect, useState } from "react";
import { Layout } from "components";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { connect } from "react-redux";
import { getDetailsProduct } from "store/action/product";
import { getDataCookie } from "middleware/authorizationPage";
import { toast, ToastContainer } from "react-toastify";
import { addItemToCart } from "store/action/cart";

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

  const dataProduct = await axios
    .get(
      `${process.env.BASE_URL_DEV}product/getDetails/${context.params.productId}`
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return {};
    });
  return {
    props: { data: dataProduct },
  };
}

function DetailsProductPage(props) {
  console.log(props.data);
  const { data } = props;

  const router = useRouter();

  const [size, setSize] = useState(1);

  const sizeText =
    data.size == 1
      ? size === 1
        ? "R"
        : size === 2
        ? "L"
        : size === 3
        ? "XL"
        : ""
      : size === 1
      ? "250gr"
      : size === 2
      ? "300gr"
      : size === 3
      ? "500gr"
      : "";

  const handleChangeSize = (data) => {
    setSize(data);
  };

  // Pemilihan Price berdasarkan ukuran (1 = R, 2 = L, 3 = XL)
  const priceItem =
    size === 1
      ? data.price[0]
      : size === 2
      ? data.price[1]
      : size === 3
      ? data.price[2]
      : 0;

  const [counter, setCounter] = useState(1);

  const hanldeMin = () => {
    setCounter(counter - 1);
  };
  const handlePlus = () => {
    setCounter(counter + 1);
  };

  const formatIDR = (data) => {
    return parseInt(data)
      .toLocaleString("id-ID", parseInt(data))
      .replace("Rp", "IDR")
      .replace(",00", "");
  };

  const handleAddToCart = () => {
    !counter || !priceItem || !size
      ? toast.error("Select Size and Total Item First")
      : null;
    props.addItemToCart({
      itemId: router.query.productId,
      totalItem: counter,
      priceItem: priceItem,
      size: sizeText,
      image: props.data.image,
    });
    toast.success("Success Add Item to Cart");
    // router.push("/customer/checkout");
  };

  console.log(props);
  return (
    <Layout title="Details Product" isLogged={true}>
      <ToastContainer />
      <div className="container-fluid py-5 mb-5">
        <div className="product-details__category container ">
          <span className="fw-400">
            {props.data.category ? props.data.category : "All"}
          </span>
          <span className="fw-700"> &gt; {props.data.nameProduct} </span>
        </div>
        <div className="container d-flex justify-content-center mt-5 col-12">
          <div className="row col-12">
            <div className="col-lg-6 col-12">
              {/* <DetailsProductLeftSide data={props.data} /> */}
              <div className="product-details__product-name d-flex flex-column justify-content-center text-center fs-35 text-poppins">
                <div className="d-flex justify-content-center mb-4">
                  <img
                    src={`${process.env.BASE_URL_DEV}upload/product/${props.data.image}`}
                    alt=""
                    className="product-details__img-product"
                  />
                </div>
                <div className="d-lg-flex d-none justify-content-center">
                  <div className="card-product col-lg-8 col-12 fw-700 fs-25  p-4 text-center d-flex flex-column align-items-center">
                    Choose a size
                    <div className="d-flex mt-2 text-poppins justify-content-evenly align-items-center margin-auto">
                      <div
                        onClick={() => handleChangeSize(1)}
                        className={`d-flex noselect hover-pointer ${
                          props.data.size == "1" ? "fs-30" : "fs-20"
                        } fw-700 justify-content-center mx-2 align-items-center ${
                          size === 1
                            ? "details-product__size-list"
                            : "details-product__size-list-dactive"
                        }`}
                      >
                        {props.data.size == "1" ? "R" : "250g"}
                      </div>
                      <div
                        onClick={() => handleChangeSize(2)}
                        className={`d-flex noselect hover-pointer ${
                          props.data.size == "1" ? "fs-30" : "fs-20"
                        } fw-700 justify-content-center mx-2 align-items-center ${
                          size === 2
                            ? "details-product__size-list"
                            : "details-product__size-list-dactive"
                        }`}
                      >
                        {props.data.size == "1" ? "L" : "300g"}
                      </div>
                      <div
                        onClick={() => handleChangeSize(3)}
                        className={`d-flex noselect hover-pointer ${
                          props.data.size == "1" ? "fs-30" : "fs-20"
                        } fw-700 justify-content-center mx-2 align-items-center ${
                          size === 3
                            ? "details-product__size-list"
                            : "details-product__size-list-dactive"
                        }`}
                      >
                        {props.data.size == "1" ? "XL" : "500g"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-lg-flex d-none justify-content-center">
                  <div
                    onClick={() => handleAddToCart()}
                    className="text-center hover-pointer text-poppins fcolor-white fw-700 fs-25 py-3 col-8 d-flex justify-content-center details-product__btn-add-cart my-4"
                  >
                    Add to Cart
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              {/* <DetailsProductRightSide data={props.data} /> */}
              <div className="product-details__produc-name text-center mt-3 mt-lg-0 fs-sm-40 fs-65 text-poppins fw-900">
                {data.nameProduct}
              </div>
              <div className="product-details__product-desc mt-4 fw-400 fs-25 text-poppins">
                {data.description}
              </div>
              <div className="d-lg-none d-flex justify-content-center">
                <div className="card-product  mt-4 col-lg-8 col-12 fw-700 fs-25  p-4 text-center d-flex flex-column align-items-center">
                  Choose a size
                  <div className="d-flex mt-2 text-poppins justify-content-evenly align-items-center margin-auto">
                    <div
                      onClick={() => handleChangeSize(1)}
                      className={`d-flex noselect hover-pointer ${
                        props.data.size == "1" ? "fs-30" : "fs-20"
                      } fw-700 justify-content-center mx-2 align-items-center ${
                        size === 1
                          ? "details-product__size-list"
                          : "details-product__size-list-dactive"
                      }`}
                    >
                      {props.data.size == "1" ? "R" : "250g"}
                    </div>
                    <div
                      onClick={() => handleChangeSize(2)}
                      className={`d-flex noselect hover-pointer ${
                        props.data.size == "1" ? "fs-30" : "fs-20"
                      } fw-700 justify-content-center mx-2 align-items-center ${
                        size === 2
                          ? "details-product__size-list"
                          : "details-product__size-list-dactive"
                      }`}
                    >
                      {props.data.size == "1" ? "L" : "300g"}
                    </div>
                    <div
                      onClick={() => handleChangeSize(3)}
                      className={`d-flex noselect hover-pointer ${
                        props.data.size == "1" ? "fs-30" : "fs-20"
                      } fw-700 justify-content-center mx-2 align-items-center ${
                        size === 3
                          ? "details-product__size-list"
                          : "details-product__size-list-dactive"
                      }`}
                    >
                      {props.data.size == "1" ? "XL" : "500g"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-5 mb-4">
                <div className="product-details__counter-quantity d-flex align-items-center fcolor-029">
                  <span
                    className="counter-quantity__min noselect d-flex text-center justify-content-center align-items-center fw-900 fs-25 hover-pointer"
                    style={{ width: "50px" }}
                    onClick={counter > 1 ? () => hanldeMin() : null}
                  >
                    -
                  </span>
                  <input
                    className="counter-quantity__count d-flex text-center justify-content-center align-items-center fw-700 fs-25"
                    style={{ width: "50px", borderTop: "0", borderBottom: "0" }}
                    value={counter}
                    onChange={(event) =>
                      setCounter(
                        parseInt(event.target.value ? event.target.value : 0)
                      )
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
                <div className="product-details__price fw-700 fs-35 fs-sm-25">
                  IDR {formatIDR(priceItem)}
                </div>
              </div>
              <div className="p-4 card-product d-flex flex-lg-row flex-column justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center align-items-center">
                  <img
                    src={`${process.env.BASE_URL_DEV}upload/product/${props.data.image}`}
                    alt=""
                    className="product-details__img-product__checkout-details me-3"
                  />
                  <div className="checkout-details__item-name-total">
                    <div className="item-name-total__name fw-900 fs-25 text-poppins">
                      {props.data.nameProduct}
                    </div>
                    <div className="item-name-total_total fw-400 fs-20 text-poppins">
                      x{counter} {sizeText ? `(${sizeText})` : ""}
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => router.push("/customer/checkout")}
                  className="checkout-details_checkout hover-pointer d-flex justify-content-between mt-4 mt-lg-0 align-items-center"
                >
                  <span className="fw-700 fs-25 me-3">Checkout</span>
                  <div className="checkout-details_checkout-arrow d-flex align-items-center justify-content-center">
                    <img src="/icons/arrow3.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex d-lg-none justify-content-center">
              <div
                onClick={() => handleAddToCart()}
                className="text-center hover-pointer text-poppins fcolor-white fw-700 fs-25 py-3 col-12 d-flex justify-content-center details-product__btn-add-cart my-4"
              >
                Add to Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
});
const mapDispatchToProps = {
  getDetailsProduct,
  addItemToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsProductPage);
