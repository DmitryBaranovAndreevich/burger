import burgerConstructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  DECREASE_COUNT,
  SORT_INGREDIENTS,
  SET_CURRENT_CARD,
} from "../../services/actions/burgerConstructor";

function IngredientsCard(props) {
  const dispatch = useDispatch();
  const { constructorItems, currentCard } = useSelector(
    (store) => store.burgerConstructorList
  );
  const deleteIngredient = () => {
    dispatch({ type: DECREASE_COUNT, data: props.ingredient });
  };

  const [, dragRef] = useDrag({
    type: "ingredients",
    item: props.ingredient,
  });

  const sortCard = (a, b) => {
    if (a.order > b.order) return 1;
    else return -1;
  };

  const dragStartHandler = (card) => {
    dispatch({ type: SET_CURRENT_CARD, data: card });
  };

  const dragEndHandler = (e) => {
    e.target.style.opacity = "1";
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.target.style.opacity = "0.5";
  };

  const dropHandler = (e, card) => {
    e.preventDefault();
    const sortList = constructorItems
      .map((element) => {
        if (element._id === card._id)
          return {
            ...element,
            order: currentCard.order,
          };
        if (element._id === currentCard._id)
          return {
            ...element,
            order: card.order,
          };
        return { ...element };
      })
      .sort(sortCard);
    e.target.style.opacity = "1";
    dispatch({ type: SORT_INGREDIENTS, newList: sortList });
  };

  return (
    <li
      className={burgerConstructorStyles.ingredient}
      ref={dragRef}
      draggable={true}
      onDragStart={() => dragStartHandler(props.ingredient)}
      onDragLeave={(e) => dragEndHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, props.ingredient)}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={props.ingredient.name}
        thumbnail={props.ingredient.image}
        price={props.ingredient.price}
        handleClose={deleteIngredient}
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
  const data = useSelector(
    (store) => store.burgerConstructorList.constructorItems
  );
  return (
    <p
      className={`${burgerConstructorStyles.price} text text_type_digits-medium`}
    >
      {data.reduce(
        (priv, { type, price }) =>
          type === "bun" ? priv + price * 2 : priv + price,
        0
      )}
      <CurrencyIcon type="primary" />
    </p>
  );
}

function BurgerConstructor(props) {
  const data = useSelector(
    (store) => store.burgerConstructorList.constructorItems
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      props.handleDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "lightgreen" : "transparent";

  const ingredientTypeBun = data.find(
    (ingredient) => ingredient.type === "bun"
  );

  return (
    <div
      className={`${burgerConstructorStyles.container} pl-4 pt-25`}
      ref={dropTarget}
      style={{ borderColor }}
    >
      {data.length != 0 && (
        <div className={burgerConstructorStyles.wrapper}>
          {ingredientTypeBun && (
            <ConstructorElement
              type={"top"}
              isLocked={true}
              text={`${ingredientTypeBun.name} (верх)`}
              thumbnail={ingredientTypeBun.image}
              price={ingredientTypeBun.price}
            />
          )}
          <ul className={burgerConstructorStyles.ingredientsList}>
            {data.map(
              (ingredient) =>
                ingredient.type !== "bun" && (
                  <IngredientsCard
                    ingredient={ingredient}
                    key={ingredient._id}
                  />
                )
            )}
          </ul>
          {ingredientTypeBun && (
            <ConstructorElement
              type={"bottom"}
              isLocked={true}
              text={`${ingredientTypeBun.name} (низ)`}
              thumbnail={ingredientTypeBun.image}
              price={ingredientTypeBun.price}
            />
          )}
        </div>
      )}

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
