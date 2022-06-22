import { GET_ITEMS_BURGER_CONSTRUCTOR } from "../actions/burgerConstructor";

const ingredients = {
  constructorItems: null,
  // constructorItemsRequest: false,
  constructorItemsFailed: true,
};

export const burgerConstructorReducer = (state = ingredients, action) => {
  switch (action.type) {
    case GET_ITEMS_BURGER_CONSTRUCTOR:
      return {
        ...state,
        constructorItems: action.data,
        constructorItemsFailed: false
      };

    default:
      return state;
  }
  
};
