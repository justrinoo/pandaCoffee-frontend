import React, { useState, useEffect } from "react";
import { Layout, Button, Promo } from "components";
import Image from "next/image";
import { connect, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { getDataCookie } from "middleware/authorizationPage";
import axios from "utils/axios";

import Paginate from "react-paginate";
import { getAllPromo } from "store/action/voucher";

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
    .get(`${process.env.BASE_URL_DEV}product/favorite`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    })
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

function Product(props) {
  const voucher = useSelector((state) => state.voucher.vouchers);
  const { auth } = props;
  const router = useRouter();
  const { search, sortField, sort, pageP, category } = router.query;
  const [pageInfo, setPageInfo] = useState({ totalPage: 1 });
  // const [dataVoucher, setDataVoucher] = useState([]);
  // const [pageVoucher, setPageVoucher] = useState(1);
  // const [totalPageVoucher, setTotalPageVouher] = useState(1);

  const [listProduct, setListProduct] = useState(props.listProduct);
  // console.log(props);

  // LIST VOUCHER

  // FORMATING TO IDR CURRENCY
  const formatIDR = (data) => {
    return parseInt(data)
      .toLocaleString("id-ID", parseInt(data))
      .replace("Rp", "IDR")
      .replace(",00", "");
  };

  useEffect(() => {
    if (
      !router.query.search &&
      !router.query.sortField &&
      !router.query.sort &&
      !router.query.pageP &&
      !router.query.category
    ) {
      null;
    } else {
      axios
        .get(
          `${process.env.BASE_URL_DEV}product?search=${
            search ? search : ""
          }&sortField=${sortField ? sortField : ""}&sort=${
            sort ? sort : ""
          }&page=${pageP ? pageP : ""}&category=${category ? category : ""}`
        )
        .then((res) => {
          // console.log("TEST");
          setListProduct(res.data.data);
          setPageInfo(res.data.pagination);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setListProduct([]);
        });
    }
  }, [router.query]);

  const hanldeFavorite = () => {
    router.push("/product");
    axios.get(`${process.env.BASE_URL_DEV}product/favorite`).then((res) => {
      // console.log(res.data.data);
      setListProduct(res.data.data);
      setPageInfo({ totalPage: 1 });
    });
  };

  const handlePagination = (event) => {
    // console.log(event.selected + 1);
    router.push(
      `/product?search=${search ? search : ""}&sortField=${
        sortField ? sortField : ""
      }&sort=${sort ? sort : ""}&pageP=${event.selected + 1}&category=${
        category ? category : ""
      }`
    );
  };

  // useEffect(() => {
  // 	if (router.query.page) {
  // 		props
  // 			.getAllPromo(router.query.page, 4)
  // 			.then((res) => {
  // 				setDataVoucher(res.value.data.data);
  // 				setTotalPageVoucher(res.value.data.pagination);
  // 			})
  // 			.catch((err) => {
  // 				setDataVoucher([]);
  // 				setTotalPageVoucher(1);
  // 				// console.log(err.value);
  // 			});
  // 	} else {
  // 		props
  // 			.getAllPromo(1, 4)
  // 			.then((res) => {
  // 				console.log(res.value);
  // 			})
  // 			.catch((err) => {
  // 				console.log(err.value);
  // 			});
  // 	}
  // }, [router.query.page]);

  return (
    <>
      <Layout pageTitle="Product" isLogged={true}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 ">
              <Promo
                // role={auth.userLogin[0].role}
                data={voucher}
                pagination={{ totalPage: 1 }}
              />
            </div>
            <div className="col-lg-8 product">
              <div className="product__filter-product product__filter overflow-auto d-flex">
                <h2 onClick={() => hanldeFavorite()}>Favorite Product</h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/product?search=&sortField=&sort=&pageP=1&category=coffe"
                    )
                  }
                >
                  Coffe
                </h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/product?search=&sortField=&sort=&pageP=1&category=nonCoffee"
                    )
                  }
                >
                  Non Coffe
                </h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/product?search=&sortField=&sort=&pageP=1&category=food"
                    )
                  }
                >
                  Foods
                </h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/product?search=&sortField=&sort=&pageP=1&category=addon"
                    )
                  }
                >
                  Add-on
                </h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/product?search=&sortField=&sort=&pageP=1&category="
                    )
                  }
                >
                  All Product
                </h2>
              </div>
              <div className="row product__grid">
                {listProduct.map((item, index) => (
                  <div
                    key={index}
                    className="col-lg-3 col-md-4 col-sm-6 col-6 px-3 my-4"
                    onClick={() =>
                      router.push(`/customer/productDetails/${item.id}`)
                    }
                  >
                    <div className="pproduct__list hover-pointer">
                      <div className="d-flex justify-content-center">
                        <img
                          src={`${process.env.BASE_URL_DEV}upload/product/${item.image}`}
                          alt="ada"
                          className="product-image__list"
                        />
                      </div>
                      <div className="name-box my-3" style={{ height: "52px" }}>
                        <h2>{item.nameProduct}</h2>
                      </div>
                      <h4>IDR {formatIDR(parseInt(item.price[0]))}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <Paginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageInfo.totalPage}
                onPageChange={(event) => handlePagination(event)}
                containerClassName={"pagination"}
                pageClassName="mx-2"
                nextClassName="mx-2"
                activeClassName="fw-bold"
                className="d-flex justify-content-center list-unstyled"
                nextLinkClassName="text-decoration-none text-dark"
                previousLinkClassName="text-decoration-none text-dark"
                pageRangeDisplayed={5}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  voucher: state.voucher,
});
const mapDispatchToProps = {
  getAllPromo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
