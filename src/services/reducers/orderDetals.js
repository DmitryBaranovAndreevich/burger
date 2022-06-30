import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_FAILED,
} from "../actions/orderDetals";

const initialData = {
  orderNumber: null,
  isOpenOrderDetals: false,
  getOrderNumberFailed: false,
  getOrderNumberRequest: false,
};

export const orderDetalsReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        getOrderNumberRequest: true,
      };
    }
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: action.data,
        getOrderNumberRequest: false,
        isOpenOrderDetals: true,
      };
    }

    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumber: null,
        isOpenOrderDetals: false,
        getOrderNumberFailed: false,
        getOrderNumberRequest: false,
      };
    }
    default:
      return state;
  }
};
