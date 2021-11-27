import { Layout, Button } from "components";
import { Breadcrumb } from "react-bootstrap";
import Image from "next/image";

import { getDataCookie } from "middleware/authorizationPage";

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

export default function UpdateProduct() {
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
              <Button childrenClassName="promo-file-button mt-4">
                Choose from gallery
              </Button>
              <div className="mb-3">
                <Button type="submit" childrenClassName="promo-form-button">
                  Save Product
                </Button>
                <Button
                  type="button"
                  childrenClassName="promo-form-button-cancel"
                >
                  Cancel
                </Button>
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
