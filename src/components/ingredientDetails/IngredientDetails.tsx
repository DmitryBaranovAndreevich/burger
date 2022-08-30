import ingredientDetailsStyles from "./ingredientDetails.module.css";
import { useSelector } from "../../hooks/types";
import { useParams } from "react-router-dom";
import { IIngredient } from "../../utils/data";

export const IngredientDetails = () => {
  const { id }: { id: string } = useParams();
  const items = useSelector((store) => store.ingredientsList.items);
  const itemProduct =
    !!items && items.find((item: IIngredient) => item._id === id);

  return (
    <>
      {!!items && (
        <div className={ingredientDetailsStyles.wrapper}>
          <p
            className={`${ingredientDetailsStyles.title} text text_type_main-large`}
          >
            Детали ингредиента
          </p>
          <img
            className={ingredientDetailsStyles.image}
            src={(itemProduct as IIngredient).image}
            alt=""
          />
          <p className="text text_type_main-medium mt-7">
            {(itemProduct as IIngredient).name}
          </p>
          <div className={ingredientDetailsStyles.container}>
            <div className={ingredientDetailsStyles.component}>
              <p className="text text_type_main-default text_color_inactive">
                Каллории,ккал
              </p>
              <p
                className={`${ingredientDetailsStyles.value} text text_type_digits-default  text_color_inactive`}
              >
                {(itemProduct as IIngredient).calories}
              </p>
            </div>
            <div className={ingredientDetailsStyles.component}>
              <p className="text text_type_main-default text_color_inactive">
                Белки, г
              </p>
              <p
                className={`${ingredientDetailsStyles.value} text text_type_digits-default  text_color_inactive`}
              >
                {(itemProduct as IIngredient).proteins}
              </p>
            </div>
            <div className={ingredientDetailsStyles.component}>
              <p className="text text_type_main-default text_color_inactive">
                Жиры, г
              </p>
              <p
                className={`${ingredientDetailsStyles.value} text text_type_digits-default  text_color_inactive`}
              >
                {(itemProduct as IIngredient).fat}
              </p>
            </div>
            <div className={ingredientDetailsStyles.component}>
              <p className="text text_type_main-default text_color_inactive">
                Углеводы, г
              </p>
              <p
                className={`${ingredientDetailsStyles.value} text text_type_digits-default  text_color_inactive`}
              >
                {(itemProduct as IIngredient).carbohydrates}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
