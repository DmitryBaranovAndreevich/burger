import styles from "./appHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { useHistory, useRouteMatch } from "react-router-dom";

function AppHeader() {
  const history = useHistory();
  const { path } = useRouteMatch();
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
          <NavLink
            to="/"
            exact={true}
            className={`${styles.link} text text_type_main-default
         mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 `}
            activeClassName={styles.activeClass}
          >
            <BurgerIcon type="primary" />
            Конструктор
          </NavLink>
          <NavLink
            to="/feed"
            exact={true}
            className={`${styles.link} text text_type_main-default
          mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 `}
            activeClassName={styles.activeClass}
          >
            <ListIcon type="primary" />
            Лента заказов
          </NavLink>
        </nav>
        <div onClick={() => history.replace({ pathname: `${path}` })}>
          <Logo />
        </div>
        <NavLink
          to="/profile"
          exact={true}
          className={`${styles.link} ${styles.personalAccount} text text_type_main-default mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 `}
          activeClassName={styles.activeClass}
        >
          <ProfileIcon type="primary" />
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
