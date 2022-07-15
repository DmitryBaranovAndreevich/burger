import styles from "./register.module.css";
import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { SET_DATA_ACCOUNT } from "../utils/config";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswodValue] = useState("");

  const setAccount = async () => {
    try {
      const responce = await fetch(SET_DATA_ACCOUNT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
          name: name,
        }),
      });

      const { success } = await responce.json();
      if (success) {
        setName("");
        setEmailValue("");
        setPasswodValue("");
      }
    } catch {
      console.log("Ошибка при попытке смены пароля");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        Регистрация
      </h2>
      <Input
        type={"text"}
        placeholder={"Имя"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        size={"default"}
      />
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
      <Button onClick={setAccount}>Зарегистрироваться</Button>
      <p className={styles.explanations}>
        Уже зарегистрировались?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
};
