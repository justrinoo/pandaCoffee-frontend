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
    if (error.response.status === 403) {
      if (error.response.data.message === "jwt expired") {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log("ABIS WAKTU", refreshToken);
        axiosInstance
          .post("auth/refresh-token", { refreshToken })
          .then((res) => {
            // alert("BERHASIL NGUBAH TOKEN");
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
            // window.location.reload();
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
        localStorage.clear();
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
