import React, { useState, useEffect } from "react";
import Layout from "components/Layout";
import ManageOrderRightSide from "/components/ManageOrder/RightSide";
import ManageOrderLeftSide from "components/ManageOrder/LeftSide";
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

function manageOrderPage(props) {
  return (
    <Layout isLogged={true}>
      <div className="container-fluid manage-order__background py-4">
        <div className="manage-order__stepper col-12">
          <div className="col-12 d-flex justify-content-center align-items-center ">
            <div className="manage-order__stepper-circle">
              <img src="/icons/Vector.png" alt="" />
            </div>

            <hr style={{ width: "118px", border: "2px solid white" }} />

            <div className="manage-order__stepper-circle">
              <img src="/icons/Vector.png" alt="" />
            </div>

            <hr style={{ width: "118px", border: "2px solid white" }} />

            <div className="manage-order__stepper-circle">
              <div className="stepper-circle__order"></div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row my-4 justify-content-center justify-content-lg-between">
            <div className="col-lg-12 col-12 text-lg-start text-center">
              <p className="fcolor-white fs-40 col-lg-5 col-12 fw-700 text-popins">
                Finish your customer order now.
              </p>
            </div>
            <div className="col-lg-6 col-12 row">
              <ManageOrderLeftSide />
            </div>
            <div className="col-lg-5">
              <ManageOrderRightSide />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default manageOrderPage;
