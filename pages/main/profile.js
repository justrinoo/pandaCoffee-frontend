import React from "react";
import Navbar from "components/modules/Navbar";
import Layout from "components/Layout";

export default function Profile() {
  return (
    <>
      <Layout title="Profile">
        <Navbar></Navbar>
        <h1>Page profile</h1>
        <h3>Link Backend : {process.env.URL_BACKEND}</h3>
        <button className="btn btn-primary">Click Me !</button>
      </Layout>
    </>
  );
}
