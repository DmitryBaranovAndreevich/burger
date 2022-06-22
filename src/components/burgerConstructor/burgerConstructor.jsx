import burgerConstructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';


function IngredientsCard(props) {
  return (
    <li className={burgerConstructorStyles.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.ingredient.name}
        thumbnail={props.ingredient.image}
        price={props.ingredient.price}
      />
    </li>
  );
}

IngredientsCard.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

function FinalPrice() {
  const data = useSelector(store => store.burgerConstructorList.constructorItems);
  return (
    <p
      className={`${burgerConstructorStyles.price} text text_type_digits-medium`}
    >
      {data.reduce((priv, { type, price }) => type === "bun" ? priv + price * 2 : priv + price, 0)}
      <CurrencyIcon type="primary" />
    </p>
  );
}

function BurgerConstructor(props) {
  const data = useSelector(store => store.burgerConstructorList.constructorItems);  

  const ingredientTypeBun = data.find(
    (ingredient) => ingredient.type === "bun"
  );

  return (
    <div className={`${burgerConstructorStyles.container} pl-4 pt-25`}>
      <div className={burgerConstructorStyles.wrapper}>
        <ConstructorElement
          type={"top"}
          isLocked={true}
          text={`${ingredientTypeBun.name} (верх)`}
          thumbnail={ingredientTypeBun.image}
          price={ingredientTypeBun.price}
        />
        <ul className={burgerConstructorStyles.ingredientsList}>
          {data.map(
            (ingredient) =>
              ingredient.type !== "bun" && (
                <IngredientsCard ingredient={ingredient} key={ingredient._id} />
              )
          )}
        </ul>
        <ConstructorElement
          type={"bottom"}
          isLocked={true}
          text={`${ingredientTypeBun.name} (низ)`}
          thumbnail={ingredientTypeBun.image}
          price={ingredientTypeBun.price}
        />
      </div>
      <div className={`${burgerConstructorStyles.priceWrapper} mr-4 mt-10`}>
        <FinalPrice />
        <Button type="primary" size="medium" onClick={props.openPopup}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}


BurgerConstructor.propTypes = {
  openPopup: PropTypes.func.isRequired,
};

export default BurgerConstructor;
