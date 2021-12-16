module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL_DEV: "http://localhost:3001/",
    BASE_URL_PROD: "https://coffe-shop-be.herokuapp.com/",
    APP_HOST: "DEV",
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/product",
  //       destination: "/admin/product",
  //     },
  //     {
  //       source: "/productDetails/:productId",
  //       destination: "/customer/productDetails/:productId",
  //     },
  //   ];
  // },
};
