import { Layout } from "components";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "utils/axios";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Checkout = (props) => {
  const userLogin = props.auth.userLogin[0];
  const router = useRouter();
  const [voucher, setVoucher] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [payment, setPayment] = useState("");
  const [voucherId, setVoucherId] = useState("");
  const [address, setAddress] = useState({
    name: userLogin.firstName + " " + userLogin.lastName,
    address: userLogin.address,
    phone: userLogin.phoneNumber,
  });
  const totalPayment = props.cart.listCart.reduce(
    (a, b) => a + (b["price"] || 0),
    0
  );
  const totalFee = (10 / 100) * totalPayment;
  const getAllVoucher = () => {
    axios
      .get(`/promo?page=1&limit=555`)
      .then((res) => {
        setVoucher(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllVoucher();
  }, []);
  const onChangeSelect = (element) => {
    // GET Voucher Data
    let index = element.target.selectedIndex;
    let optionElement = element.target.childNodes[index];
    let dataVoucher = optionElement.getAttribute("data-voucher");
    dataVoucher = JSON.parse(dataVoucher);
    if (dataVoucher) {
      if (dataVoucher.minTotalPrice <= totalPayment) {
        let discountt = (dataVoucher.discount / 100) * totalPayment;
        if (discountt > dataVoucher.maxDiscount) {
          discountt = dataVoucher.maxDiscount;
        }
        toast.success("Berhasil Menggunakan Voucher");
        setVoucherId(dataVoucher.id);
        setTotalDiscount(discountt);
      } else {
        setTotalDiscount(0);
        setVoucherId("");
        toast.warn(
          `Untuk Menggunakan Voucher ini, Minimum Orderan adalah Rp ${new Intl.NumberFormat(
            "id-ID"
          ).format(dataVoucher.minTotalPrice)}`
        );
      }
    } else {
      setTotalDiscount(0);
      setVoucherId("");
    }
  };
  const onChangeAddress = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const onChangePayment = (e) => {
    setPayment(e.target.value);
  };
  const onSubmitCheckout = () => {
    if (props.cart.listCart.length < 1) {
      toast.warn("Kamu Belum Memilih Product !");
    } else if (!payment) {
      toast.warn("Pilih Metode Pembayaran Terlebih Dahulu !");
    } else if (!address.address || !address.phone || !address.name) {
      toast.warn("Detail Penerima Tidak Boleh Kosong !");
    } else {
      const setData = {
        product: props.cart.listCart,
        voucher_id: voucherId,
        totalPayment: totalFee + totalPayment - totalDiscount,
        paymentMethod: payment,
        alamat: address.address,
        nameReceiver: address.name,
        noTelpReceiver: address.phone,
      };
      console.log(setData);
      axios
        .post(`/transaction/detail`, setData)
        .then((res) => {
          toast.success("Berhasil Checkout, Bayar Sekarang !");
          props.deleteCart("Delete");
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  return (
    <>
      <Layout
        pageTitle="History Page"
        isLogged={window.screen.width === 320 ? false : true}
      >
        <main className="checkout-main history-main-mobile">
          <ToastContainer />;
          <div class="container">
            <section className="history-content pt-5">
              <h3 className="history-content-title">
                Checkout your <br /> item now!
              </h3>
              <div className="row">
                <div className="col-md-5">
                  <div className="card card-body card-text">
                    <h3 className="text-center mt-3 mb-5">Order Summary</h3>
                    {props.cart.listCart.map((e) => (
                      <>
                        {/* <h3>{e.product_id}</h3> */}
                        <div class="d-flex justify-content-between mb-3">
                          <div class="d-flex">
                            <img
                              src={`${process.env.BASE_URL_DEV}upload/product/${e.image}`}
                              alt=""
                              className="checkout-privew"
                            />
                            <div class=" p-none__card">
                              <p>{e.name}</p>
                              <p>{`x ${e.quantity}`}</p>
                              <p>{e.size}</p>
                            </div>
                          </div>

                          <h5 className="align-self-center">
                            Rp. {new Intl.NumberFormat("id-ID").format(e.price)}
                          </h5>
                        </div>
                      </>
                    ))}

                    <div class="checkout__hr">
                      <select
                        name="voucher"
                        className="form-select p-3 select__checkout"
                        id=""
                        onChange={(e) => onChangeSelect(e)}
                      >
                        <option selected value="">
                          Select Voucher
                        </option>
                        {voucher.map((e) => (
                          <option
                            value={[e.id]}
                            data-voucher={JSON.stringify(e)}
                            className={
                              e.minTotalPrice >= totalPayment
                                ? "text-danger"
                                : ""
                            }
                          >
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="">
                      {totalDiscount ? (
                        <div class="d-flex justify-content-between mt-3">
                          <p>DISCOUNT</p>
                          <p>
                            IDR{" "}
                            {new Intl.NumberFormat("id-ID").format(
                              totalDiscount
                            )}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}

                      <div
                        class={`d-flex justify-content-between ${
                          !totalDiscount ? "mt-3" : " "
                        } `}
                      >
                        <p>SUBTOTAL</p>
                        <p>
                          IDR{" "}
                          {new Intl.NumberFormat("id-ID").format(totalPayment)}
                        </p>
                      </div>
                      <div class="d-flex justify-content-between">
                        <p>
                          TAX & FEES <small>(10%)</small>
                        </p>
                        <p>
                          IDR {new Intl.NumberFormat("id-ID").format(totalFee)}
                        </p>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <h4>Total</h4>
                      <h4>
                        IDR{" "}
                        {new Intl.NumberFormat("id-ID").format(
                          totalFee + totalPayment - totalDiscount
                        )}
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="col-md-4 mx-md-5">
                  <div class="">
                    <h4 className="history-content-title">Address details</h4>
                    <div class="card card-body mt-3">
                      <div class="form p-3">
                        <div class="form-group">
                          <label for="" className="form-control-label">
                            Delivery To
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            onChange={(e) => onChangeAddress(e)}
                            value={address.name}
                          />
                        </div>
                        <div class="form-group mt-3">
                          <label for="" className="form-control-label">
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            onChange={(e) => onChangeAddress(e)}
                            value={address.address}
                          />
                        </div>
                        <div class="form-group mt-3">
                          <label for="" className="form-control-label">
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            onChange={(e) => onChangeAddress(e)}
                            value={address.phone}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <h4 className="history-content-title mt-4">
                      Payment Method
                    </h4>
                    <div class="card card-body">
                      <div class="form p-3">
                        <div class="form-check">
                          <input
                            class="form-check-input input__checkout"
                            type="radio"
                            name="paymentMethod"
                            id="cod"
                            value="cod"
                            onChange={onChangePayment}
                          />
                          <label class="form-check-label" for="cod">
                            <img
                              src="/icons/cod.png"
                              className="checkout__icon"
                              alt=""
                            />
                            Cash On Delivery
                          </label>
                        </div>
                        <div class="form-check mt-3">
                          <input
                            class="form-check-input input__checkout"
                            type="radio"
                            name="paymentMethod"
                            id="midtrans"
                            value="midtrans"
                          />
                          <label class="form-check-label" for="midtrans">
                            <img
                              src="/icons/card.png"
                              className="checkout__icon"
                              alt=""
                            />
                            Online Transfer
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mb-5">
                    <button
                      className="btn btn-warning w-100 mt-4 p-3"
                      onClick={onSubmitCheckout}
                    >
                      <p className="btn--confirm">Confirm and Pay</p>
                    </button>
                  </div>
                </div>
              </div>
            </section>
            {/* MOBILE SCREEN */}
          </div>
        </main>
      </Layout>
    </>
  );
};
const mapStateToProps = (state) => ({
  product: state.product,
  cart: state.cart,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (data) => dispatch({ type: "ADDCART", data: data }),
  deleteCart: (data) => dispatch({ type: "DELETECART", data: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
