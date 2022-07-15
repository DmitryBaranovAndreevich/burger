import styles from "./passwordRecovery.module.css";
import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { GET_PASSWORD } from "../utils/config";
import { Link } from "react-router-dom";

export const PassworRecovery = () => {
  const [passwordValue, setPasswodValue] = useState("");

  const getPassword = async () => {
    try {
      const responce = await fetch(GET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: passwordValue }),
      });

      const { success } = await responce.json();
      success && setPasswodValue("");
    } catch {
      console.log(`Запрос не прошел`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <Input
        type={"text"}
        placeholder={"Укажите e-mail"}
        value={passwordValue}
        onChange={(e) => setPasswodValue(e.target.value)}
        size={"default"}
      />
      <Button onClick={getPassword}>Восстановить</Button>
      <p className={styles.explanations}>
        Вспомнили пароль?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
