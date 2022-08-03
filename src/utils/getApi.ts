import axios from "axios";
import { getFilterUrl } from "./getFilterUrl";

export const getAPI = async (
  url: string,
  { accessToken }: any,
  team: string,
  startDate: any,
  endDate: any,
  filter: any
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  let filtersList = getFilterUrl(team, startDate, endDate, filter);
  return await axios
    .get(
      `https://data.stage.vokaloio.com/v1/platform/${url}${filtersList}`,
      config
    )
    .then((response: any) => response.data)
    .catch(console.log);
};

export const putAPI = async (
  url: string,
  { accessToken }: any,
  team: string,
  startDate: any,
  endDate: any,
  filter: any
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  let filtersList = getFilterUrl(team, startDate, endDate, filter);
  return await axios
    .put(
      `https://data.stage.vokaloio.com/v1/platform/${url}${filtersList}`,
      config
    )
    .then((response: any) => response.data)
    .catch(console.log);
};
