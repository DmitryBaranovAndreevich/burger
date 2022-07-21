import { burgerIngredientsReducer } from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { orderDetalsReducer } from "./orderDetals";
import { combineReducers } from "redux";
import { userLoadingReducer } from "./login";

export const rootReducer = combineReducers({
  ingredientsList: burgerIngredientsReducer,
  burgerConstructorList: burgerConstructorReducer,
  orderNumber: orderDetalsReducer,
  user: userLoadingReducer,
});
