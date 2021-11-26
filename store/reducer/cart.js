const initialState = {
  cartList: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADD-CART": {
      return {
        cartList: [action.payload],
      };
    }
    default: {
      return {
        state,
      };
    }
  }
};

export default cart;
