import React, { useState } from "react";
import { Layout } from "components";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { loginUser, getUserLogin } from "store/action/auth";
import Link from "next/link";
import { getDataCookie } from "middleware/authorizationPage";
// import { Alert } from "bootstrap";
import axios from "utils/axios";
export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);
  console.log(dataCookie.isLogin);
  if (dataCookie.isLogin) {
    return {
      redirect: {
        destination: "/product",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

const Login = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({ email: "", password: "" });
  console.log(id);
  // Handle Login
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/auth/reset-password/${id}`, form)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        router.push("/auth/login");
      })
      .catch((err) => {
        if (err.response.data.message == "jwt expired") {
          toast.warn("Waktunya Habis, Verifikasi Ulang");
        } else {
          toast.warn(err.response.data.message);
        }
      });
  };

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Handle Login End

  return (
    <Layout pageTitle="Reset Password" isLogged={true}>
      <div className="row">
        <div className="col-md-6 hide__mobile">
          <img src="/images/coffee-left.png" />
        </div>
        <div className="col-md-6">
          {/* Auth Navbar */}
          {/* Auth Navbar End */}
          <ToastContainer />
          <h2 className="register-title">Reset Password</h2>
          {/* Auth Login Form */}
          <div className="container auth-form">
            <form onSubmit={handleSubmit}>
              <label className="form-label">New Password</label>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="password"
                  className="form-control p-3 "
                  placeholder="Input New Password"
                  name="newPassword"
                  onChange={handleChangeText}
                />
              </div>
              <label className="form-label">Confirm Password</label>
              <div className="input-group input-group-sm mb-3">
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="form-control p-3"
                  name="confirmPassword"
                  onChange={handleChangeText}
                />
              </div>
              Have An Account ?{" "}
              <Link href="/auth/forgotPassword">
                <a className="forgot-password">Login!</a>
              </Link>
              <button className="button-submit btn btn-warning  rounded-pill mb-3 p-3 mt-5">
                Login
              </button>
            </form>
            {/* <button className="button-submit btn btn-light mt-3 rounded-pill">
              <img src="/images/google-logo.png" className="image-google" />
              Login with Google
            </button> */}
          </div>
          {/* Auth Login Form End */}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
const mapDispatchToProps = { loginUser, getUserLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
