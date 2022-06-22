import {API_ORDERS} from '../../utils/config';
import { checkResponce } from '../../utils/checkResponce';

export const GET_ORDER_NUMBER = "GET_ORDER_NUMBER";
export const DELETE_ORDER_NUMBER = "DELETE_ORDER_NUMBER";

export function getOrderNumber(data) {
  return function (dispatch) {
    fetch(API_ORDERS, {
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
      .catch(err => console.log(err))
  };
}