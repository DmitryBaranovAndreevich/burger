import { burgerIngredientsReducer } from "./burgerIngredients";
import { burgerConstructorReducer } from "./burgerConstructor";
import { ingredienDetalsReducer } from "./ingredientsDetals";
import { orderDetalsReducer } from "./orderDetals";
import { combineReducers } from "redux";
import { userLoadingReducer } from "./login";

export const rootReducer = combineReducers({
  ingredientsList: burgerIngredientsReducer,
  burgerConstructorList: burgerConstructorReducer,
  ingredienDetals: ingredienDetalsReducer,
  orderNumber: orderDetalsReducer,
  user: userLoadingReducer,
});
