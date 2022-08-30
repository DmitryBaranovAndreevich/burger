import styles from "./ordersHistory.module.css";
import { Order } from "../order/order";
import { useEffect } from "react";
import { useSelector, useDispatch } from "../../hooks/types";
import {
  TWsResponce,
  wsUserConnectionStart,
} from "../../services/actions/wsActions";
import Spinner from "../spinner/spinner";

export const UserOrdersList = () => {
  const dispatch = useDispatch();
  const { userOrdersList, inConnected } = useSelector(
    (store) => store.ordersList
  );
  const { orders } = userOrdersList as TWsResponce;
  useEffect(() => {
    dispatch(wsUserConnectionStart());
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
              <Order {...el} position={"accountUser"} />
            </li>
          );
        })
      )}
    </ul>
  );
};
