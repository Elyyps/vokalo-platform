import { CognitoUser } from "amazon-cognito-identity-js";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LoginLayoutComponent } from "../../components/modules/login-layout/login-layout";
import { NewPasswordFormComponent } from "../../components/modules/new-password-form/new-password-form";
import { SendCodeFormComponent } from "../../components/modules/send-code-form/send-code-form";
import userPool from "../../utils/userPool";
import style from "./forgot-password.module.scss";

export const ForgotPasswordPage = () => {
  const [stage, setStage] = React.useState<number>(0);
  const [email, setEmail] = React.useState<string>("");
  let navigate = useNavigate();

  const getUser = (email: string) => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: userPool,
    });
  };

  const sendCode = (e: any) => {
    getUser(e.username).forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        setEmail(e.username);
        setStage(1);
      },
    });
  };
  const resetPassword = (e: any) => {
    getUser(email).confirmPassword(e.code, e.password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        navigate("/login");
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
    });
  };
  return (
    <div className={style["forgot-password"]}>
      <LoginLayoutComponent>
        {stage === 0 && (
          <div className={style["forgot-password-0"]}>
            <SendCodeFormComponent onSubmit={(e) => sendCode(e)} />
          </div>
        )}
        {stage === 1 && (
          <div className={style["forgot-password-0"]}>
            <NewPasswordFormComponent onSubmit={(e) => resetPassword(e)} />
          </div>
        )}
      </LoginLayoutComponent>
    </div>
  );
};
