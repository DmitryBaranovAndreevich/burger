import styles from "./login.module.css";
import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswodValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
      <Input
        type={"email"}
        placeholder={"E-mail"}
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        size={"default"}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        value={passwordValue}
        onChange={(e) => setPasswodValue(e.target.value)}
        size={"default"}
        icon={"ShowIcon"}
      />
      <Button size={"large"}>Войти</Button>
      <div className={styles.container}>
        <p
          className={`${styles.explanations} text text_type_main-default text_color_inactive`}
        >
          Вы — новый пользователь?
          <Link className={styles.link} to="/register">
            Зарегистрироваться
          </Link>
        </p>
        <p
          className={`${styles.explanations} text text_type_main-default text_color_inactive`}
        >
          Забыли пароль?
          <Link className={styles.link} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
