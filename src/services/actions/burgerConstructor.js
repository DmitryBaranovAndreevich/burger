import { v4 as uuidv4 } from "uuid";

export const GET_ITEMS_BURGER_CONSTRUCTOR = "GET_ITEMS_BURGER_CONSTRUCTOR"
export const CHANGE_INGREDIENT = "CHANGE_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";
export const DELETE_COUNT = "DELETE_COUNT";
export const DELETE_ORDER = "DELETE_ORDER";

export function addItemBurgerConstructor(item) {
  return {
    type: GET_ITEMS_BURGER_CONSTRUCTOR,
    payload: { ...item, ["key"]: uuidv4() },
  };
}

export function changeIngredient(item) {
  return {
    type: CHANGE_INGREDIENT,
    data: item,
  };
}

export function sortIngredintsBurgerConstructor(ingredientsList) {
  return {
    type: SORT_INGREDIENTS,
    data: ingredientsList,
  };
}

export function deleteIngredientBurgerConstructor(item) {
  return {
    type: DELETE_COUNT,
    data: item,
  };
}

export function deleteOrder() {
  return {
    type: DELETE_ORDER,
  };
}
