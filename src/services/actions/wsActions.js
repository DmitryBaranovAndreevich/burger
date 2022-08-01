export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_USER_CONNECTION_START = "WS_USER_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERSLIST = "WS_GET_ORDERSLIST";
export const WS_GET_USER_ORDERLIST = "WS_GET_USER_ORDERLIST";

export const wsActions = {
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
};

export const wsUserConnectionStart = () => {
  return {
    type: WS_USER_CONNECTION_START,
    token: true,
  };
};

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetUserOrderList = (data) => {
  return {
    type: WS_GET_USER_ORDERLIST,
    payload: data,
  };
};

export const wsGetOrdersList = (data) => {
  return {
    type: WS_GET_ORDERSLIST,
    payload: data,
  };
};
