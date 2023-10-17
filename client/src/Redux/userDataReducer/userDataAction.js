import axios from "axios";
import {
  GET_USERS_DATA_FAILURE,
  GET_USERS_DATA_REQUEST,
  GET_USERS_DATA_SUCCESS,
  UPDATE_USER_ORDER_STATUE
} from "./userDataActionTypes";

export const getUserData = (token) => (dispatch) => {
  dispatch({ type: GET_USERS_DATA_REQUEST });

  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/userdata`,
    method: "get",
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => {
      return dispatch({
        type: GET_USERS_DATA_SUCCESS,
        payload: res.data.users
      });
    })
    .catch((error) => {
      dispatch({ type: GET_USERS_DATA_FAILURE });
    });
};

export const updateUserOrderStatus = (id, newStatus) => (dispatch) => {
  return axios
    .patch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
      order_status: newStatus
    })
    .then((res) => {
      return dispatch({ type: UPDATE_USER_ORDER_STATUE });
    })
    .catch((error) => {
      console.log(error);
    });
};
