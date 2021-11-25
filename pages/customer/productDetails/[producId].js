import React, { useEffect, useState } from "react";
import { Layout } from "components";
import DetailsProductLeftSide from "components/ProductComp/Details/leftSide";
import DetailsProductRightSide from "components/ProductComp/Details/RightSide";

function DetailsProductPage(props) {
  return (
    <Layout title="Details Product" isLogged={false}>
      <div className="container-fluid py-5 mb-5">
        <div className="product-details__category container ">
          <span className="fw-400">Favorite & Promo</span>
          <span className="fw-700"> &gt; Cold Brew </span>
        </div>
        <div className="container row d-flex justify-content-between mt-5">
          <div className="col-lg-6 col-12">
            <DetailsProductLeftSide />
          </div>
          <div className="col-lg-6 col-12">
            <DetailsProductRightSide />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default DetailsProductPage;
