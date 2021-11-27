import { Layout, Button } from "components";
import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateProduct() {
  const target1 = useRef(null);
  const target2 = useRef(null);
  const target3 = useRef(null);
  const target4 = useRef(null);
  const target5 = useRef(null);
  const target6 = useRef(null);
  return (
    <>
      <Layout pageTitle="Update Product" isLogged={true}>
        <main className="container">
          <Breadcrumb className="mt-4">
            <Breadcrumb.Item href="#" className="breadcrumb-default" active>
              Product
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" active>
              <span className="breadcrumb-active">Update Product</span>
            </Breadcrumb.Item>
          </Breadcrumb>

          <section className="row mt-5">
            <section className="col-md-4  mb-5 text-center">
              <div className="promo-rounded-file">
                <img
                  src="/images/camera.png"
                  className="camera-upload-file"
                  alt="upload photo"
                />
              </div>

              <button type="button" className="promo-file-button mt-4">
                Choose from gallery
              </button>

              <div className="mb-3">
                <button type="submit" className="promo-form-button">
                  Save Product
                </button>
                <button type="button" className="promo-form-button-cancel">
                  Cancel
                </button>
              </div>
            </section>
            <div className="col-md-2"></div>
            <section className="col-md-6 mb-5 ">
              <form>
                <div className=" product-form-input-parent">
                  <label htmlFor="name">Name: </label>
                  <input
                    type="text"
                    className="product-form-input"
                    placeholder="Type product name min. 50 characters"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 product-form-input-parent">
                    <label htmlFor="minTotal">Price : </label>
                    <input
                      type="text"
                      className="product-form-input"
                      placeholder="Type the price"
                    />
                  </div>
                  <div className="col-md-6 product-form-input-parent">
                    <label htmlFor="maxTotal">Category: </label>
                    <select
                      // name="category"
                      // id="discount"
                      // value={formVoucher.discount}
                      // onChange={ChangeTextFile}
                      className="product-form-select "
                    >
                      <option hidden>Category</option>
                      <option value="coffe">coffe</option>
                      <option value="non-coffe">non-coffe</option>
                      <option value="foods">foods</option>
                      <option value="add-on">add-on</option>
                    </select>
                  </div>
                </div>
                <div className=" product-form-input-parent">
                  <label htmlFor="input">Description :</label>
                  <input
                    type="text"
                    className="product-form-input"
                    placeholder="Describe your product min. 150 characters"
                  />
                </div>
                <div className="product-form-input-parent">
                  <label htmlFor="description">Input product size : </label>
                  <div className="description-size">
                    <p>Click size you want to use for this product</p>
                  </div>

                  <div className="size">
                    <input
                      type="checkbox"
                      className="size__input"
                      ref={target1}
                      value="1"
                      name="size"
                      id="size"
                    />
                    <label
                      htmlFor="r"
                      className="size__button"
                      onClick={() => target1.current.click()}
                    >
                      R
                    </label>

                    <input
                      type="checkbox"
                      className="size__input"
                      ref={target2}
                      value="1"
                      name="size"
                      id="size"
                    />
                    <label
                      htmlFor="l"
                      className="size__button"
                      onClick={() => target2.current.click()}
                    >
                      L
                    </label>

                    <input
                      type="checkbox"
                      className="size__input"
                      ref={target3}
                      value="1"
                      name="size"
                      id="size"
                    />
                    <label
                      htmlFor="xl"
                      className="size__button"
                      onClick={() => target3.current.click()}
                    >
                      XL
                    </label>

                    <input
                      type="checkbox"
                      className="size__input"
                      ref={target4}
                      value="2"
                      name="size"
                      id="size"
                    />
                    <label
                      htmlFor="250gr"
                      className="size__button "
                      onClick={() => target4.current.click()}
                    >
                      250gr
                    </label>

                    <input
                      type="checkbox"
                      className="size__input"
                      ref={target5}
                      value="2"
                      name="size"
                      id="size"
                    />
                    <label
                      htmlFor="300gr"
                      className="size__button"
                      onClick={() => target5.current.click()}
                    >
                      300gr
                    </label>

                    <input
                      type="checkbox"
                      className="size__input"
                      ref={target6}
                      value="2"
                      name="size"
                      id="size"
                    />
                    <label
                      htmlFor="500gr"
                      className="size__button"
                      onClick={() => target6.current.click()}
                    >
                      500gr
                    </label>
                  </div>

                  {/* <div className="row size mt-4">
                    <div className="col-2 size__cup">
                      <p>R</p>
                    </div>
                    <div className="col-2 size__cup">
                      <p>L</p>
                    </div>
                    <div className="col-2 size__cup">
                      <p>XL</p>
                    </div>
                    <div className="col-2 size__gr">
                      <div className="size__gr--col">
                        <p>250</p>
                        <p>gr</p>
                      </div>
                    </div>
                    <div className="col-2 size__gr">
                      <div className="size__gr--col">
                        <p>300</p>
                        <p>gr</p>
                      </div>
                    </div>
                    <div className="col-2 size__gr">
                      <div className="size__gr--col">
                        <p>500</p>
                        <p>gr</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </form>
            </section>
          </section>
        </main>
      </Layout>
    </>
  );
}
