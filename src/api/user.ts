import axios from "axios";
const API_URL = process.env.REACT_APP_STAGE_API_URL;

export const getUserAPI = async ({ accessToken }: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  return await axios
    .get(API_URL + "user", config)
    .then((response: any) => response.data.user)
    .catch(console.log);
};
