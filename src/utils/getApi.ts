import axios from "axios";
import { getFilterUrl } from "./getFilterUrl";
const API_URL = process.env.REACT_APP_STAGE_API_URL;
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
  console.log(filter);
  let filtersList = getFilterUrl(team, startDate, endDate, filter);
  return await axios
    .get(API_URL + url + filtersList, config)
    .then((response: any) => response.data)
    .catch(console.log);
};
