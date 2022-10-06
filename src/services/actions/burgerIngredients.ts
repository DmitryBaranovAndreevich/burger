import { API_INGREDIENTS } from "../../utils/config";
import { checkResponce } from "../../utils/checkResponce";
import { IIngredient } from "../../utils/data";
import { AppThunk } from "../types";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

export interface IGetItemRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<IIngredient>;
}

export interface IGetItemFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TBurgerIngredientsActions =
  | IGetItemRequest
  | IGetItemSuccess
  | IGetItemFailed;

export const getItems: AppThunk = () => {
  return function (dispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });
    fetch(API_INGREDIENTS)
      .then(checkResponce)
      .then((dataFromServer) => {
        dispatch({ type: GET_ITEMS_SUCCESS, items: dataFromServer.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ITEMS_FAILED });
        console.log(err);
      });
  };
};
