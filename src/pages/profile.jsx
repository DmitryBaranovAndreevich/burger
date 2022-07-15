import styles from "./profile.module.css";
import { MainLinks } from "../components/mainLinks/mainLinks";
import { useState } from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

export const Profile = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [passwordValue, setPasswodValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <MainLinks />
      <div className={styles.inputs}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          size={"default"}
          icon={"EditIcon"}
        />
        <Input
          type={"text"}
          placeholder={"Логин"}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          size={"default"}
          icon={"EditIcon"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          value={passwordValue}
          onChange={(e) => setPasswodValue(e.target.value)}
          size={"default"}
          icon={"EditIcon"}
        />
      </div>
    </div>
  );
};
