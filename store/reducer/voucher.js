const initialState = {
	vouchers: [],
	loading: false,
	error: false,
	message: "",
	isUpdate: false,
};

export default function voucher(state = initialState, action) {
	switch (action.type) {
		case "GETALLPROMO_PENDING": {
			return {
				...state,
				loading: false,
				error: false,
				message: "",
			};
		}
		case "GETALLPROMO_FULFILLED": {
			return {
				...state,
				loading: false,
				error: false,
				vouchers: action.payload.data.data,
				message: action.payload.data.message,
			};
		}
		case "GETALLPROMO_REJECTED": {
			return {
				...state,
				loading: false,
				error: false,
				message: action.payload.response.data.message,
			};
		}
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
		case "SETDATAPROMO": {
			return {
				...state,
				data: action.data,
				isUpdate: true,
			};
		}
		case "UPDATEPROMO_PENDING": {
			return {
				...state,
				loading: false,
				error: false,
				message: "",
			};
		}
		case "UPDATEPROMO_FULFILLED": {
			return {
				...state,
				loading: false,
				error: false,
				message: action.payload.data.message,
			};
		}
		case "UPDATEPROMO_REJECTED": {
			return {
				...state,
				loading: true,
				error: true,
				message: action.payload.response.data.message,
			};
		}
		case "DELETEPROMO_PENDING": {
			return {
				...state,
				loading: false,
				error: false,
				message: "",
			};
		}
		case "DELETEPROMO_FULFILLED": {
			return {
				...state,
				loading: false,
				error: false,
				message: action.payload.data.message,
			};
		}
		case "DELETEPROMO_REJECTED": {
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
