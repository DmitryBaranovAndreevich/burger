import {GET_ITEMS_REQUEST,GET_ITEMS_SUCCESS,GET_ITEMS_FAILED} from '../actions/burgerIngredients';



const ingredients = {
  items: null,
  // itemsRequest: false,
  itemsFailed: true,
};

export const burgerIngredientsReducer = (state = ingredients,action) => {
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
        // itemsRequest: false,
        itemsFailed: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: false,
      };
    }

    default:
      return state;
  }
}