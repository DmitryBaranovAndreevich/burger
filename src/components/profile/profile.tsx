import styles from "./profile.module.css";
import React, { useState, useRef, useCallback, FormEvent } from "react";
import { useSelector, useDispatch } from "../../hooks/types";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../spinner/spinner";
import { changeUserData } from "../../services/actions/login";
import { getCookie } from "../../utils/getCookie";

type TInput<TFeld extends string = ""> = {
  [key in TFeld]: string;
} & { isChange?: boolean };

export const Profile = () => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const { isLoadingOn, user, isLoadingRequest } = useSelector(
    (store) => store.user
  );
  const passwordToken = localStorage.getItem("password");
  const [name, setName]: [
    name: TInput<"user">,
    setName?: (arg: TInput<"user">) => void
  ] = useState({ user: user.name as string });
  const [login, setLogin]: [
    login: TInput<"login">,
    setLogin?: (arg: TInput<"login">) => void
  ] = useState({ login: user.email as string });
  const [password, setPasswod]: [
    password: TInput<"password">,
    setPasswod?: (arg: TInput<"password">) => void
  ] = useState({ password: passwordToken as string });
  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const checkInputs = () => {
    return (
      name.user === user.name &&
      login.login === user.email &&
      password.password === passwordToken
    );
  };

  const onClickResetButton = (
    e: FormEvent<HTMLFormElement> | React.SyntheticEvent<Element>
  ) => {
    e.preventDefault();
    setName({ ...name, user: user.name as string });
    setLogin({ ...login, login: user.email as string });
    setPasswod({ ...password, password: passwordToken as string });
  };

  const onClickSaveButton = useCallback(
    (event: FormEvent<HTMLFormElement> | React.SyntheticEvent<Element>) => {
      event.preventDefault();
      dispatch(
        changeUserData(token, {
          name: name.user,
          email: login.login,
          password: password.password,
        })
      );
      (event.target as HTMLButtonElement).focus();
    },
    [token, name.user, login.login, password.password]
  );

  return !isLoadingOn ? (
    <Spinner />
  ) : (
    <div className={styles.wrapper}>
      <form className={styles.inputs} onSubmit={onClickSaveButton}>
        {isLoadingRequest && <Spinner />}
        <div className={styles.input}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={name.user}
            disabled={name.isChange ? false : true}
            onChange={(e) => setName({ ...name, user: e.target.value })}
            icon={name.isChange ? "CloseIcon" : "EditIcon"}
            size={"default"}
            onBlur={() => {
              setName({ ...name, isChange: !name.isChange });
            }}
            onIconClick={() => {
              setName({ ...name, isChange: !name.isChange });
              setTimeout(() => {
                nameRef.current?.focus();
              }, 0);
            }}
            ref={nameRef}
          />
        </div>
        <div className={styles.input}>
          <Input
            type={"text"}
            placeholder={"Логин"}
            value={login.login}
            disabled={login.isChange ? false : true}
            onChange={(e) => setLogin({ ...login, login: e.target.value })}
            size={"default"}
            icon={login.isChange ? "CloseIcon" : "EditIcon"}
            onBlur={() => setLogin({ ...login, isChange: !login.isChange })}
            onIconClick={() => {
              setLogin({ ...login, isChange: !login.isChange });
              setTimeout(() => {
                loginRef.current?.focus();
              }, 0);
            }}
            ref={loginRef}
          />
        </div>
        <div className={styles.input}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            value={password.password}
            disabled={password.isChange ? false : true}
            onChange={(e) =>
              setPasswod({ ...password, password: e.target.value })
            }
            size={"default"}
            icon={password.isChange ? "CloseIcon" : "EditIcon"}
            onBlur={() =>
              setPasswod({ ...password, isChange: !password.isChange })
            }
            onIconClick={() => {
              setPasswod({ ...password, isChange: !password.isChange });
              setTimeout(() => {
                passwordRef.current?.focus();
              }, 0);
            }}
            ref={passwordRef}
          />
        </div>
        {!checkInputs() && (
          <div className={styles.buttonContainer}>
            <Button onClick={onClickSaveButton}>Сохранить</Button>
            <Button type="secondary" onClick={onClickResetButton}>
              Отмена
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
