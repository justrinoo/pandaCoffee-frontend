import axios from "utils/axios";

export const loginUser = (form) => {
  return { type: "LOGIN", payload: axios.post("/auth/login", form) };
};
export const getUserLogin = (id) => {
  return {
    type: "GETUSER",
    payload: axios.get(`/user/${id}`),
  };
};
