import { baseUrl } from "../../utils/config";
import { checkResponce } from "../../utils/checkResponce";
import { DELETE_ORDER } from "./burgerConstructor";

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const DELETE_ORDER_NUMBER = "DELETE_ORDER_NUMBER";

export function getOrderNumber(data) {
  return function (dispatch) {
    dispatch({ type: GET_ORDER_NUMBER_REQUEST });
    fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
}

export function getOrderNumberFailed() {
  return {
    type: GET_ORDER_NUMBER_FAILED,
  };
}
