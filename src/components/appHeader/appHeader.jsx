import appHeaderStyles from "./appHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function Link(props) {
  return (
    <a
      href={props.href}
      className={`${appHeaderStyles.link} text text_type_main-default
          text_color_inactive mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 ${props.addClass}`}
    >
      {props.children}
    </a>
  );
}

Link.propTypes = {
  href: PropTypes.string.isRequired,
  addClass: PropTypes.string,
};

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.wrapper}>
        <nav className={appHeaderStyles.navigation}>
          <Link href="#">
            <BurgerIcon type="primary" className={appHeaderStyles.icon} />
            Конструктор
          </Link>
          <Link href="#">
            <ListIcon type="primary" />
            Лента заказов
          </Link>
        </nav>
        <Logo />
        <Link addClass={appHeaderStyles.personalAccount} href="#">
          <ProfileIcon type="primary" />
          Личный кабинет
        </Link>
      </div>
    </header>
  );
}

export default AppHeader;