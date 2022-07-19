import styles from "./main.module.css";
import BurgerIngredients from "../components/burgerIngredients/burgerIngredients";
import BurgerConstructor from "../components/burgerConstructor/burgerConstructor";
import {
  addItemBurgerConstructor,
  changeIngredient,
} from "../services/actions/burgerConstructor";
import { getOrderNumber } from "../services/actions/orderDetals";
import { getIngredientDetals } from "../services/actions/ingredientsDetals";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { useLocation} from "react-router-dom";

export const MainPage = ({ setModal }) => {
  const dispatch = useDispatch();
  

  const { constructorItems } = useSelector(
    (store) => store.burgerConstructorList
  );

  const { itemsFailed } = useSelector((store) => store.ingredientsList);

  const isOpen = () => {
    setModal(true);
  };

  const isOpenIngredient = (cart) => {
    dispatch(getIngredientDetals(cart));
    isOpen();
  };

  const isOpenOrder = () => {
    dispatch(getOrderNumber(constructorItems));
    isOpen();
  };

  const handleDrop = (item) => {
    const isBun = constructorItems.some((element) => element.type === "bun");
    if (item.type === "bun" && !isBun) dispatch(addItemBurgerConstructor(item));
    else if (item.type === "bun" && isBun) dispatch(changeIngredient(item));
    else dispatch(addItemBurgerConstructor(item));
  };

  return (
    <div className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        {!itemsFailed && <BurgerIngredients modalState={isOpenIngredient} />}
        <BurgerConstructor openPopup={isOpenOrder} handleDrop={handleDrop} />
      </DndProvider>
    </div>
  );
};
