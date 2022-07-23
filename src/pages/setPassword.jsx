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

export const ChangePassword = () => {
  const [token, setToken] = useState("");
  const [passwordValue, setPasswodValue] = useState("");
  const history = useHistory();
  const {isLoadingOn,isLoadingRequest} = useSelector(store => store.user)
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(RESET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: passwordValue,
          token: token,
        }),
      });

      const { success } = await responce.json();
      if (success) {
        setToken("");
        setPasswodValue("");
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
          type={"password"}
          placeholder={"Введите новый пароль"}
          value={passwordValue}
          onChange={(e) => setPasswodValue(e.target.value)}
          size={"default"}
          icon={"ShowIcon"}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          value={token}
          onChange={(e) => setToken(e.target.value)}
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
