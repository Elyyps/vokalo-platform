import axios from "axios";

export const getUserAPI = async ({ accessToken }: any) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };

  return await axios
    .get("/user", config)
    .then((response: any) => response.data.user)
    .catch(console.log);
};
