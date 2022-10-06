import { API_ORDERS } from "../../utils/config";
import { checkResponce } from "../../utils/checkResponce";
import { fetchWithToken } from "../../utils/fetchWitchToken";
import { getCookie } from "../../utils/getCookie";
import { IIngredientConstructor } from "../../utils/data";
import { AppThunk } from "../types";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const DELETE_ORDER_NUMBER = "DELETE_ORDER_NUMBER";

export interface IGetOrderNumberFailed {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IGetOrderNumberRequest {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}

export interface IGetOrderNumber {
  readonly type: typeof GET_ORDER_NUMBER;
  readonly data: number;
}

export interface IDeleteOrderNumber {
  readonly type: typeof DELETE_ORDER_NUMBER;
}

export type TOrderDetailsAction =
  | IGetOrderNumberFailed
  | IGetOrderNumberRequest
  | IGetOrderNumber
  | IDeleteOrderNumber;

export const getOrderNumber: AppThunk =
  (data: Array<IIngredientConstructor>) => (dispatch) => {
    dispatch({ type: GET_ORDER_NUMBER_REQUEST });
    fetchWithToken(API_ORDERS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({ ingredients: data.map((elem) => elem._id) }),
    })
      .then(checkResponce)
      .then((dataFromServer) => {
        dispatch({ type: GET_ORDER_NUMBER, data: dataFromServer.order.number });
      })
      .catch((err) => {
        dispatch({ type: GET_ORDER_NUMBER_FAILED });
        console.log(err);
      });
  };

export function getOrderNumberFailed(): TOrderDetailsAction {
  return {
    type: GET_ORDER_NUMBER_FAILED,
  };
}
