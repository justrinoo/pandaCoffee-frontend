import { Layout, Button } from "components";
import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { updateNewProduct } from "store/action/product";

export default function UpdateProduct() {
  const target1 = useRef(null);
  const target2 = useRef(null);
  const target3 = useRef(null);
  const target4 = useRef(null);
  const target5 = useRef(null);
  const target6 = useRef(null);

  const router = useRouter();
  const product = useSelector((state) => state.product);
  const id = product.data.id;
  const dispatch = useDispatch();
  // console.log("data product =>", product);

  const inputFile = useRef(null);

  const [displayImage, setDisplayImage] = useState(null);
  const [formProduct, setFormProduct] = useState({
    nameProduct: product.data.nameProduct,
    price: product.data.price,
    category: product.data.category,
    description: product.data.description,
    size: product.data.size,
    image: product.data.image,
  });

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

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const ChangeTextFile = (event) => {
    setFormProduct({
      ...formProduct,
      [event.target.name]: event.target.value,
    });
  };

  const createUpdateProductSubmit = async (e) => {
    try {
      e.preventDefault();
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
      // console.log(setDataProduct);
      const formUpdateData = new FormData();
      for (const value in setDataProduct) {
        await formUpdateData.append(value, setDataProduct[value]);
      }
      const response = await dispatch(updateNewProduct(formUpdateData, id));
      // console.log(response);
      toast.success(response.value.data.message);
      setTimeout(() => {
        router.push("/admin/product");
      }, 4000);
    } catch (err) {
      console.log(err);
    }
  };

  const CancelUpdatePromo = () => {
    router.push("/admin/product");
  };

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
          <ToastContainer />
          <form onSubmit={createUpdateProductSubmit}>
            <section className="row mt-5">
              <section className="col-md-4  mb-5 text-center">
                <div
                  className={formProduct.image ? null : "promo-rounded-file"}
                >
                  <img
                    src={
                      displayImage
                        ? displayImage
                        : formProduct.image
                        ? `${process.env.BASE_URL_DEV}upload/product/${formProduct.image}`
                        : "/images/camera.png"
                    }
                    className={`${
                      formProduct.image
                        ? "file__image--active"
                        : "camera-upload-file"
                    }`}
                    alt="upload photo"
                  />
                  <input
                    type="file"
                    name="image"
                    ref={inputFile}
                    onChange={onChangeFile}
                    style={{ display: "none" }}
                  />
                </div>

                <button
                  type="button"
                  className="promo-file-button mt-4"
                  onClick={onButtonClick}
                >
                  Choose from gallery
                </button>

                <div className="mb-3">
                  <button type="submit" className="promo-form-button">
                    Save Product
                  </button>
                  <button
                    type="button"
                    className="promo-form-button-cancel"
                    onClick={CancelUpdatePromo}
                  >
                    Cancel
                  </button>
                </div>
              </section>
              <div className="col-md-2"></div>
              <section className="col-md-6 mb-5 ">
                <div className=" product-form-input-parent">
                  <label htmlFor="nameProduct">Name: </label>
                  <input
                    type="text"
                    name="nameProduct"
                    id="nameProduct"
                    value={formProduct.nameProduct}
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
                      name="price"
                      id="price"
                      value={formProduct.price}
                      onChange={ChangeTextFile}
                      className="product-form-input"
                      placeholder="Type the price"
                    />
                  </div>
                  <div className="col-md-6 product-form-input-parent">
                    <label htmlFor="category">Category: </label>
                    <select
                      name="category"
                      id="category"
                      value={formProduct.category}
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
                    name="description"
                    id="description"
                    value={formProduct.description}
                    onChange={ChangeTextFile}
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
                      checked={formProduct.size == "R"}
                      onChange={ChangeTextFile}
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
                      checked={formProduct.size == "L"}
                      onChange={ChangeTextFile}
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
                      checked={formProduct.size == "XL"}
                      onChange={ChangeTextFile}
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
                      checked={formProduct.size == "250gr"}
                      onChange={ChangeTextFile}
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
                      checked={formProduct.size == "300gr"}
                      onChange={ChangeTextFile}
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
                      checked={formProduct.size == "500gr"}
                      onChange={ChangeTextFile}
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
                </div>
              </section>
            </section>
          </form>
        </main>
      </Layout>
    </>
  );
}
