
export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_USER_CONNECTION_START = "WS_USER_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERSLIST = "WS_GET_ORDERSLIST";
export const WS_GET_USER_ORDERLIST = "WS_GET_USER_ORDERLIST";

export interface IWsActions {
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onError: typeof WS_CONNECTION_ERROR;
}

type TOrder = {
 readonly ingredients: Array<string>;
 readonly _id: string;
 readonly status: string;
 readonly number: number;
 readonly createdAt: string;
 readonly updatedAt: string;
};

export type TWsResponce = {
 readonly orders: Array<TOrder> | [];
 readonly total: number;
 readonly totalToday: number;
};

export interface IWsUserConnectionStart {
  readonly type: typeof WS_USER_CONNECTION_START;
  readonly token?: boolean;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly token?: boolean;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsGetUserOrderList {
  readonly type: typeof WS_GET_USER_ORDERLIST;
  readonly payload: TWsResponce;
}

export interface IWsGetOrdersList {
  readonly type: typeof WS_GET_ORDERSLIST;
  readonly payload: TWsResponce;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsUserConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsGetUserOrderList
  | IWsGetOrdersList
  | IWsConnectionError;

export const wsActions: IWsActions = {
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
};

export const wsUserConnectionStart = (): IWsUserConnectionStart => {
  return {
    type: WS_USER_CONNECTION_START,
    token: true,
  };
};

export const wsConnectionStart = (): IWsConnectionStart => {
  return {
    type: WS_CONNECTION_START,
    token: false,
  };
};

export const wsConnectionSuccess = (): TWsActions => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): TWsActions => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): TWsActions => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetUserOrderList = (data: TWsResponce): TWsActions => {
  return {
    type: WS_GET_USER_ORDERLIST,
    payload: data,
  };
};

export const wsGetOrdersList = (data: TWsResponce): TWsActions => {
  return {
    type: WS_GET_ORDERSLIST,
    payload: data,
  };
};
