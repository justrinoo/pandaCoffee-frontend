import axios from "utils/axios";

export const getAllPromo = () => {
	return {
		type: "GETALLPROMO",
		payload: axios.get("promo"),
	};
};

export const createNewPromo = (data) => {
	return {
		type: "CREATEPROMO",
		payload: axios.post("promo/new-promo", data),
	};
};

export const updateNewPromo = (data, id) => {
	return {
		type: "UPDATEPROMO",
		payload: axios.patch(`promo/update-promo/${id}`, data),
	};
};

export const deleteNewPromo = (id) => {
	return {
		type: "DELETEPROMO",
		payload: axios.delete(`promo/delete-promo/${id}`),
	};
};

export const setDataPromo = (data) => {
	return {
		type: "SETDATAPROMO",
		data: data,
		pathRedirect: "/admin/promo/update-promo",
	};
};
