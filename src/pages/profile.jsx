import styles from "./profile.module.css";
import { MainLinks } from "../components/mainLinks/mainLinks";
import { useState } from "react";
import { useSelector} from 'react-redux'
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../components/spinner/spinner";

export const Profile = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [passwordValue, setPasswodValue] = useState("");
  const {isLoginOutRequest} = useSelector(store => store.user);

  return isLoginOutRequest?(<Spinner/>):(
    <form className={styles.wrapper}>
      <MainLinks />
      <div className={styles.inputs}>
        <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          icon={"EditIcon"}
          size={"default"}
        />
</div>
<div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Логин"}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          size={"default"}
          icon={"EditIcon"}
        />
        </div>
        <div className={styles.input}>
        <Input
          type={"password"}
          placeholder={"Пароль"}
          value={passwordValue}
          onChange={(e) => setPasswodValue(e.target.value)}
          size={"default"}
          icon={"EditIcon"}
        />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="secondary">Отмена</Button>
          <Button>Сохранить</Button>
        </div>
      </div>
    </form>
  );
};
