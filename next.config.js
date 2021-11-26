module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL_DEV: "http://localhost:3001/",
  },
  async rewrites() {
    return [
      {
        source: "/productList",
        destination: "/admin/product",
      },
      {
        source: "/productDetails/:productId",
        destination: "/customer/productDetails/:productId",
      },
    ];
  },
};
