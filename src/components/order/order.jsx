import styles from "./order.module.css";
import { createDate } from "../../utils/createDate";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { ingredientsArrayHandler } from "../../utils/ingredientsArrayHandler";
import { orderStatusHandleer } from "../../utils/orderStatusHandler";

export const Order = ({
  createdAt,
  ingredients,
  name,
  number,
  status,
  _id,
  position
}) => {
  const { path } = useRouteMatch();
  let location = useLocation();

  const { items } = useSelector((store) => store.ingredientsList);

  const { ingredientsList, price } = ingredientsArrayHandler(
    ingredients,
    items
  );

  const elementsList = ingredientsList?.map((el, index) => {
    if (index === 0) {
      return (
        <li key={index} className={styles.icon}>
          <img className={styles.image} src={`${el.image_mobile}`} alt="" />
          {ingredientsList.length > 5 && (
            <p className={styles.counter}>{`+${ingredientsList.length - 5}`}</p>
          )}
        </li>
      );
    }
    if (index < 6) {
      return (
        <li key={index} className={styles.icon}>
          <img className={styles.image} src={`${el.image_mobile}`} alt="" />
        </li>
      );
    }
    return;
  });

  return (
    <Link
      className={styles.wrapper}
      to={{
        pathname: `${path}/${_id}`,
        state: { modal: location,position: position },
      }}
    >
      <div className={styles.container}>
        <p className={`${styles.orderId} text text_type_digits-default`}>
          {`#0${number}`}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {createDate(createdAt)}
        </p>
      </div>
      <h3 className={`${styles.title} text text_type_main-medium`}>{name}</h3>
      {orderStatusHandleer(status, styles)}
      <div className={styles.footer}>
        <ul className={styles.iconsList}>{elementsList}</ul>
        <p className={`${styles.prise} text text_type_digits-default`}>
          {price}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  );
};
