import React, { useState, useEffect, useRef } from "react";
import { Layout, Button } from "components";
import { Breadcrumb } from "react-bootstrap";
import { useRouter } from "next/router";
import { createNewProduct } from "store/action/product";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";
import product from "store/reducer/product";

export default function createProduct() {
  const router = useRouter();
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  const [displayImage, setDisplayImage] = useState(null);
  const [formProduct, setFormProduct] = useState({
    nameProduct: "",
    price: "",
    category: "",
    description: "",
    size: "",
    image: null,
  });

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const target1 = useRef(null);
  const target2 = useRef(null);
  const target3 = useRef(null);
  const target4 = useRef(null);
  const target5 = useRef(null);
  const target6 = useRef(null);

  const onChangeFile = (event) => {
    if (
      event.target.files.length !== 0 &&
      event.target.files[0].size >= 1024 * 1024
    ) {
      // toast.error("File to large.");
      setFormProduct({ image: null });
      return false;
    }
    if (event.target.files.length !== 0) {
      setDisplayImage(URL.createObjectURL(event.target.files[0]));
      setFormProduct({
        image: event.target.files[0],
      });
    }
  };

  const ChangeTextFile = (event) => {
    // if (formProduct.size == 1) {
    //   size = "R/L/XL";
    // } else formProduct.size == 2;
    // {
    //   size = "250/300/500";
    // }
    setFormProduct({
      ...formProduct,
      [event.target.name]: event.target.value,
    });
  };

  const createNewProductSubmit = async (event) => {
    try {
      event.preventDefault();
      const { nameProduct, price, category, description, size, image } =
        formProduct;

      const setDataProduct = {
        nameProduct,
        price,
        category,
        description,
        size,
        image,
      };

      const formDataProduct = new FormData();
      for (const value in setDataProduct) {
        await formDataProduct.append(value, setDataProduct[value]);
      }
      // console.log(setDataProduct, "sahdksahfjashfkjh");
      const response = await dispatch(createNewProduct(formDataProduct));
      // console.log(response);
      toast.success(response.value.data.message);
      setFormProduct({
        nameProduct: "",
        price: "",
        category: "",
        description: "",
        size: "",
        image: null,
      });

      event.target.reset();
      router.push("/admin/product");
    } catch (error) {
      console.log(error);
    }
  };

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
          <ToastContainer />
          <form onSubmit={createNewProductSubmit}>
            <section className="row mt-5">
              <section className="col-md-4  mb-5 text-center">
                <div
                  className={formProduct.image ? null : "promo-rounded-file"}
                >
                  <img
                    src={displayImage ? displayImage : "/images/camera.png"}
                    className={`${
                      formProduct.image
                        ? "file__image--active"
                        : "camera-upload-file"
                    }`}
                    alt="upload photo"
                  />
                </div>
                <button
                  className="promo-file-button mt-4"
                  onClick={onButtonClick}
                  type="button"
                >
                  Choose from gallery
                  <input
                    type="file"
                    ref={inputFile}
                    onChange={onChangeFile}
                    name="image"
                    style={{ display: "none" }}
                  />
                </button>
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
                <div className="product-form-input-parent">
                  <label htmlFor="nameProduct">Name: </label>
                  <input
                    type="text"
                    name="nameProduct"
                    id="nameProduct"
                    onChange={ChangeTextFile}
                    className="product-form-input"
                    placeholder="Type product name min. 50 characters"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 product-form-input-parent">
                    <label htmlFor="price">Price : </label>
                    <input
                      type="text"
                      onChange={ChangeTextFile}
                      name="price"
                      id="price"
                      className="product-form-input"
                      placeholder="Type the price"
                    />
                  </div>
                  <div className="col-md-6 product-form-input-parent">
                    <label htmlFor="category">Category: </label>
                    <select
                      name="category"
                      id="category"
                      onChange={ChangeTextFile}
                      className="product-form-select "
                    >
                      <option hidden>Category</option>
                      <option value="coffee">coffee</option>
                      <option value="non-coffee">non-coffee</option>
                      <option value="foods">foods</option>
                      <option value="add-on">add-on</option>
                    </select>
                  </div>
                </div>
                <div className=" product-form-input-parent">
                  <label htmlFor="description">Description :</label>
                  <input
                    type="text"
                    onChange={ChangeTextFile}
                    name="description"
                    id="description"
                    className="product-form-input"
                    placeholder="Describe your product min. 150 characters"
                  />
                </div>
                <div className="product-form-input-parent">
                  <label htmlFor="size">Input product size : </label>
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
                      onChange={ChangeTextFile}
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
                      onChange={ChangeTextFile}
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
                      onChange={ChangeTextFile}
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
                      onChange={ChangeTextFile}
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
                      onChange={ChangeTextFile}
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
                      onChange={ChangeTextFile}
                    />
                    <label
                      htmlFor="500gr"
                      className="size__button"
                      onClick={() => target6.current.click()}
                    >
                      500gr
                    </label>
                  </div>
                </div>
              </section>
            </section>
          </form>
        </main>
      </Layout>
    </>
  );
}
