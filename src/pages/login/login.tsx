import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormComponent } from "../../components/modules/login-form/login-form";
import { LoginLayoutComponent } from "../../components/modules/login-layout/login-layout";
import { AccountContext } from "../../context/account";
import style from "./login.module.scss";

export const LoginPage = () => {
  let navigate = useNavigate();

  const account = React.useContext(AccountContext);
  const onSubmit = (e: any) => {
    account
      .authenticate("jon@vokalo.io", "wqCn%C7i")
      // .authenticate("jon@vokalo.io", "Sqw5#I9V")wqCn%C7i
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
      <LoginLayoutComponent>
        <LoginFormComponent onSubmit={onSubmit} />
      </LoginLayoutComponent>
    </div>
  );
};
