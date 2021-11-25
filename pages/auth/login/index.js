import React, { useState } from "react";
import Layout from "components/Layout";
import NavbarLogin from "components/modules/auth/NavbarLogin";
import Footer from "components/modules/auth/Footer";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unAuthPage } from "middleware/authorizationPage";
import { connect } from "react-redux";
import { loginUser, getUserLogin } from "store/action/auth";

const Login = (props) => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  // Handle Login
  console.log(props);
  const handleSubmit = (e) => {
    e.preventDefault();
    props
      .loginUser(form)
      .then((res) => {
        console.log(res.value.data.data);
        Cookie.set("token", res.value.data.data.token);
        localStorage.setItem("token", res.value.data.data.token);
        Cookie.set("id", res.value.data.data.id);
        props.getUserLogin(res.value.data.data.id);
        // // router.push("/main/home");
        toast.success("Login Sucess");
        if (res.value.data.data.role === "admin") {
          setTimeout(() => {
            router.push(`/main/admin`);
          }, 4000);
        } else {
          setTimeout(() => {
            router.push("/main/home");
          }, 4000);
        }
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        console.log(err);
      });
    console.log(form);
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Handle Login End

  return (
    <Layout title="Login Panda Coffee">
      <div className="row">
        <div className="col-md-6">
          <img src="/images/coffee-left.png" />
        </div>
        <div className="col-md-6">
          {/* Auth Navbar */}
          <NavbarLogin />
          {/* Auth Navbar End */}
          <ToastContainer />
          <h2 className="register-title">Login</h2>
          {/* Auth Login Form */}
          <div className="container auth-form">
            <form onSubmit={handleSubmit}>
              <label className="form-label">Email Adress</label>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChangeText}
                />
              </div>
              <label className="form-label">Password</label>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChangeText}
                />
              </div>
              <a href="#" className="forgot-password">
                Forgot Password ?
              </a>
              <button className="button-submit btn btn-warning mt-3 rounded-pill">
                Login
              </button>
            </form>
            <button className="button-submit btn btn-light mt-3 rounded-pill">
              <img src="/images/google-logo.png" className="image-google" />
              Login with Google
            </button>
          </div>
          {/* Auth Login Form End */}
        </div>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
const mapDispatchToProps = { loginUser, getUserLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
