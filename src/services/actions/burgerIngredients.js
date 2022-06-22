import {API_INGREDIENTS} from '../../utils/config';
import { checkResponce } from '../../utils/checkResponce';

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";


export function getItems() {
  return  function(dispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });
    fetch(API_INGREDIENTS)
      .then(checkResponce)
      .then((dataFromServer) => {
        dispatch({ type: GET_ITEMS_SUCCESS, items: dataFromServer.data });
      })
      .catch((err) => console.log(err));
  }
}