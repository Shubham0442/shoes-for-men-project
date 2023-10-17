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
import { ADMIN_LOGOUT } from "../AdminAuthReducer/actionTypes";
import { saveData } from "../../Utilities/LocalStorageAdmin";

export const userRegister = (userData) => (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/signup`,
    method: "post",
    data: userData,
    headers: {
      "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/"
    }
  })
    .then((res) => {
      saveData("regUserCart", { userId: res.data._id, cart: [] });
      return dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: USER_REGISTER_FAILURE });
    });
};

export const userLogin = (crid) => (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/login`,
    method: "post",
    data: crid,
    headers: {
      "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/"
    }
  })
    .then((res) => {
      const payload = { user: res?.data?.user, token: res?.data?.token };
      return dispatch({ type: USER_LOGIN_SUCCESS, payload });
    })
    .catch((error) => {
      return dispatch({ type: USER_LOGIN_FAILURE });
    });
};

export const userLogout = () => (dispatch) => {
  dispatch({ type: ADMIN_LOGOUT });
  return dispatch({ type: USER_LOGOUT });
};
