import styles from "./ordersList.module.css";
import { Order } from "../components/order/order";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  wsConnectionStart,
  wsConnectionClosed,
} from "../services/actions/wsActions";
import Spinner from "../components/spinner/spinner";

export const OrdersList = () => {
  const dispatch = useDispatch();
  const { ordersList, inConnected } = useSelector((store) => store.ordersList);
  const { orders, total, totalToday } = ordersList;
  const doneOrders = orders?.filter((order) => order.status === "done");
  const createdOrders = orders?.filter((order) => order.status === "created");

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => dispatch(wsConnectionClosed());
  }, []);

  return inConnected ? (
    <Spinner />
  ) : (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Лента заказов
      </h2>
      <div className={styles.container}>
        <ul className={styles.orders}>
          {orders?.map((el) => {
            return (
              <li key={el._id}>
                <Order {...el} />
              </li>
            );
          })}
        </ul>
        <div className={styles.board}>
          <div className={styles.ordersContainer}>
            <div className={styles.ordersNumberContainer}>
              <p className="text text_type_main-medium">Готовы:</p>
              <ul className={styles.list}>
                {doneOrders?.map((order, index) => {
                  if (index < 20) {
                    return (
                      <li
                        key={order.number}
                        className={`${styles.makeOrder} text text_type_digits-default`}
                      >
                        {`0${order.number}`}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
            <div className={styles.ordersNumberContainer}>
              <p className="text text_type_main-medium">В работе:</p>
              <ul className={styles.list}>
                {createdOrders?.map((order, index) => {
                  if (index < 20) {
                    return (
                      <li
                        key={order.number}
                        className={`${styles.finishOrder} text text_type_digits-default`}
                      >{`0${order.number}`}</li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
          <div className={styles.ordersCounter}>
            <p className="text text_type_main-medium">Готовы за все время:</p>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div className={styles.ordersCounter}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
