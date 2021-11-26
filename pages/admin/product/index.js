import React, { useState, useEffect } from "react";
import { Layout, Button, Promo } from "components";
import Image from "next/image";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import { getDataCookie } from "middleware/authorizationPage";
import axios from "utils/axios";

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
      `http://localhost:3001/product?search=&sortField=&sort=&page=&limit=&category`
    )
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });

  return {
    props: { listProduct: dataProduct },
  };
}

function ProductAdmin(props) {
  const { auth } = props;
  const router = useRouter();

  const [listProduct, setListProduct] = useState(props.listProduct);
  console.log(listProduct);

  const [dummy, setDummy] = useState([
    {
      id: "370e24ef-96f6-4508-b632-60a72c3ca491",
      productName: "Hazelnut Latte",
      price: 25000,
    },
    {
      id: "378c5436-ae86-4a0a-a088-438b45d12f5f",
      productName: "Hazelnut Latte",
      price: 25000,
    },
    {
      id: "3ba2ab2d-6095-4778-bb98-0aa496712cb9",
      productName: "Hazelnut Latte",
      price: 25000,
    },
    {
      id: "4d4d7aa7-71b9-44f0-877d-9a95eaf28e6e",
      productName: "Hazelnut Latte",
      price: 25000,
    },
    {
      id: "aa99e09c-4d92-41d3-a864-0b1a5f8e486a",
      productName: "Hazelnut Latte",
      price: 25000,
    },
    {
      productName: "Hazelnut Latte",
      price: 25000,
    },
  ]);

  // FORMATING TO IDR CURRENCY
  const formatIDR = (data) => {
    return parseInt(data)
      .toLocaleString("id-ID", parseInt(data))
      .replace("Rp", "IDR")
      .replace(",00", "");
  };
  return (
    <>
      <Layout pageTitle="Product Admin" isLogged={true}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 ">
              <Promo role={auth.userLogin[0].role} />
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
                {listProduct.map((item, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-4 col-sm-6 col-6 px-1 my-4"
                    onClick={
                      auth.userLogin[0].role === "admin"
                        ? () => {}
                        : () => router.push(`/productDetails/${item.id}`)
                    }
                  >
                    <div className=" product__list ">
                      <div className="d-flex justify-content-center">
                        <img
                          src={`http://localhost:3001/upload/product/${item.image}`}
                          alt="ada"
                        />
                      </div>
                      <h2>{item.nameProduct}</h2>
                      <h4>IDR {formatIDR(parseInt(item.price[0]))}</h4>
                    </div>
                    {auth.userLogin[0].role === "admin" ? (
                      <div className="product__icon">
                        <div className="product__icon--trash">
                          <img src="/icons/trash 1.svg" />
                        </div>
                        <div className="product__icon--pencil">
                          <img src="/icons/pencil.svg" />
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              {auth.userLogin[0].role === "admin" ? (
                <Button childrenClassName="product__button">
                  Add new product
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(ProductAdmin);
