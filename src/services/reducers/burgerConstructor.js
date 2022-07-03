import {
  GET_ITEMS_BURGER_CONSTRUCTOR,
  DELETE_COUNT,
  CHANGE_INGREDIENT,
  SORT_INGREDIENTS,
  DELETE_ORDER,
} from "../actions/burgerConstructor";
import { v4 as uuidv4 } from "uuid";

const ingredients = {
  constructorItems: [],
  constructorItemsFailed: true,
};

export const burgerConstructorReducer = (state = ingredients, action) => {
  switch (action.type) {
    case GET_ITEMS_BURGER_CONSTRUCTOR:
      return {
        ...state,
        constructorItems: [
          ...state.constructorItems,
          {
            ...action.data,['key']: uuidv4()
          },
        ],
        visible: { ...state.visible, [action.data.key]: true },
        constructorItemsFailed: false,
      };

    case DELETE_COUNT:
      const deleteElement = state.constructorItems.find(
        (element) => element._id === action.data._id
      );

      const deleteIndex = state.constructorItems.indexOf(deleteElement);
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
