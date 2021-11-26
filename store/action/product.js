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
// export const set
