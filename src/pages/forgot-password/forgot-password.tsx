import { CognitoUser } from "amazon-cognito-identity-js";
import React from "react";
import { LoginLayoutComponent } from "../../components/modules/login-layout/login-layout";
import { NewPasswordFormComponent } from "../../components/modules/new-password-form/new-password-form";
import { SendCodeFormComponent } from "../../components/modules/send-code-form/send-code-form";
import userPool from "../../utils/userPool";
import style from "./forgot-password.module.scss";

export const ForgotPasswordPage = () => {
  const [stage, setStage] = React.useState<number>(0);

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
        setStage(1);
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
            <NewPasswordFormComponent onSubmit={() => setStage(1)} />
          </div>
        )}
      </LoginLayoutComponent>
    </div>
  );
};
