import axios from "axios";
import { IPlayer } from "../types/cores/player";
const API_URL = process.env.REACT_APP_STAGE_API_URL;

export const getNewFormationAPI = async (
  { accessToken }: any,
  filter: string
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  return await axios
    .put(`${API_URL}session/pitch-view/formation?${filter}`, {}, config)
    .then((response: any) => response.data)
    .catch(console.log);
};

export const getRangeAPI = async ({ accessToken }: any, filter: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  return await axios
    .put(`${API_URL}session/pitch-view/range?${filter}`, {}, config)
    .then((response: any) => response.data)
    .catch(console.log);
};

export const updatePlayerAPI = async (
  { accessToken }: any,
  players: IPlayer[],
  sessionId?: string
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  return await axios
    .post(
      `${API_URL}session/pitch-view/profiles?sessionId=` + sessionId,
      players,
      config
    )
    .then((response: any) => response.data)
    .catch(console.log);
};
