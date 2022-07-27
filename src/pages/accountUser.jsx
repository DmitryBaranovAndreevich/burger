import { MainLinks } from "../components/mainLinks/mainLinks";
import { Profile } from "../components/profile/profile";
import { OrdersList } from "../components/ordersHistory/ordersHistory";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import styles from "./accountUser.module.css";

export const AccountUser = () => {
  const { path } = useRouteMatch();

  return (
    <div className={styles.wrapper}>
      <MainLinks />
      <Switch>
        <Route path={`${path}`} exact={true}>
          <Profile />
        </Route>
        <Route path={`${path}/orders`}>
          <OrdersList />
        </Route>
      </Switch>
    </div>
  );
};
