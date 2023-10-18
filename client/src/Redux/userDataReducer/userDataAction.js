import axios from "axios";
import {
  GET_USERS_DATA_FAILURE,
  GET_USERS_DATA_REQUEST,
  GET_USERS_DATA_SUCCESS
} from "./userDataActionTypes";

export const getUserData = (token) => (dispatch) => {
  dispatch({ type: GET_USERS_DATA_REQUEST });

  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/userdata`,
    method: "get",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/"
    }
  })
    .then((res) => {
      return dispatch({
        type: GET_USERS_DATA_SUCCESS,
        payload: res.data.users
      });
    })
    .catch(() => {
      dispatch({ type: GET_USERS_DATA_FAILURE });
    });
};
