import styles from "./main.module.css";
import BurgerIngredients from "../components/burgerIngredients/burgerIngredients";
import BurgerConstructor from "../components/burgerConstructor/burgerConstructor";
import {
  addItemBurgerConstructor,
  changeIngredient,
} from "../services/actions/burgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";

export const MainPage = () => {
  const dispatch = useDispatch();

  const { constructorItems } = useSelector(
    (store) => store.burgerConstructorList
  );

  const { itemsFailed } = useSelector((store) => store.ingredientsList);

  const handleDrop = (item) => {
    const isBun = constructorItems.some((element) => element.type === "bun");
    if (item.type === "bun" && !isBun) dispatch(addItemBurgerConstructor(item));
    else if (item.type === "bun" && isBun) dispatch(changeIngredient(item));
    else dispatch(addItemBurgerConstructor(item));
  };

  return (
    <div className={styles.main}>
      <DndProvider backend={HTML5Backend}>
        {!itemsFailed && <BurgerIngredients />}
        <BurgerConstructor handleDrop={handleDrop} />
      </DndProvider>
    </div>
  );
};
