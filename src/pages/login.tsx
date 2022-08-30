import styles from "./login.module.css";
import { FormEvent, useCallback, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../components/spinner/spinner";
import { Link, Redirect, useLocation } from "react-router-dom";
import { userLogin } from "../services/actions/login";
import { useDispatch, useSelector } from "../hooks/types";
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const initialValue = { email: "", password: "" };
  const { values, handleChange, setValues } = useForm(initialValue);
  const { email, password } = values;

  const { isLoadingOn, isLoadingRequest } = useSelector((store) => store.user);

  const login = useCallback(
    (e: FormEvent<HTMLElement>) => {
      e.preventDefault();
      dispatch(userLogin(values));
    },
    [email, password]
  );

  useEffect(() => {
    if (isLoadingOn) {
      setValues(initialValue);
    }
  }, [isLoadingOn]);
  const location: { state: { from: string } } = useLocation();

  if (isLoadingOn) {
    return <Redirect to={location.state?.from || "/"} />;
  }

  return isLoadingRequest ? (
    <Spinner />
  ) : (
    <form className={styles.wrapper} onSubmit={login}>
      <h2 className={`${styles.title} text text_type_main-medium`}>Вход</h2>
      <div className={styles.input}>
        <Input
          name={"email"}
          type={"email"}
          placeholder={"E-mail"}
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className={styles.input}>
        <Input
          name={"password"}
          type={"password"}
          placeholder={"Пароль"}
          value={password}
          onChange={handleChange}
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
