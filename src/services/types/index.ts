import { ThunkAction } from "redux-thunk";
import { ActionCreator } from "redux";
import { store } from "../..";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import { TBurgerIngredientsActions } from "../actions/burgerIngredients";
import { TLoginActions } from "../actions/login";
import { TOrderDetailsAction } from "../actions/orderDetals";
import { TWsActions } from "../actions/wsActions";

export type TApplicationActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TLoginActions
  | TOrderDetailsAction
  | TWsActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = any> = ActionCreator<
  ThunkAction<TReturn, RootState, undefined, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
