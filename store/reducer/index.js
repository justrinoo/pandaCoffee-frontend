import { combineReducers } from "redux";
import voucher from "./voucher";
import auth from "./auth";
import product from "./product";
import cart from "./cart";
import time from "./time";

export default combineReducers({
  auth,
  product,
  cart,
  time,
  voucher,
});
