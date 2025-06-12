import axios from "axios";
import {
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS
} from "./actionTypes";
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
    .catch((error) => {
      return dispatch({
        type: USER_REGISTER_FAILURE,
        payload: error?.response?.data
      });
    });
};
