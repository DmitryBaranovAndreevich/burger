import styles from "./setPassword.module.css";
import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from '../components/spinner/spinner';
import { RESET_PASSWORD } from "../utils/config";
import { Link,Redirect,useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";

export const ChangePassword = () => {
   const history = useHistory();
  const initialValue = {token: '',password: ''}
  const {values, handleChange, setValues} = useForm(initialValue); 
  const {token, password} = values;

  const {isLoadingOn,isLoadingRequest} = useSelector(store => store.user)
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(RESET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { success } = await responce.json();
      if (success) {
        setValues(initialValue);
        history.replace({pathname: './login'});
      }
    } catch {
      console.log("Ошибка при попытке смены пароля");
    }
  };

  if(isLoadingOn||history.location.state?.from.pathname !== '/forgot-password') {
    return (
        <Redirect
        to={{
          pathname: '/forgot-password'
        }}
      />
    )
  }


  return isLoadingRequest?(<Spinner/>):(
    <form className={styles.wrapper} onSubmit={resetPassword}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <div className={styles.input}>
        <Input
          name = {'password'}
          type={"password"}
          placeholder={"Введите новый пароль"}
          value={password}
          onChange={handleChange}
          size={"default"}
          icon={"ShowIcon"}
        />
      </div>
      <div className={styles.input}>
        <Input
          name={'token'}
          type={"text"}
          placeholder={"Введите код из письма"}
          value={token}
          onChange={handleChange}
          size={"default"}
        />
      </div>
      <Button >Сохранить</Button>
      <p className={styles.explanations}>
        Вспомнили пароль?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </form>
  );
};
