import styles from "./passwordRecovery.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../components/spinner/spinner";
import { GET_PASSWORD } from "../utils/config";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "../hooks/useForm";

export const PassworRecovery = () => {
  const history = useHistory();
  const initialValue = { email: "" };
  const { values, handleChange, setValues } = useForm(initialValue);
  const { email } = values;

  const { isLoadingOn, isLoadingRequest } = useSelector((store) => store.user);

  const getPassword = async (e) => {
    e.preventDefault();
    try {
      const responce = await fetch(GET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const { success } = await responce.json();
      if (success) {
        setValues(initialValue);
        history.replace({
          pathname: "/reset-password",
          state: { from: history.location },
        });
      }
    } catch {
      console.log(`Запрос не прошел`);
    }
  };

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
    <form className={styles.wrapper} onSubmit={getPassword}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <div className={styles.input}>
        <Input
          name={"email"}
          type={"text"}
          placeholder={"Укажите e-mail"}
          value={email}
          onChange={handleChange}
          size={"default"}
        />
      </div>
      <Button>Восстановить</Button>
      <p className={styles.explanations}>
        Вспомнили пароль?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </form>
  );
};
