import styles from "./register.module.css";
import { useCallback, useEffect, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../components/spinner/spinner";
import { userLogin } from "../services/actions/login";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswodValue] = useState("");
  const dispatch = useDispatch();
  const { isLoadingOn, isLoadingRequest } = useSelector((store) => store.user);

  const userData = {
    email: emailValue,
    password: passwordValue,
    name: name,
  };

  const setAccount = useCallback((e) => {
    e.preventDefault();
    dispatch(userLogin(userData));
  });

  useEffect(() => {
    if (isLoadingOn) {
      setName("");
      setEmailValue("");
      setPasswodValue("");
    }
  }, [isLoadingOn]);

  if (isLoadingOn) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }

  return isLoadingRequest ? (
    <Spinner />
  ) : (
    <form className={styles.wrapper} onSubmit={setAccount}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        Регистрация
      </h2>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          size={"default"}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          size={"default"}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"password"}
          placeholder={"Пароль"}
          value={passwordValue}
          onChange={(e) => setPasswodValue(e.target.value)}
          size={"default"}
          icon={"ShowIcon"}
        />
      </div>
      <Button>Зарегистрироваться</Button>
      <p className={styles.explanations}>
        Уже зарегистрировались?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </form>
  );
};
