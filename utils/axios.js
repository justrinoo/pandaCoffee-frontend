// IMPELEMENT AXIOS...
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: `${process.env.BASE_URL_DEV}`,
});

axiosInstance.interceptors.request.use(
	(config) => {
		config.headers = {
			Authorization: `Bearer ${Cookies.get("token")}`,
		};
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
