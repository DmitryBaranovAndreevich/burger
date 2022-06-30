import {
  GET_INGREDIENT_DETALS,
  DELETE_INGREDIENT_DETALS,
} from "../actions/ingredientsDetals";

const dataForModal = {
  ingredient: {},
  isOpenIngredienDetals: false,
};

export const ingredienDetalsReducer = (state = dataForModal, action) => {
  switch (action.type) {
    case GET_INGREDIENT_DETALS: {
      return {
        ...state,
        ingredient: action.data,
        isOpenIngredienDetals: true,
      };
    }
    case DELETE_INGREDIENT_DETALS: {
      return {
        ...state,
        ingredient: {},
        isOpenIngredienDetals: false,
      };
    }
    default:
      return state;
  }
};
