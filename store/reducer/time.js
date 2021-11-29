const initialState = {
  newResend: "",
};

const time = (state = initialState, action) => {
  switch (action.type) {
    case "ADDTIME": {
      return {
        ...state,
        newResend: action.data,
      };
    }

    default: {
      return state;
    }
  }
};
export default time;
