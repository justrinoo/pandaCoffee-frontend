const initialState = {
	vouchers: [],
	loading: false,
	error: false,
	message: "",
};

export default function voucher(state = initialState, action) {
	switch (action.type) {
		case "CREATEPROMO_PENDING": {
			return {
				...state,
				loading: false,
				error: false,
				message: "",
			};
		}
		case "CREATEPROMO_FULFILLED": {
			return {
				...state,
				loading: false,
				error: false,
				message: action.payload.data.message,
			};
		}
		case "CREATEPROMO_REJECTED": {
			return {
				...state,
				loading: true,
				error: true,
				message: action.payload.response.data.message,
			};
		}
		default: {
			return state;
		}
	}
}
