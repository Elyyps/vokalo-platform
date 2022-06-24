import React from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "../utils/userPool";

const authenticate: any = async (username: string, password: string) => {};
const getAccount: any = () => {};
const logout: any = () => {};

const AccountContext = React.createContext({
  authenticate,
  getAccount,
  logout,
});

const AccountContextProvider = (props: any) => {
  const getAccount = async () =>
    await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();
      if (user) {
        user.getSession((err: any, account: any) => {
          if (err) {
            reject();
          } else {
            console.log(account);

            resolve(account);
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (username: string, password: string) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username: username, Pool: userPool });
      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          // console.log("onSuccess:", data);
          resolve(data);
        },

        onFailure: (err) => {
          // console.error("onFailure:", err);
          reject(err);
        },

        newPasswordRequired: (data) => {
          //   console.log("newPasswordRequired:", data);
          resolve(data);
        },
      });
    });

  const logout = () => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getAccount,
        logout,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { AccountContextProvider, AccountContext };
