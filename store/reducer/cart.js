const initialState = {
  listCart: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case "ADDCART": {
      const ppp = state.listCart.filter(function (item, index) {
        return item.product_id != action.data.product_id;
      });
      return {
        ...state,
        listCart: [...ppp, action.data],
      };
    }
    case "DELETECART": {
      return {
        ...state,
        listCart: [],
      };
    }

    default: {
      return state;
    }
  }
};
export default cart;
