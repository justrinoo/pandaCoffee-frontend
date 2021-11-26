import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";
import cart from "./cart";
import voucher from "./voucher";

// ini reducernya masih kosong / persistnya masih error, kalo mau dibuat dulu biar si persist nya jalan juga.

export default combineReducers({
	auth,
	product,
	cart,
	voucher,
});
