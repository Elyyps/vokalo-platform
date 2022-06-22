import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'eu-north-1_AHsmM2Uh7',
  ClientId: '5l4dk45c35mra1n6srvr2gia9r'
};

export default new CognitoUserPool(poolData);