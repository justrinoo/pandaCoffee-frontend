import { combineReducers } from "redux";
import voucher from "./voucher";
import auth from "./auth";

// ini reducernya masih kosong / persistnya masih error, kalo mau dibuat dulu biar si persist nya jalan juga.

export default combineReducers({
	voucher,
	auth,
});
