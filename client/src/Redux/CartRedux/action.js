import axios from "axios";
import {
  ADD_TO_CART_FAILURE,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  GET_CART_DATA,
  MANAGE_QUANTITY,
  REMOVE_PRODUCT_FROM_CART,
  SET_EMPTY_CART
} from "./actionTyes";

export const addToCart = (cartItem, token) => (dispatch) => {
  dispatch({ type: ADD_TO_CART_REQUEST });
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_BASE_URL}/cart/add`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/"
    },
    data: cartItem
  })
    .then((res) => {
      return dispatch({ type: ADD_TO_CART_SUCCESS, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: ADD_TO_CART_FAILURE });
    });
};

export const getCart = (token) => (dispatch) => {
  if (token)
    return axios
      .get(`${process.env.REACT_APP_BASE_URL}/cart/get`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/"
        }
      })
      .then((res) => {
        return dispatch({ type: GET_CART_DATA, payload: res.data.cart });
      })
      .catch((error) => {
        console.error(error);
      });
  else dispatch({ type: GET_CART_DATA, payload: [] });
};

export const removeFromCart = (id, token) => (dispatch) => {
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/cart/remove/${id}`,
    method: "delete",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/"
    }
  })
    .then((res) => {
      return dispatch({ type: REMOVE_PRODUCT_FROM_CART });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const manageQuantity = (id, payload, token) => (dispatch) => {
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/cart/update/${id}`,
    method: "patch",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/"
    },
    data: { Qty: payload }
  })
    .then((res) => {
      return dispatch({ type: MANAGE_QUANTITY });
    })
    .catch((error) => {
      console.error(error);
    });
};

export const emptyCart = (token) => (dispatch) => {
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/cart/empty`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return dispatch({ type: SET_EMPTY_CART });
    })
    .catch((error) => {
      console.error(error);
    });
};
