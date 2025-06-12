import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from "./actionTypes";

const initState = {
  userData: {},
  isLoading: false,
  isError: false
};

export const userRegisterReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userData: payload
      };
    }
    case USER_REGISTER_FAILURE: {
      return {
        ...state,
        userData: {},
        isLoading: false,
        isError: false
      };
    }
    default:
      return state;
  }
};
