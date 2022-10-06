import styles from "./orderContext.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../hooks/types";
import { createDate } from "../../utils/createDate";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsArrayHandler } from "../../utils/ingredientsArrayHandler";
import { orderStatusHandleer } from "../../utils/orderStatusHandler";
import {
  wsConnectionStart,
  wsUserConnectionStart,
} from "../../services/actions/wsActions";
import { useEffect } from "react";
import Spinner from "../spinner/spinner";
import { TOrder } from "../order/order";

export const OrderContext = () => {
  const dispatch = useDispatch();
  const { wsConnected } = useSelector((store) => store.ordersList);
  const { id }: { id: string } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (!wsConnected) {
      location.pathname.startsWith("/feed")
        ? dispatch(wsConnectionStart())
        : dispatch(wsUserConnectionStart());
    }
  }, []);

  const { ordersList, userOrdersList } = useSelector(
    (store) => store.ordersList
  );
  const { items } = useSelector((store) => store.ingredientsList);
  const list = location.pathname.startsWith("/feed")
    ? ordersList?.orders
    : userOrdersList?.orders;

  const orderItems =
    !!list && list.find((el: { _id: string }) => el._id === id);

  const { ingredientsCount, ingredientsList, price } = ingredientsArrayHandler(
    (orderItems as TOrder)?.ingredients,
    items!
  );

  return !(orderItems as TOrder)?.ingredients ? (
    <Spinner />
  ) : (
    <div className={styles.wrapper}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default`}
      >{`#0${(orderItems as TOrder).number}`}</p>
      <h3 className={`${styles.title} text text_type_main-medium`}>
        {(orderItems as TOrder).name}
      </h3>
      {orderStatusHandleer((orderItems as TOrder).status, styles)}
      <p className={`${styles.structure} text text_type_main-medium`}>
        Состав:
      </p>
      <ul className={styles.container}>
        {ingredientsList &&
          ingredientsList.map((el) => {
            const count = el?.type === "bun" ? 2 : ingredientsCount[el!._id];
            return (
              <li key={el?._id} className={styles.element}>
                <div className={styles.box}>
                  <div className={styles.icon}>
                    <img
                      className={styles.image}
                      src={`${el?.image_mobile}`}
                      alt=""
                    />
                  </div>
                  <p
                    className={`${styles.ingredientName} text text_type_main-default`}
                  >
                    {el?.name}
                  </p>
                </div>
                <p
                  className={`${styles.ingredientName} text text_type_digits-default`}
                >
                  {`${count} x ${el?.price}`}
                  <CurrencyIcon type="primary" />
                </p>
              </li>
            );
          })}
      </ul>
      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {createDate((orderItems as TOrder).createdAt)}
        </p>
        <p className={`${styles.prise} text text_type_digits-default`}>
          {price}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};
