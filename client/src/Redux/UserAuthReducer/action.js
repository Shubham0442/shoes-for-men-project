import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGOUT
} from "./actionTypes";

import {
  ADMIN_LOGOUT,
  ADMIN_LOGIN_SUCCESS
} from "../AdminAuthReducer/actionTypes";
import { loadData, saveData } from "../../Utilities/LocalStorageAdmin";

export const userRegister = (userData) => (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  return axios
    .post(`${process.env.REACT_APP_BASE_URL}/signup`, userData)
    .then((res) => {
      console.log(res.data);
      saveData("regUserCart", { userId: res.data._id, cart: [] });
      return dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: USER_REGISTER_FAILURE });
    });
};

export const userLogin = (crid) => (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  return axios
    .post(`${process.env.REACT_APP_BASE_URL}/login`, crid)
    .then((res) => {
      const payload = { user: res?.data?.user, token: res?.data?.token };
      console.log(payload);
      if (res?.data?.user?.cosign === "user")
        return dispatch({ type: USER_LOGIN_SUCCESS, payload });
      else if (res?.data?.user?.cosign === "Admin")
        return dispatch({ type: ADMIN_LOGIN_SUCCESS, payload });
    })
    .catch((error) => {
      dispatch({ type: USER_LOGIN_FAILURE });
    });
};

export const userLogout = () => (dispatch) => {
  dispatch({ type: ADMIN_LOGOUT });
  return dispatch({ type: USER_LOGOUT });
};
