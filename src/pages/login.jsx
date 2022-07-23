import styles from "./login.module.css";
import { useCallback, useEffect, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../components/spinner/spinner";
import { Link, Redirect, useLocation } from "react-router-dom";
import { userLogin } from "../services/actions/login";
import { useDispatch, useSelector } from "react-redux";

export const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswodValue] = useState("");
  const dispatch = useDispatch();
  const { isLoadingOn, isLoadingRequest } = useSelector((store) => store.user);

  const login = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(userLogin({ email: emailValue, password: passwordValue }));
    },
    [emailValue, passwordValue]
  );

  useEffect(() => {
    if (isLoadingOn) {
      setEmailValue("");
      setPasswodValue("");
    }
  }, [isLoadingOn]);
  const location = useLocation();

  if (isLoadingOn) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return isLoadingRequest ? (
    <Spinner />
  ) : (
    <form className={styles.wrapper} onSubmit={login} style={{ maxWidth: 480 }}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
      <div className={styles.input}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </div>
      <div className={styles.input}>
        <Input
          type={"password"}
          placeholder={"Пароль"}
          value={passwordValue}
          onChange={(e) => setPasswodValue(e.target.value)}
          icon={"ShowIcon"}
        />
      </div>
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
    </form>
  );
};
