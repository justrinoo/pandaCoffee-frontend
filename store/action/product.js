import axios from "utils/axios";

export const getDetailsProduct = (data) => {
  return {
    type: "GET-DETAILS-PRODUCT",
    payload: axios.post(`/product/login/${data}`),
  };
};

export const setSelectedSize = (data) => {
  return {
    type: "SET-SIZE",
    payload: data,
  };
};

export const setDataOrder = (data) => {
  return {
    type: "SET-DATA-ORDER",
    payload: data,
  };
};
export const setTotal = (data) => {
  return {
    type: "SET-TOTAL",
    payload: data,
  };
};
export const createNewProduct = (data) => {
  console.log(data, "koasdkoaskdoasj");
  return {
    type: "CREATEPRODUCT",
    payload: axios.post("product", data),
  };
};
export const deleteNewProduct = (id) => {
  return {
    type: "DELETEPRODUCT",
    payload: axios.delete(`product/${id}`),
  };
};
export const updateNewProduct = (data, id) => {
  return {
    type: "UPDATEPRODUCT",
    payload: axios.patch(`product/${id}`, data),
  };
};
export const setDataProduct = (data) => {
  return {
    type: "SETDATAPRODUCT",
    data: data,
    pathRedirect: "/admin/promo/update-product",
  };
};
// export const set
