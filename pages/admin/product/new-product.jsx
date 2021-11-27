import React, { useState, useEffect, useRef } from "react";
import { Layout, Button } from "components";
import { Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/router";

export default function createProduct() {
  const router = useRouter();
  const handleCancel = (e) => {
    e.preventDefault();
    router.push(`/admin/product`);
  };
  return (
    <>
      <Layout pageTitle="Create Product" isLogged={true}>
        <main className="container">
          <Breadcrumb className="mt-4">
            <Breadcrumb.Item href="#" className="breadcrumb-default" active>
              Product
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#" active>
              <span className="breadcrumb-active">Add Product</span>
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
              <Button childrenClassName="promo-file-button mt-4">
                Choose from gallery
              </Button>
              <div className="mb-3">
                <button type="submit" className="promo-form-button">
                  Save Product
                </button>
                <button
                  type="button"
                  className="promo-form-button-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </section>
            <div className="col-md-2"></div>
            <section className="col-md-6 mb-5 ">
              <form>
                <div className="product-form-input-parent">
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
                  <div className="row size mt-4">
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
                  </div>
                </div>
              </form>
            </section>
          </section>
        </main>
      </Layout>
    </>
  );
}
