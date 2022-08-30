import { v4 as uuidv4 } from "uuid";
import { IIngredientConstructor, IIngredient } from "../../utils/data";

export const GET_ITEMS_BURGER_CONSTRUCTOR = "GET_ITEMS_BURGER_CONSTRUCTOR";
export const CHANGE_INGREDIENT = "CHANGE_INGREDIENT";
export const SORT_INGREDIENTS = "SORT_INGREDIENTS";
export const DELETE_COUNT = "DELETE_COUNT";
export const DELETE_ORDER = "DELETE_ORDER";

export interface IAddItemBurgerConstructor {
  readonly type: typeof GET_ITEMS_BURGER_CONSTRUCTOR;
  readonly payload: IIngredientConstructor;
}
export interface IChangeIngredient {
  readonly type: typeof CHANGE_INGREDIENT;
  readonly data: IIngredient;
}
export interface ISortIngredintsBurgerConstructor {
  readonly type: typeof SORT_INGREDIENTS;
  readonly data: Array<IIngredient>;
}
export interface IDeleteIngredientBurgerConstructor {
  readonly type: typeof DELETE_COUNT;
  readonly data: IIngredient;
}
export interface IDeleteOrder {
  readonly type: typeof DELETE_ORDER;
}

export type TBurgerConstructorActions =
  | IAddItemBurgerConstructor
  | IChangeIngredient
  | ISortIngredintsBurgerConstructor
  | IDeleteIngredientBurgerConstructor
  | IDeleteOrder;

export function addItemBurgerConstructor(
  item: IIngredient
): TBurgerConstructorActions {
  return {
    type: GET_ITEMS_BURGER_CONSTRUCTOR,
    payload: { ...item, ["key"]: uuidv4() },
  };
}

export function changeIngredient(item: IIngredient): TBurgerConstructorActions {
  return {
    type: CHANGE_INGREDIENT,
    data: item,
  };
}

export function sortIngredintsBurgerConstructor(
  ingredientsList: Array<IIngredient>
): TBurgerConstructorActions {
  return {
    type: SORT_INGREDIENTS,
    data: ingredientsList,
  };
}

export function deleteIngredientBurgerConstructor(
  item: IIngredient
): TBurgerConstructorActions {
  return {
    type: DELETE_COUNT,
    data: item,
  };
}

export function deleteOrder(): TBurgerConstructorActions {
  return {
    type: DELETE_ORDER,
  };
}
