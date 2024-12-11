import axios from "axios";
import {
  GET_SHOES_DATA_FAILURE,
  GET_SHOES_DATA_LOADING,
  GET_SHOES_DATA_SUCCESS,
  ADD_PRODUCT_FAILURE,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  GET_SINGLE_SHOES_DATA_LOADING,
  GET_SINGLE_SHOES_DATA_SUCCESS,
  GET_SINGLE_SHOES_DATA_FAILURE
} from "./actionTypes";

export const getShoesData = (q) => (dispatch) => {
  dispatch({ type: GET_SHOES_DATA_LOADING, payload: true });

  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/shoes`, q)
    .then((res) => {
      return dispatch({
        type: GET_SHOES_DATA_SUCCESS,
        payload: res?.data
      });
    })
    .catch(() => {
      dispatch({ type: GET_SHOES_DATA_FAILURE });
    });
};

export const addProduct = (productInfo, token) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/shoes/create`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: productInfo
  })
    .then((res) => {
      return dispatch({ type: ADD_PRODUCT_SUCCESS, payload: res });
    })
    .catch(() => {
      dispatch({ type: ADD_PRODUCT_FAILURE });
    });
};

export const deleteProduct = (id, token) => (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });

  return axios({
    method: "delete",
    url: `${process.env.REACT_APP_BASE_URL}/shoes/remove/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(() => {
      return dispatch({ type: DELETE_PRODUCT_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: DELETE_PRODUCT_FAILURE });
    });
};

export const getSingleProduct = (id, token) => (dispatch) => {
  dispatch({ type: GET_SINGLE_SHOES_DATA_LOADING });

  return axios({
    method: "get",
    url: `${process.env.REACT_APP_BASE_URL}/shoes/getdetails/${id}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      return dispatch({
        type: GET_SINGLE_SHOES_DATA_SUCCESS,
        payload: res?.data
      });
    })
    .catch(() => {
      dispatch({ type: GET_SINGLE_SHOES_DATA_FAILURE });
    });
};
