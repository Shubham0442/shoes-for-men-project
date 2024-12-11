import {
  GET_SHOES_DATA_FAILURE,
  GET_SHOES_DATA_LOADING,
  GET_SHOES_DATA_SUCCESS
} from "./actionTypes";

const initState = {
  productData: [],
  totalLength: null,
  isLoading: false,
  isError: false,
  totalFilteredCount: null
};

export const appReducer = (state = initState, { type, payload }) => {
  console.log(payload);
  switch (type) {
    case GET_SHOES_DATA_LOADING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_SHOES_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        productData: payload?.shoesData,
        totalLength: payload?.totalLength,
        totalFilteredCount: payload?.totalFilteredCount
      };
    }
    case GET_SHOES_DATA_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    }
    default:
      return state;
  }
};
