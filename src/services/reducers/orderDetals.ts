import {
  GET_ORDER_NUMBER,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_FAILED,
  TOrderDetailsAction,
} from "../actions/orderDetals";

type TOrderDetalsState = {
  orderNumber: number | null;
  getOrderNumberFailed: boolean;
  getOrderNumberRequest: boolean;
};

const initialData: TOrderDetalsState = {
  orderNumber: null,
  getOrderNumberFailed: false,
  getOrderNumberRequest: false,
};

export const orderDetalsReducer = (
  state = initialData,
  action: TOrderDetailsAction
): TOrderDetalsState => {
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
      };
    }

    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumber: null,
        getOrderNumberFailed: false,
        getOrderNumberRequest: false,
      };
    }
    default:
      return state;
  }
};
