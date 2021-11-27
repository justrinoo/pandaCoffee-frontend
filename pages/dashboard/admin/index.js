import React, { useState } from "react";
import Image from "next/image";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import Footer from "components/Footer/index";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unAuthPage } from "middleware/authorizationPage";

export default function forgotPassword() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/forgot-password", form)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.warn(err.response.data.message);
      });
  };
  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Layout title="Dashboard Admin">
      <Navbar />
      <main className="dashboard-admin">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className="chart-admin"></div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </main>
      <Footer></Footer>
    </Layout>
  );
}
