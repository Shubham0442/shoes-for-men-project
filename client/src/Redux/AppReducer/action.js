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
  DELETE_PRODUCT_SUCCESS
} from "./actionTypes";

export const getShoesData = (q) => (dispatch) => {
  dispatch({ type: GET_SHOES_DATA_LOADING });

  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/shoes`, q)
    .then((res) => {
      return dispatch({
        type: GET_SHOES_DATA_SUCCESS,
        payload: res?.data?.shoesData
      });
    })
    .catch(() => {
      dispatch({ type: GET_SHOES_DATA_FAILURE });
    });
};

export const addProduct = (productInfo, token) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST });
console.log(productInfo);
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/shoes/create`,
    method: "post",
    headers: {
      "Authorization": `Bearer ${token}`
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
      "Authorization": `Bearer ${token}`,
    }
  })
    .then(() => {
      return dispatch({ type: DELETE_PRODUCT_SUCCESS });
    })
    .catch(() => {
      dispatch({ type: DELETE_PRODUCT_FAILURE });
    });
};
