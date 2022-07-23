import styles from "./appHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

function AppHeader() {
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
            <BurgerIcon type="primary" className={styles.icon} />
            Конструктор
          </NavLink>
          <NavLink
            to="/profile/orders"
            exact={true}
            className={`${styles.link} text text_type_main-default
          mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 `}
            activeClassName={styles.activeClass}
          >
            <ListIcon type="primary" />
            Лента заказов
          </NavLink>
        </nav>
        <Logo />
        <NavLink
          addclass={styles.personalAccount}
          to="/profile"
          exact={true}
          className={`${styles.link} text text_type_main-default mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 `}
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
