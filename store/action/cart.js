export const addItemToCart = (data) => {
  return {
    type: "ADD-CART",
    payload: data,
  };
};
