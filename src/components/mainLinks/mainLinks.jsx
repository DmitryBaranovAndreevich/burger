import styles from './mainLinks.module.css';
import {NavLink } from 'react-router-dom';

export const MainLinks = () => {

  return (
    <div className={styles.container}>
      <NavLink to='/profile' className={`${styles.link} text text_type_main-medium text_color_inactive`} activeClassName={styles.activeClass}>Профиль</NavLink>
      <NavLink to='/profile/orders' className={`${styles.link} text text_type_main-medium text_color_inactive`} activeClassName={styles.activeClass}>История заказов</NavLink>
      <NavLink to='/profile/orders/:id' className={`${styles.link} text text_type_main-medium text_color_inactive`}>Выход</NavLink>
      <p className={`${styles.comment} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}