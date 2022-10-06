import styles from "./register.module.css";
import { FormEvent, useCallback, useEffect } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../components/spinner/spinner";
import { userLogin } from "../services/actions/login";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "../hooks/types";
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const initialValue = { email: "", password: "", name: "" };
  const { values, handleChange, setValues } = useForm(initialValue);
  const { name, email, password } = values;

  const { isLoadingOn, isLoadingRequest } = useSelector((store) => store.user);

  const setAccount = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(userLogin(values));
    },
    [name, email, password]
  );

  useEffect(() => {
    if (isLoadingOn) {
      setValues(initialValue);
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
          name={"name"}
          type={"text"}
          placeholder={"Имя"}
          value={name}
          onChange={handleChange}
          size={"default"}
        />
      </div>
      <div className={styles.input}>
        <Input
          name={"email"}
          type={"email"}
          placeholder={"E-mail"}
          value={email}
          onChange={handleChange}
          size={"default"}
        />
      </div>
      <div className={styles.input}>
        <Input
          name={"password"}
          type={"password"}
          placeholder={"Пароль"}
          value={password}
          onChange={handleChange}
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
