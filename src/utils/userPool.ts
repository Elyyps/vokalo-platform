import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-north-1_0Nxk21i2o",
  ClientId: "38o0qek8llchgloovir5lumcia",
};

export default new CognitoUserPool(poolData);
