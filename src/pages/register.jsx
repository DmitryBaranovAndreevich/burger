import styles from "./register.module.css";
import { useCallback, useEffect, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
  import { userLogin } from '../services/actions/login';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswodValue] = useState("");
  const dispatch = useDispatch();
  const {user,isLoadingOn} = useSelector(store => store.user)

  const userData = {
    'email' : emailValue,
    "password": passwordValue, 
    "name": name
  }

  const setAccount = useCallback((e) => {
    e.preventDefault();
    dispatch(userLogin(userData))
  })

  useEffect(() => {
    if(isLoadingOn) {
      console.log(user)
      setName('');
      setEmailValue('');
      setPasswodValue('')
    }
  },[isLoadingOn])

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
