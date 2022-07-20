import styles from "./passwordRecovery.module.css";
import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Spinner from '../components/spinner/spinner';
import { GET_PASSWORD } from "../utils/config";
import { Link,Redirect,useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const PassworRecovery = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const {isLoadingOn,isLoadingRequest} = useSelector(store => store.user)
  
  const getPassword = async (e) => {
    e.preventDefault()
    try {
      const responce = await fetch(GET_PASSWORD, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const { success } = await responce.json();
      if(success) {
        setEmail('');
        history.replace({pathname: '/reset-password',state:{from: history.location}})
      }
    } catch {
      console.log(`Запрос не прошел`);
    }
  };
  
  if(isLoadingOn){
     return (
    <Redirect
        to={{
          pathname: '/'
        }}
      />)
  }

  return isLoadingRequest?(<Spinner/>):(
    <form className={styles.wrapper} onSubmit={getPassword}>
      <h2 className={`${styles.title} text text_type_main-medium`}>
        Восстановление пароля
      </h2>
      <div className={styles.input}>
        <Input
          type={"text"}
          placeholder={"Укажите e-mail"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size={"default"}
        />
      </div>
      <Button >Восстановить</Button>
      <p className={styles.explanations}>
        Вспомнили пароль?
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </form>
  );
};
