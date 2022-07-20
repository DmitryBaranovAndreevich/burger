import styles from './mainLinks.module.css';
import {NavLink, useHistory } from 'react-router-dom';
import { userLoginOut } from '../../services/actions/login';
import { useDispatch } from "react-redux";

export const MainLinks = () => {
  const dispath = useDispatch();
  const history = useHistory();
  const tokenToRefresh = localStorage.getItem("refreshToken");

  const logOut = (e) => {
    e.preventDefault();
    dispath(userLoginOut(tokenToRefresh))
    .then(() => {
      history.replace({pathname: '/login'});
    })
    .catch((err) => {
      console.log(`Не получилось выйти из аккаунта ${err}`)
    })
    
  }

  return (
    <div className={styles.container}>
      <NavLink to='/profile' className={`${styles.link} text text_type_main-medium text_color_inactive`} activeClassName={styles.activeClass}>Профиль</NavLink>
      <NavLink to='/profile/orders' className={`${styles.link} text text_type_main-medium text_color_inactive`} activeClassName={styles.activeClass}>История заказов</NavLink>
      <button onClick={logOut} className={`${styles.button} text text_type_main-medium text_color_inactive`}>Выход</button>
      <p className={`${styles.comment} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}