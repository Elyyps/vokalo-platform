import React from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import userPool from "../utils/userPool";

let logged: boolean = true;

const authenticate: any = async (username: string, password: string) => {};
const getAccount: any = () => {};
const logout: any = () => {};

const AccountContext = React.createContext({
  authenticate,
  getAccount,
  logout,
  logged,
});

const AccountContextProvider = (props: any) => {
  const [isLogged, setIsLogged] = React.useState(true);

  const getAccount = async () =>
    await new Promise((resolve, reject) => {
      const user = userPool.getCurrentUser();
      if (user) {
        user.getSession((err: any, account: any) => {
          if (err) {
            setIsLogged(false);
            reject();
          } else {
            // console.log(account.accessToken.jwtToken);
            setIsLogged(true);
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
          //setIsLogged(true);
        },

        onFailure: (err) => {
          // console.error("onFailure:", err);
          reject(err);
          // setIsLogged(false);
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
      setIsLogged(false);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getAccount,
        logout,
        logged: isLogged,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { AccountContextProvider, AccountContext };
