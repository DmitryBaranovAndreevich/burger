import burgerConstructorStyles from "./burgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "../../hooks/types";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import {
  deleteIngredientBurgerConstructor,
  sortIngredintsBurgerConstructor,
} from "../../services/actions/burgerConstructor";
import { getOrderNumber } from "../../services/actions/orderDetals";
import { useRef, FunctionComponent } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { IIngredient, IIngredientConstructor } from "../../utils/data";

interface IngredientsCardProps {
  readonly ingredient: IIngredientConstructor;
  readonly index: number;
  readonly id: string;
}

type MyType = {
  index: number;
  readonly id: string;
};

const IngredientsCard: FunctionComponent<IngredientsCardProps> = ({
  ingredient,
  index,
  id,
}) => {
  const dispatch = useDispatch();
  const { constructorItems } = useSelector(
    (store) => store.burgerConstructorList
  );
  const deleteIngredient = () => {
    dispatch(deleteIngredientBurgerConstructor(ingredient));
  };

  const ref = useRef<HTMLLIElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = (item as MyType).index;

      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y;

      if (dragIndex < hoverIndex && hoverClientY < hoverBoundingRect.top) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverBoundingRect.bottom) {
        return;
      }

      const myItems = [...constructorItems];
      myItems.splice(dragIndex, 1, constructorItems[hoverIndex]);
      myItems.splice(hoverIndex, 1, constructorItems[dragIndex]);

      dispatch(sortIngredintsBurgerConstructor(myItems));

      (item as MyType).index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li
      className={burgerConstructorStyles.ingredient}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={deleteIngredient}
      />
    </li>
  );
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
        (priv: number, { type, price }: IIngredient) =>
          type === "bun" ? priv + price * 2 : priv + price,
        0
      )}
      <CurrencyIcon type="primary" />
    </p>
  );
}

function BurgerConstructor(props: { handleDrop: (args: IIngredient) => void }) {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation();
  const data = useSelector(
    (store) => store.burgerConstructorList.constructorItems
  );
  const { isLoadingOn } = useSelector((store) => store.user);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
      props.handleDrop(item as IIngredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const borderColor = isHover ? "lightgreen" : "transparent";

  const ingredientTypeBun = data.find(
    (ingredient: IIngredientConstructor) => ingredient.type === "bun"
  );

  const setOrder = () => {
    if (isLoadingOn) {
      dispatch(getOrderNumber(data));
      history.push({
        pathname: "/order",
        state: { modal: location, position: "modalSwitch" },
      });
    } else {
      history.push({ pathname: "/login" });
    }
  };

  return (
    <div
      className={`${burgerConstructorStyles.container} pl-4 pt-25`}
      ref={dropTarget}
      style={{ borderColor }}
    >
      {data.length !== 0 && (
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
            {data.map((ingredient: IIngredientConstructor, index: number) => {
              return (
                ingredient.type !== "bun" && (
                  <IngredientsCard
                    ingredient={ingredient}
                    key={ingredient.key}
                    index={index}
                    id={ingredient._id}
                  />
                )
              );
            })}
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
        <Button
          type="primary"
          size="medium"
          disabled={!ingredientTypeBun}
          onClick={setOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}

export default BurgerConstructor;
