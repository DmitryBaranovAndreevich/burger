import styles from "./profile.module.css";
import { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from "../spinner/spinner";
import { changeUserData } from "../../services/actions/login";
import { getCookie } from "../../utils/getCookie";

export const Profile = () => {
  const dispatch = useDispatch();
  const token = getCookie("token");
  const { isLoadingOn, user, isLoadingRequest } = useSelector(
    (store) => store.user
  );
  const passwordToken = localStorage.getItem("password");
  const [name, setName] = useState({ user: user.name });
  const [login, setLogin] = useState({ login: user.email });
  const [password, setPasswod] = useState({ password: passwordToken });
  const nameRef = useRef(null);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const checkInputs = () => {
    return (
      name.user === user.name &&
      login.login === user.email &&
      password.password === passwordToken
    );
  };

  const onClickResetButton = (e) => {
    e.preventDefault();
    setName({ ...name, user: user.name });
    setLogin({ ...login, login: user.email });
    setPasswod({ ...password, password: passwordToken });
  };

  const onClickSaveButton = useCallback((event) => {
    event.preventDefault();
    dispatch(
      changeUserData(token, {
        name: name.user,
        email: login.login,
        password: password.password,
      })
    );
    event.target.focus();
  },[token,name.user,login.login,password.password]);

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
                nameRef.current.focus();
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
                loginRef.current.focus();
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
                passwordRef.current.focus();
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
