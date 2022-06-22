import { GET_ORDER_NUMBER, DELETE_ORDER_NUMBER } from "../actions/orderDetals";

const initialData = {
  orderNumber : null,
  getOrderNumberFailed : false
}

export const orderDetalsReducer = (state = initialData, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: action.data,
        isOpenOrderDetals: true,
      };
    }

    case DELETE_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: null,
        isOpenOrderDetals: false,
      };
    }
    default:
      return state;
  }
}