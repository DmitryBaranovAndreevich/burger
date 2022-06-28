import { createAction } from "@reduxjs/toolkit";

export const GET_ITEMS_BURGER_CONSTRUCTOR = 'GET_ITEMS_BURGER_CONSTRUCTOR';

export const getItemsBurgerConstructor = createAction("GET_ITEMS_BURGER_CONSTRUCTOR");

export const CHANGE_INGREDIENT = "CHANGE_INGREDIENT";

export const SORT_INGREDIENTS = "SORT_INGREDIENTS";
export const SET_CURRENT_CARD = "SET_CURRENT_CARD";

export const INCREASE_COUNT = "INCREASE_COUNT";
export const DECREASE_COUNT = "DECREASE_COUNT";