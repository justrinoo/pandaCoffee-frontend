import { Layout, Button, Promo } from "components";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { getDataCookie } from "middleware/authorizationPage";
import axios from "utils/axios";
import Paginate from "react-paginate";

export async function getServerSideProps({ query: { page = 1 } }) {
  const response = await axios
    .get(`promo?page=${page}&limit=4`)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch(() => {
      return [];
    });

  const dataProduct = await axios
    .get(`product/favorite`)
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      return [];
    });
  return {
    props: { response, listProduct: dataProduct },
  };
}

function ProductAdmin(props) {
  const { auth } = props;
  const router = useRouter();
  const { search, sortField, sort, page, category } = router.query;
  const [pageInfo, setPageInfo] = useState({});
  const dataVoucher = props.response.data;
  const pagination = props.response.pagination;
  console.log("data voucher =>", dataVoucher);
  console.log("data pagination =>", pagination);

  const [listProduct, setListProduct] = useState(props.listProduct);

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
      !router.query.page &&
      !router.query.category
    ) {
      null;
    } else {
      axios
        .get(
          `product?search=${search ? search : ""}&sortField=${
            sortField ? sortField : ""
          }&sort=${sort ? sort : ""}&page=${page ? page : ""}&category=${
            category ? category : ""
          }`
        )
        .then((res) => {
          console.log("TEST");
          setListProduct(res.data.data);
          setPageInfo(res.data.pagination);
        })
        .catch((err) => {
          // toast.error(err.response.data.message);
          setListProduct([]);
        });
    }
  }, [router.query]);

  const handleFavorite = () => {
    router.push("/admin/product");
    axios.get(`product/favorite`).then((res) => {
      console.log(res.data.data);
      setListProduct(res.data.data);
      setPageInfo({ totalPage: 1 });
    });
  };

  const RouteNewProduct = () => {
    router.push(`/admin/product/new-product`);
  };

  const handlePagination = async (event) => {
    const query = router.query;
    query.page = event.selected + 1;
    router.push({
      query: query,
    });
  };
  return (
    <>
      <Layout pageTitle="Product Admin" isLogged={true}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <Promo data={dataVoucher} pagination={pagination} />
            </div>
            <div className="col-lg-8 product">
              <div className="product__filter ">
                <h2 onClick={() => handleFavorite()}>Favorite Product</h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/admin/product?search=&sortField=&sort=&page=1&category=coffee"
                    )
                  }
                >
                  Coffe
                </h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/admin/product?search=&sortField=&sort=&page=1&category=non-coffee"
                    )
                  }
                >
                  Non Coffe
                </h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/admin/product?search=&sortField=&sort=&page=1&category=foods"
                    )
                  }
                >
                  Foods
                </h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/admin/product?search=&sortField=&sort=&page=1&category=add-on"
                    )
                  }
                >
                  Add-on
                </h2>
                <h2
                  onClick={() =>
                    router.push(
                      "/admin/product?search=&sortField=&sort=&page=1&category="
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
                    className="col-lg-3 col-md-4 col-sm-6 col-6 px-1 my-4"
                    // onClick={
                    //   auth.userLogin[0].role === "admin"
                    //     ? () => {}
                    //     : () => router.push(`/admin/update-product/${item.id}`)
                    // }
                  >
                    <div className=" product__list ">
                      <div className="d-flex justify-content-center">
                        <img
                          src={`${process.env.BASE_URL_DEV}upload/product/${item.image}`}
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
                          <img
                            src="/icons/pencil.svg"
                            // onClick={router.push(
                            //   `admin/update-product/${item.id}`
                            // )}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <Paginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageInfo.totalPage}
                containerClassName="d-flex justify-content-center list-unstyled"
                nextClassName="mx-2"
                pageClassName="mx-2"
                activeClassName="fw-bold"
                onPageChange={handlePagination}
                nextLinkClassName="text-decoration-none text-dark"
                previousLinkClassName="text-decoration-none text-dark"
              />

              {auth.userLogin[0].role === "admin" ? (
                <button className="product__button" onClick={RouteNewProduct}>
                  Add new product
                </button>
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
