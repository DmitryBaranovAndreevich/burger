import {
  GET_ITEMS_BURGER_CONSTRUCTOR,
  DELETE_COUNT,
  CHANGE_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_ORDER,
  TBurgerConstructorActions,
} from "../actions/burgerConstructor";
import { IIngredientConstructor } from "../../utils/data";

type TBurgerConstructorState = {
   constructorItems: Array<IIngredientConstructor>;
   constructorItemsFailed: boolean;
};

const ingredients: TBurgerConstructorState = {
  constructorItems: [],
  constructorItemsFailed: true,
};

export const burgerConstructorReducer = (
  state = ingredients,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case GET_ITEMS_BURGER_CONSTRUCTOR:
      return {
        ...state,
        constructorItems: [
          ...state.constructorItems,
          {
            ...action.payload,
          },
        ],
        constructorItemsFailed: false,
      };

    case DELETE_COUNT:
      const deleteElement = state.constructorItems.find(
        (element) => element._id === action.data._id
      );

      const deleteIndex = state.constructorItems.indexOf(
        deleteElement as IIngredientConstructor
      );
      return {
        ...state,
        constructorItems: state.constructorItems.filter(
          (el, index) => index !== deleteIndex
        ),
      };
    case CHANGE_INGREDIENT:
      return {
        ...state,
        constructorItems: state.constructorItems.map((element) => {
          if (element.type === "bun")
            return {
              ...action.data,
              count: 2,
            };
          return element;
        }),
      };
    case SORT_INGREDIENTS:
      return {
        ...state,
        constructorItems: action.data,
      };
    case DELETE_ORDER:
      return {
        ...state,
        constructorItems: ingredients.constructorItems,
      };
    default:
      return state;
  }
};
