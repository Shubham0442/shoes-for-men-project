import { ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT } from "./actionTypes";
const initState = {
  isAuthAdmin: false,
  adminData: {}
};

export const adminAuthReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ADMIN_LOGIN_SUCCESS: {
      const adminInfo = payload;
      return {
        ...state,
        isAuthAdmin: true,
        adminData: adminInfo
      };
    }

    case ADMIN_LOGOUT: {
      return {
        ...state,
        isAuthAdmin: false,
        adminData: null
      };
    }

    default:
      return state;
  }
};
