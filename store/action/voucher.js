import axios from "utils/axios";

export const createNewPromo = (data) => {
	return {
		type: "CREATEPROMO",
		payload: axios.post("promo/new-promo", data),
	};
};
