import {
  WS_CONNECTION_START,
  WS_USER_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERSLIST,
  WS_GET_USER_ORDERLIST,
  TWsActions,
  TWsResponce,
} from "../actions/wsActions";

type TWsState = {
  wsConnected: boolean;
  inConnected: boolean;
  ordersList: TWsResponce;
  userOrdersList: TWsResponce;
};

const initialState: TWsState = {
  wsConnected: false,
  inConnected: false,
  ordersList: { orders: [], total: 0, totalToday: 0 },
  userOrdersList: { orders: [], total: 0, totalToday: 0 },
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_USER_CONNECTION_START:
      return {
        ...state,
        inConnected: true,
      };

    case WS_CONNECTION_START:
      return {
        ...state,
        inConnected: true,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        inConnected: false,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        inConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        ordersList: { orders: [], total: 0, totalToday: 0 },
        userOrdersList: { orders: [], total: 0, totalToday: 0 },
        wsConnected: false,
        inConnected: false,
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
