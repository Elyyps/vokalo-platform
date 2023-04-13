import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginFormComponent } from "../../components/modules/login-form/login-form";
import { LoginLayoutComponent } from "../../components/modules/login-layout/login-layout";
import { AccountContext } from "../../context/account";
import style from "./login.module.scss";

export const LoginPage = () => {
  let navigate = useNavigate();
  const [hasError, setHasError] = React.useState(false);
  const account = React.useContext(AccountContext);
  const onSubmit = (e: any) => {
    account
      // .authenticate("vokalo-fcn@vokalo.io", "tW6ui23bt")
      .authenticate(e.username, e.password)
      .then(() => {
        navigate("/sessions");
      })
      .catch((err: any) => {
        setHasError(true);
        console.error("Failed to login!", err);
      });
  };
  return (
    <div className={style["login"]}>
      <LoginLayoutComponent>
        {hasError && (
          <span className={style["login-error"]}>
            Error, please try to login again.
          </span>
        )}
        <LoginFormComponent onSubmit={onSubmit} />
      </LoginLayoutComponent>
    </div>
  );
};
