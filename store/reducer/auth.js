const initialState = {
  idUser: "",
  isError: false,
  isLoading: false,
  msg: "",
  userLogin: {
    role: "admin",
  },
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "LOGIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        idUser: action.payload.data.data.id,
        msg: action.payload.data.msg,
      };
    }
    case "LOGIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        idUser: "",
        msg: action.payload.response.data.msg,
      };
    }
    case "GETUSER_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "GETUSER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        idUser: action.payload.data.data.id,
        msg: action.payload.data.msg,
        userLogin: action.payload.data.data,
      };
    }
    case "GETUSER_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        idUser: "",
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};
export default login;
