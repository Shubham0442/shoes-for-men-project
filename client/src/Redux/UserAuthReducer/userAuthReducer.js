import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "./actionTypes";
import { saveData, loadData } from "../../Utilities/LocalStorageAdmin";

const initState = loadData("userAuth") || {
  isAuthUser: false,
  userData: {},
  token: null,
  isLoading: false,
  isError: false
};

export const userAuthReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }

    case USER_LOGIN_SUCCESS: {
      const userInfo = payload;
      saveData("userAuth", {
        isAuthUser: true,
        userData: userInfo.user,
        token: userInfo.token
      });
      return {
        ...state,
        isLoading: false,
        isAuthUser: true,
        token: userInfo.token,
        userData: userInfo?.user
      };
    }

    case USER_LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isAuthUser: false,
        token: null,
        userData: null,
        isError: true
      };
    }

    case USER_LOGOUT: {
      saveData("userAuth", { isAuthUser: false, userData: null, token: null });
      return {
        ...state,
        isLoading: false,
        isAuthUser: false,
        token: null,
        userData: null,
        isError: false
      };
    }

    default:
      return state;
  }
};
