export const requestHeader = (accessToken: any) => {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
};
