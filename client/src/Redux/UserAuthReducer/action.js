import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT
} from "./actionTypes";
import { ADMIN_LOGOUT } from "../AdminAuthReducer/actionTypes";

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
