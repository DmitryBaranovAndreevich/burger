import appHeaderStyles from "./appHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// function Link(props) {
//   return (
//     <a
//       href={props.href}
//       className={`${appHeaderStyles.link} text text_type_main-default
//           text_color_inactive mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 ${props.addClass}`}
//     >
//       {props.children}
//     </a>
//   );
// }

// Link.propTypes = {
//   href: PropTypes.string.isRequired,
//   addClass: PropTypes.string,
// };

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <div className={appHeaderStyles.wrapper}>
        <nav className={appHeaderStyles.navigation}>
          <NavLink
            to="/"
            className={`${appHeaderStyles.link} text text_type_main-default
        text_color_inactive mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 `}
          >
            <BurgerIcon type="primary" className={appHeaderStyles.icon} />
            Конструктор
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={`${appHeaderStyles.link} text text_type_main-default
          text_color_inactive mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 `}
          >
            <ListIcon type="primary" />
            Лента заказов
          </NavLink>
        </nav>
        <Logo />
        <NavLink
          addclass={appHeaderStyles.personalAccount}
          to="/profile"
          className={`${appHeaderStyles.link} text text_type_main-default
           text_color_inactive mb-3 mt-4 pb-4 pt-4 pl-5 pr-5 `}
        >
          <ProfileIcon type="primary" />
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
