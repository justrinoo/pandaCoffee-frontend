import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setSelectedSize } from "store/action/product";
import { addItemToCart } from "store/action/cart";
import { useRouter } from "next/router";

function DetailsProductLeftSide(props) {
  const router = useRouter();
  const [size, setSize] = useState(0);

  const handleChangeSize = (data) => {
    // data === 1
    //   ? data.price[0]
    //   : props.product.selectedSize === 2
    //   ? data.price[1]
    //   : props.product.selectedSize === 3
    //   ? data.price[2]
    //   : 0;

    setSize(data);

    props.setSelectedSize({
      sizeItems: size,
      id: router.query.productId,
      productName: props.data.nameProduct,
    });
  };

  const handleAddToCart = () => {
    const { setDataToCart, total } = props.product;
    // productName: "",
    // totalOrderItem: "",
    // totalPriceItem: 0,
    // sizeItems: 0,
    const setDataItem = {
      size: setDataToCart.sizeItems,
      totalItem: total.totalOrderItem,
      productName: setDataToCart.productName,
      totalPrice: total.totalPriceItem,
      id: router.query.productId,
    };
    console.log(setDataItem);
    () => addItemToCart(setDataItem);
  };

  return (
    <>
      <div className="product-details__product-name d-flex flex-column justify-content-center text-center fs-35 text-poppins">
        <div className="d-flex justify-content-center mb-4">
          <img
            src={`http://localhost:3001/upload/product/${props.data.image}`}
            alt=""
            className="product-details__img-product"
          />
        </div>
        <div className="d-flex justify-content-center">
          <div className="card-product col-8 fw-700 fs-25  p-4 text-center d-flex flex-column align-items-center">
            Choose a size
            <div className="d-flex mt-2 text-poppins justify-content-evenly align-items-center margin-auto">
              <div
                onClick={() => handleChangeSize(1)}
                className="d-flex noselect hover-pointer fs-30 fw-700 justify-content-center mx-2 align-items-center details-product__size-list"
                style={size === 1 ? { border: "3px solid green" } : null}
              >
                R
              </div>
              <div
                onClick={() => handleChangeSize(2)}
                className="d-flex noselect hover-pointer fs-30 fw-700 justify-content-center mx-2 align-items-center details-product__size-list"
                style={size === 2 ? { border: "3px solid green" } : null}
              >
                L
              </div>
              <div
                onClick={() => handleChangeSize(3)}
                className="d-flex noselect hover-pointer fs-30 fw-700 justify-content-center mx-2 align-items-center details-product__size-list"
                style={size === 3 ? { border: "3px solid green" } : null}
              >
                XL
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div
            onClick={() => handleAddToCart()}
            className="text-center text-poppins fcolor-white fw-700 fs-25 py-3 col-8 d-flex justify-content-center details-product__btn-add-cart my-4"
          >
            Add to Cart
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
});
const mapDispatchToProps = {
  setSelectedSize,
  addItemToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsProductLeftSide);
