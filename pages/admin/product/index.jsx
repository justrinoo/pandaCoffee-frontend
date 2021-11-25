import { Layout, Button, Promo } from "components";
import Image from "next/image";

export default function ProductAdmin() {
  return (
    <>
      <Layout pageTitle="Product Admin" isLogged={true}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 ">
              <Promo />
            </div>
            <div className="col-lg-8 product">
              <div className="product__filter ">
                <h2>Favorite Product</h2>
                <h2>Coffe</h2>
                <h2>Non Coffe</h2>
                <h2>Foods</h2>
                <h2>Add-on</h2>
              </div>
              <div className="row product__grid">
                <div className="col-3 px-1 my-4">
                  <div className=" product__list ">
                    <div className="d-flex justify-content-center">
                      <img src={"/images/productDummy.png"} alt="ada" />
                    </div>
                    <h2>Hazelnut Latte</h2>
                    <h4>IDR 25.000</h4>
                  </div>
                  <div className="product__icon">
                    <div className="product__icon--trash">
                      <img src="/icons/trash 1.svg" />
                    </div>
                    <div className="product__icon--pencil">
                      <img src="/icons/pencil.svg" />
                    </div>
                  </div>
                </div>
                <div className="col-3 px-1 my-4">
                  <div className=" product__list ">
                    <div className="d-flex justify-content-center">
                      <img src={"/images/productDummy.png"} alt="ada" />
                    </div>
                    <h2>Hazelnut Latte</h2>
                    <h4>IDR 25.000</h4>
                  </div>
                  <div className="product__icon">
                    <div className="product__icon--trash">
                      <img src="/icons/trash 1.svg" />
                    </div>
                    <div className="product__icon--pencil">
                      <img src="/icons/pencil.svg" />
                    </div>
                  </div>
                </div>
                <div className="col-3 px-1 my-4">
                  <div className=" product__list ">
                    <div className="d-flex justify-content-center">
                      <img src={"/images/productDummy.png"} alt="ada" />
                    </div>
                    <h2>Hazelnut Latte</h2>
                    <h4>IDR 25.000</h4>
                  </div>
                  <div className="product__icon">
                    <div className="product__icon--trash">
                      <img src="/icons/trash 1.svg" />
                    </div>
                    <div className="product__icon--pencil">
                      <img src="/icons/pencil.svg" />
                    </div>
                  </div>
                </div>
                <div className="col-3 px-1 my-4">
                  <div className=" product__list ">
                    <div className="d-flex justify-content-center">
                      <img src={"/images/productDummy.png"} alt="ada" />
                    </div>
                    <h2>Hazelnut Latte</h2>
                    <h4>IDR 25.000</h4>
                  </div>
                  <div className="product__icon">
                    <div className="product__icon--trash">
                      <img src="/icons/trash 1.svg" />
                    </div>
                    <div className="product__icon--pencil">
                      <img src="/icons/pencil.svg" />
                    </div>
                  </div>
                </div>
                <div className="col-3 px-1 my-4">
                  <div className=" product__list ">
                    <div className="d-flex justify-content-center">
                      <img src={"/images/productDummy.png"} alt="ada" />
                    </div>
                    <h2>Hazelnut Latte</h2>
                    <h4>IDR 25.000</h4>
                  </div>
                  <div className="product__icon">
                    <div className="product__icon--trash">
                      <img src="/icons/trash 1.svg" />
                    </div>
                    <div className="product__icon--pencil">
                      <img src="/icons/pencil.svg" />
                    </div>
                  </div>
                </div>
                <div className="col-3 px-1 my-4">
                  <div className=" product__list ">
                    <div className="d-flex justify-content-center">
                      <img src={"/images/productDummy.png"} alt="ada" />
                    </div>
                    <h2>Hazelnut Latte</h2>
                    <h4>IDR 25.000</h4>
                  </div>
                  <div className="product__icon">
                    <div className="product__icon--trash">
                      <img src="/icons/trash 1.svg" />
                    </div>
                    <div className="product__icon--pencil">
                      <img src="/icons/pencil.svg" />
                    </div>
                  </div>
                </div>
              </div>

              <Button childrenClassName="product__button">
                Add new product
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
