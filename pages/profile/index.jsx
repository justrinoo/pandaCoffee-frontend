import React, { useState, useEffect, useRef } from "react";
import Cookie from "js-cookie";
import { Layout, Button } from "components";
import Image from "next/image";
import dummy from "public/images/profileDummy.png";
import edit from "public/icons/pencil.svg";
import { getDataCookie } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
  const dataCookie = await getDataCookie(context);

  if (!dataCookie.isLogin) {
    // return {
    //   redirect: {
    //     destination: "/auth/login",
    //     permanent: false,
    //   },
    // };
    console.log(dataCookie);
  }

  return {
    props: {},
  };
}
import { Modal } from "react-bootstrap";
import axios from "utils/axios";
import { connect } from "react-redux";
import { getUserLogin } from "store/action/auth";

const Profile = (props) => {
  const [data, setData] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const inputFile = useRef(null);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const id = Cookie.get("id");

  const getDataUser = () => {
    axios
      .get(`/user/${id}`)
      .then((res) => {
        setForm({
          ...res.data.data[0],
          birthDay: res.data.data[0].birthDay.slice(0, 10),
        });
        setData(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const [form, setForm] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    userName: "",
    firstName: "",
    lastName: "",
    birthDay: "",
    gender: "",
  });

  useEffect(() => {
    getDataUser();
  }, []);

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeFile = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    axios
      .patch(`/user/update/image`, formData)
      .then((res) => {
        props.getUserLogin(`${id}`);
        if (res.status === 200) {
          getDataUser();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios
      .patch(`user/image/delete`)
      .then((res) => {
        props.getUserLogin(`${id}`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`user/update`, form)
      .then((res) => {
        props.getUserLogin(`${id}`);
        console.log(res.data.data);
        setData(res.data.data);
        getDataUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Layout pageTitle="Profile" isLogged={true}>
        <div className="profile__bg py-4 ">
          <div className="container">
            <h1 className="profile__header">User Profile</h1>
            <div className="profile__content my-4">
              <div className="row">
                <div className="col-lg-4 col-sm-12 profile__info">
                  <div className="profile__image">
                    <img
                      src={
                        data.image
                          ? `${process.env.BASE_URL_DEV}upload/user/${data.image}`
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      }
                      className="rounded-circle"
                    />
                    <h5>{data.userName}</h5>
                    <p>{data.email}</p>
                    <button
                      className="profile__choose--button"
                      onClick={onButtonClick}
                    >
                      Choose photo
                      <input
                        type="file"
                        ref={inputFile}
                        onChange={onChangeFile}
                        name="image"
                        style={{ display: "none" }}
                      />
                    </button>

                    <button
                      className="profile__remove--button"
                      onClick={handleShow}
                    >
                      Remove photo
                    </button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Body>
                        <p>Remove Image?</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-primary"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={handleDelete}
                        >
                          Remove
                        </button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <div className="profile__edit--password">
                    <button
                      className="profile__edit--button"
                      // onClick={handleShow2}
                    >
                      Edit Password
                    </button>
                    {/* <Modal show={show} onHide={handleClose}>
                      <Modal.Body>
                        <p>Remove Image?</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <button
                          className="btn btn-primary"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={handleDelete}
                        >
                          Remove
                        </button>
                      </Modal.Footer>
                    </Modal> */}
                  </div>
                  <div className="profile__save">
                    <h4>Do you want to save the change?</h4>
                    <button
                      className="profile__save--button"
                      onClick={handleUpdate}
                    >
                      Save Change
                    </button>
                    <button className="profile__cancel--button">Cancel</button>
                    <button className="profile__edit--button">Log out</button>
                  </div>
                </div>
                <div className="col-lg-8 col-sm-12 profile__desc">
                  <div className="profile__contacts mb-4">
                    <h4>Contacts</h4>
                    <div className="profile__edit--pencil">
                      <img src="/icons/pencil.svg" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-7 col-sm-12 profile__input">
                      <p>Email adress:</p>
                      <input
                        type="text"
                        placeholder="zulaikha17@gmail.com"
                        onChange={onChangeInput}
                        name="email"
                        value={form.email}
                      />
                    </div>
                    <div className="col-lg-5 col-sm-12 profile__input">
                      <p>Mobile number:</p>
                      <input
                        type="number"
                        placeholder="(+62)813456782"
                        onChange={onChangeInput}
                        name="phoneNumber"
                        value={form.phoneNumber}
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 col-sm-12 profile__input">
                    <p>Delivery adress:</p>
                    <input
                      type="text"
                      placeholder="Iskandar Street no. 67 Block A Near Bus Stop"
                      onChange={onChangeInput}
                      value={form.address}
                      name="address"
                    />
                  </div>
                  <div className="profile__details">
                    <h4>Details</h4>
                  </div>
                  <div className="row">
                    <div className="col-lg-7 col-sm-12 profile__input">
                      <p>Display name:</p>
                      <input
                        type="text"
                        placeholder="Zulaikha"
                        onChange={onChangeInput}
                        value={form.userName}
                        name="userName"
                      />
                    </div>
                    <div className="col-lg-5 col-sm-12 profile__input">
                      <p>DD/MM/YY</p>
                      <input
                        type="date"
                        placeholder="03/04/90"
                        onChange={onChangeInput}
                        value={form.birthDay}
                        name="birthDay"
                      />
                    </div>
                  </div>
                  <div className="col-lg-7 col-sm-12 profile__input">
                    <p>First name:</p>
                    <input
                      type="text"
                      placeholder="Zulaikha"
                      onChange={onChangeInput}
                      name="firstName"
                      value={form.firstName}
                    />
                  </div>
                  <div className="col-lg-7 col-sm-12 profile__input">
                    <p>Last name:</p>
                    <input
                      type="text"
                      placeholder="Nirmala"
                      onChange={onChangeInput}
                      name="lastName"
                      value={form.lastName}
                    />
                  </div>
                  <div className="profile__gender">
                    <div className="gender">
                      <input
                        type="radio"
                        checked={form.gender == "male"}
                        value="male"
                        name="gender"
                        className="form-check-input"
                        onChange={onChangeInput}
                      />
                      <h4>Male</h4>
                    </div>
                    <div className="gender">
                      <input
                        type="radio"
                        checked={form.gender == "female"}
                        value="female"
                        name="gender"
                        className="form-check-input"
                        onChange={onChangeInput}
                      />
                      <h4>Female</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
const mapDispatchToProps = { getUserLogin };
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
