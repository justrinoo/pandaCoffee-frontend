import React, { useState } from "react";
import Image from "next/image";
import { Layout } from "components";
import Footer from "components/Footer";
import { toast, ToastContainer } from "react-toastify";
import axios from "utils/axios";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { connect } from "react-redux";

const ForgotPassword = (props) => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
  });
  // console.log(props);
  const handleSubmit = (e) => {
    e.preventDefault();
    let d = new Date();
    console.log(
      props.time.newResend,
      "SAMA => Jam Sekarang",
      `${d.getHours()}.${d.getMinutes()}`
    );
    console.log(props.time.newResend < `${d.getHours()}.${d.getMinutes()}`);
    if (`${d.getHours()}.${d.getMinutes()}` < props.time.newResend) {
      toast.error(
        `Kamu Baru Verifikasi, Silahkan Tunggu Sampai jam ${props.time.newResend}`
      );
    } else {
      axios
        .post("/auth/forgot-password", form)
        .then((res) => {
          toast.success(res.data.message);
          props.saveTime(`${d.getHours()}.${d.getMinutes() + 5}`);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    }
  };
  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Layout pageTitle="Forgot Password" isLogged={true}>
      <main className="forgot-password-content">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="forgot-contain col-md-6">
              <ToastContainer />
              <div className="forgot-title">
                <h1>Resend Link if you didn’t receive any link in 2 minutes</h1>
                <p className="forgot-p">Dont worry, we got your back</p>
              </div>
              <form className="forgot-password-form" onSubmit={handleSubmit}>
                <label for="inputPassword2" className="visually-hidden">
                  Password
                </label>
                <input
                  type="email"
                  className="forgot-input-email form-control rounded"
                  id="email"
                  name="email"
                  placeholder="Enter your Email Adress to get Link"
                  onChange={handleChangeText}
                />
                <p className="forgot-note">
                  Enter Your Email Again if you didn’t receive any link in 2
                  minutes
                </p>
                <div className="text-center">
                  <button
                    type="submit"
                    className="button-resend-link btn btn-warning mb-3 rounded"
                  >
                    Resend Link
                  </button>
                </div>
              </form>
              {/* Bagian Resend Link belum di handle */}

              {/* Bagian Resend Link belum di handle */}
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  time: state.time,
});

const mapDispatchToProps = (dispatch) => ({
  saveTime: (data) => dispatch({ type: "ADDTIME", data: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
