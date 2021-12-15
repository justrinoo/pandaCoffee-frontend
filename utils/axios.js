import axios from "axios";
import Cookies from "js-cookie";

console.log(
	"your base url =>",
	process.env.APP_HOST === "PROD"
		? process.env.BASE_URL_PROD
		: process.env.BASE_URL_DEV
);

const axiosInstance = axios.create({
	baseURL: `${
		process.env.APP_HOST === "PROD"
			? process.env.BASE_URL_PROD
			: process.env.BASE_URL_DEV
	}`,
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
		console.log("error axios =>", error.response);
		console.log("ABIS WAKTU", error.response.data.message);
		if (error.response.status === 403) {
			if (error.response.data.message === "jwt expired") {
				const refreshToken = localStorage.getItem("refreshToken");
				axiosInstance
					.post("auth/refresh-token", { refreshToken })
					.then((res) => {
						// console.log(res.data.data.token);
						console.log("BERHASIL REFRESH TOKEN", res.data.data.token);
						alert("BERHASIL NGUBAH TOKEN");
						Cookies.set("id", res.data.data.id);
						Cookies.set("token", res.data.data.token);
						localStorage.setItem("token", res.data.data.token);
						Cookies.set("refreshToken", res.data.data.refreshToken);
						localStorage.setItem("refreshToken", res.data.data.refreshToken);
						// window.location.reload();
						// localStorage.setItem("token", res.value.data.data.token);
						// localStorage.setItem("refreshToken", res.value.data.data.refreshToken);

						// console.log(res);
						// localStorage.setItem("token", "WPWP");
						// Cookies.set("token", res.data.data.token);
						// Cookies.set("id", res.data.data.id);
						// props.getUserLogin(res.value.data.data.id);
					})
					.catch((err) => {
						console.log("ERR", err);
					});
			} else {
				// localStorage.clear();
				// window.location.href = "/auth/login";
			}
		}
		return Promise.reject(error);
	}
);
export default axiosInstance;
