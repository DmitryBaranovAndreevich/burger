import { MainLinks } from "../components/mainLinks/mainLinks";
import { Profile } from "../components/profile/profile";
import { OrderContext } from "../components/orderContext/orderContext";
import { UserOrdersList } from "../components/ordersHistory/ordersHistory";
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from "react-router-dom";
import styles from "./accountUser.module.css";
import { Modal } from "../components/modal/modal";

export const AccountUser = () => {
  const { path } = useRouteMatch();
  const location = useLocation();
  const modal = location.state?.modal;
  const history = useHistory();

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div className="test">
      <Switch location={modal || location}>
        <Route path={`${path}`} exact={true}>
          <div className={styles.wrapper}>
            <MainLinks />
            <Profile />
          </div>
        </Route>
        <Route path={`${path}/orders`} exact={true}>
          <div className={styles.wrapper}>
            <MainLinks />
            <UserOrdersList />
          </div>
        </Route>
        <Route path={`${path}/orders/:id`} exact={true}>
          <OrderContext />
        </Route>
      </Switch>
      {location.state?.position === 'accountUser' && (
        <Switch>
          <Modal onClose={back}>
            <Route path={`${path}/orders/:id`} exact={true}>
              <OrderContext />
            </Route>
          </Modal>
        </Switch>
      )}
    </div>
  );
};
