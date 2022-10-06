import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  TBurgerIngredientsActions,
} from "../actions/burgerIngredients";
import { IIngredient } from "../../utils/data";

type TBurgerIngredientsState = {
  items: Array<IIngredient> | [];
  itemsRequest: boolean;
  itemsFailed: boolean;
};

const ingredients: TBurgerIngredientsState = {
  items: [],
  itemsFailed: true,
  itemsRequest: false,
};

export const burgerIngredientsReducer = (
  state = ingredients,
  action: TBurgerIngredientsActions
): TBurgerIngredientsState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        items: action.items,
        itemsFailed: false,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
      };
    }

    default:
      return state;
  }
};
