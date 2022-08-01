import styles from "./ordersHistory.module.css";
import { Order } from "../order/order";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  wsUserConnectionStart,
  wsConnectionClosed,
} from "../../services/actions/wsActions";
import Spinner from "../spinner/spinner";
import { getCookie } from "../../utils/getCookie";

export const UserOrdersList = () => {
  const dispatch = useDispatch();
  const { userOrdersList, inConnected } = useSelector(
    (store) => store.ordersList
  );
  const { orders } = userOrdersList;
  const [token] = useState(getCookie("token"));
  useEffect(() => {
    dispatch(wsUserConnectionStart(token));
  }, []);

  return (
    <ul className={styles.wrapper}>
      {inConnected ? (
        <Spinner />
      ) : (
        orders &&
        [...orders].reverse().map((el) => {
          return (
            <li key={el._id}>
              <Order {...el} />
            </li>
          );
        })
      )}
    </ul>
  );
};
