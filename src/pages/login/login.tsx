import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormComponent } from "../../components/modules/login-form/login-form";
import { AccountContext } from "../../context/account";
import style from "./login.module.scss";

export const LoginPage = () => {
  let navigate = useNavigate();

  const account = React.useContext(AccountContext);
  const onSubmit = (e: any) => {
    account
      .authenticate("jon@vokalo.io", "Sqw5#I9V")
      // .authenticate(e.username, e.password)
      .then((data: any) => {
        navigate("/");
      })
      .catch((err: any) => {
        console.error("Failed to login!", err);
      });
  };
  return (
    <div className={style["login"]}>
      <div className={style["login-header"]}>
        <div>
          <img src="/img/logo.png" alt="logo" />
        </div>
      </div>
      <div className={style["login-content"]}>
        <div className={style["login-content-left"]}>
          <h1>Studio.</h1>
        </div>
        <div className={style["login-content-right"]}>
          <LoginFormComponent onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};
