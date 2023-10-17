import axios from "axios";
import {
  ADD_ORDER_DETAILS_FAILURE,
  ADD_ORDER_DETAILS_REQUEST,
  ADD_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_USER_ALL_ORDERS,
  UPDATE_ORDER_STATUS_BY_ADMIN
} from "./actionTypes";

export const addOrderDetails = (orderDetails, token) => (dispatch) => {
  dispatch({ type: ADD_ORDER_DETAILS_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/orders/create`,
    method: "post",
    data: orderDetails,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return dispatch({ type: ADD_ORDER_DETAILS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: ADD_ORDER_DETAILS_FAILURE });
    });
};

export const getAllOrderDetails = (token) => (dispatch) => {
  dispatch({ type: GET_ORDER_DETAILS_REQUEST });

  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/orders`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      console.log(res.data);
      return dispatch({
        type: GET_ORDER_DETAILS_SUCCESS,
        payload: res.data.orders
      });
    })
    .catch((error) => {
      dispatch({ type: GET_ORDER_DETAILS_FAILURE });
    });
};

export const getAllOrder = (id, token) => (dispatch) => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/orders/details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      return dispatch({
        type: GET_USER_ALL_ORDERS,
        payload: res.data.orders
      });
    })
    .catch((error) => {
      return "GET_USER_ALL_ORDERS_FAILURES";
    });
};

export const updateOrderStatusByAdmin =
  (id, newStatus, token) => (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_BASE_URL}/orders/update/${id}`,
      data: { orderStatus: newStatus },
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        return dispatch({
          type: UPDATE_ORDER_STATUS_BY_ADMIN,
          payload: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
