import styles from "./main.module.css";
import BurgerIngredients from "../components/burgerIngredients/burgerIngredients";
import BurgerConstructor from "../components/burgerConstructor/burgerConstructor";
import {
  addItemBurgerConstructor,
  changeIngredient,
} from "../services/actions/burgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "../hooks/types";
import { IIngredient } from "../utils/data";

export const MainPage = () => {
  const dispatch = useDispatch();

  const { constructorItems } = useSelector(
    (store) => store.burgerConstructorList
  );

  const { itemsFailed } = useSelector((store) => store.ingredientsList);

  const handleDrop = (item: IIngredient) => {
    const isBun = constructorItems.some(
      (element: IIngredient) => element.type === "bun"
    );
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
