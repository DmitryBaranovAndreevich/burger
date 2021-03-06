import ingredientDetailsStyles from "./ingredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const IngredientDetails = () => {
  const { id } = useParams();
  const items = useSelector((store) => store.ingredientsList.items);
  const { name, image, proteins, calories, fat, carbohydrates } =
    !!items && items.find((item) => item._id === id);

  return (
    !!items && (
      <div className={ingredientDetailsStyles.wrapper}>
        <p
          className={`${ingredientDetailsStyles.title} text text_type_main-large`}
        >
          Детали ингредиента
        </p>
        <img className={ingredientDetailsStyles.image} src={image} alt="" />
        <p className="text text_type_main-medium mt-7">{name}</p>
        <div className={ingredientDetailsStyles.container}>
          <div className={ingredientDetailsStyles.component}>
            <p className="text text_type_main-default text_color_inactive">
              Каллории,ккал
            </p>
            <p
              className={`${ingredientDetailsStyles.value} text text_type_digits-default  text_color_inactive`}
            >
              {calories}
            </p>
          </div>
          <div className={ingredientDetailsStyles.component}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <p
              className={`${ingredientDetailsStyles.value} text text_type_digits-default  text_color_inactive`}
            >
              {proteins}
            </p>
          </div>
          <div className={ingredientDetailsStyles.component}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <p
              className={`${ingredientDetailsStyles.value} text text_type_digits-default  text_color_inactive`}
            >
              {fat}
            </p>
          </div>
          <div className={ingredientDetailsStyles.component}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p
              className={`${ingredientDetailsStyles.value} text text_type_digits-default  text_color_inactive`}
            >
              {carbohydrates}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default IngredientDetails;
