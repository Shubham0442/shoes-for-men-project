import axios from "axios";
import {
  ADD_DELIVERY_ADDRESS_FAILURE,
  ADD_DELIVERY_ADDRESS_REQUEST,
  ADD_DELIVERY_ADDRESS_SUCCESS,
  GET_DELIVERY_ADDRESS
} from "./actionTypes";

export const addDeliveryAddress = (deliveryAddress, token) => (dispatch) => {
  dispatch({ type: ADD_DELIVERY_ADDRESS_REQUEST });

  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/address/create`,
    method: "post",
    data: deliveryAddress,
    headers: {
      "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      return dispatch({
        type: ADD_DELIVERY_ADDRESS_SUCCESS,
        payload: res.data
      });
    })
    .catch((error) => {
      dispatch({ type: ADD_DELIVERY_ADDRESS_FAILURE });
    });
};

export const getDeliveryAddress = (token) => (dispatch) => {
  return axios({
    url: `${process.env.REACT_APP_BASE_URL}/address`,
    method: "get",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://shoesformens.vercel.app/"
    }
  })
    .then((res) => {
      return dispatch({
        type: GET_DELIVERY_ADDRESS,
        payload: res.data.address
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
