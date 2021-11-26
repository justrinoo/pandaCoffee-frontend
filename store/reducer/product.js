const initialState = {
  detailsProduct: {},
  setDataToCart: {
    productName: "",
    sizeItems: 0,
  },
  total: {
    totalPriceItem: 0,
    totalOrderItem: "",
  },
  isError: false,
  isLoading: false,
  msg: "",
  selectedSize: 0,
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case "GET-DETAILS-PRODUCT_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "GET-DETAILS-PRODUCT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataProduct: action.payload.data.data,
      };
    }
    case "GET-DETAILS-PRODUCT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        dataProduct: {},
      };
    }
    case "SET-SIZE": {
      // const data = setDataToCart;
      return {
        ...state,
        selectedSize: action.payload.sizeItems,
        setDataToCart: {
          // ...data,
          sizeItems: action.payload.sizeItems,
          productId: action.payload.id,
          productName: action.payload.productName,
        },
      };
    }
    case "SET-TOTAL": {
      return {
        total: {
          totalPriceItem: action.payload.totalOrder,
          totalOrderItem: action.payload.totalPay,
        },
      };
    }
    default: {
      return state;
    }
  }
};
export default product;
