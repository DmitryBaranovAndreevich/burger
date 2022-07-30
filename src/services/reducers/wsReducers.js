import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERSLIST,
  WS_GET_USER_ORDERLIST,
} from "../actions/wsActions";

const initialState = {
  wsConnected: false,
  ordersList: {},
  userOrdersList: {}
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {


    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ORDERSLIST:
      return {
        ...state,
        ordersList: action.payload,
      };

    case WS_GET_USER_ORDERLIST: 
    return {
      ...state,
      userOrdersList: action.payload,
    };  

    default:
      return state;
  }
};