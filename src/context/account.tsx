import React from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "../utils/userPool";

let isLogged: boolean | undefined;

const authenticate: any = async (username: string, password: string) => {};
const getAccount: any = () => {};
const logout: any = () => {};

const AccountContext = React.createContext({
  authenticate,
  getAccount,
  logout,
  isLogged,
});

const AccountContextProvider = (props: any) => {
  const [isUserLogged, setIsUserLogged] = React.useState<boolean>(true);

  const getAccount = async () =>
    await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();
      if (user) {
        user.getSession((err: any, account: any) => {
          if (err) {
            setIsUserLogged(false);
            reject();
          } else {
            // console.log(account.accessToken.jwtToken);
            setIsUserLogged(true);
            resolve(account);
          }
        });
      } else {
        setIsUserLogged(false);
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
          setIsUserLogged(true);
          // console.log("onSuccess:", data);
          resolve(data);
        },

        onFailure: (err) => {
          setIsUserLogged(false);
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
        isLogged: isUserLogged,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { AccountContextProvider, AccountContext };
