import styles from "./setPassword.module.css";
import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { RESET_PASSWORD } from "../utils/config";
import { Link } from "react-router-dom";

export const ChangePassword = () => {
  const [token, setToken] = useState("");
  const [passwordValue, setPasswodValue] = useState("");

  const resetPassword = async () => {
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
      }
    } catch {
      console.log("Ошибка при попытке смены пароля");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <Input
        type={"password"}
        placeholder={"Введите новый пароль"}
        value={passwordValue}
        onChange={(e) => setPasswodValue(e.target.value)}
        size={"default"}
        icon={"ShowIcon"}
      />
      <Input
        type={"text"}
        placeholder={"Введите код из письма"}
        value={token}
        onChange={(e) => setToken(e.target.value)}
        size={"default"}
      />
      <Button onClick={resetPassword}>Сохранить</Button>
      <p className={styles.explanations}>
        Вспомнили пароль?
        <Link className={styles.link} href="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
