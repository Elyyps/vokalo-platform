import axios from "axios";
import { IPlayer } from "../types/cores/player";
const API_URL = process.env.REACT_APP_STAGE_API_URL;

// export const FieldOverviewData = (): IFieldOverview => ({
//   dataSets: [
//     {
//       button: {
//         title: "Interactions",
//         icon: "/icons/interactions.svg",
//       },
//       data: [
//         { playerId: 50, value: 0.1 },
//         { playerId: 51, value: 0.62 },
//         { playerId: 52, value: 0.455 },
//         { playerId: 53, value: 0.5 },
//         { playerId: 54, value: 0.2 },
//         { playerId: 55, value: 0.15 },
//         { playerId: 56, value: 0.38 },
//         { playerId: 57, value: 0.7 },
//         { playerId: 58, value: 0.71 },
//         { playerId: 59, value: 0.33 },
//         { playerId: 60, value: 0.8 },
//         { playerId: 72, value: 0.8 },
//         { playerId: 75, value: 0.3 },
//       ],
//     },
//     {
//       button: {
//         title: "Orientation",
//         icon: "/icons/orientation.svg",
//       },
//       data: [
//         { playerId: 50, value: 0.24 },
//         { playerId: 51, value: 0.7 },
//         { playerId: 52, value: 0.74 },
//         { playerId: 53, value: 0.2 },
//         { playerId: 54, value: 0.25 },
//         { playerId: 55, value: 0.2 },
//         { playerId: 56, value: 0.32 },
//         { playerId: 57, value: 0.68 },
//         { playerId: 58, value: 0.88 },
//         { playerId: 59, value: 0.5 },
//         { playerId: 60, value: 1 },
//         { playerId: 72, value: 0.6 },
//       ],
//     },
//     {
//       button: {
//         title: "Stimulation",
//         icon: "/icons/stimulation.svg",
//       },
//       data: [
//         { playerId: 50, value: 0.3 },
//         { playerId: 51, value: 0.3 },
//         { playerId: 52, value: 0.3 },
//         { playerId: 53, value: 0.3 },
//         { playerId: 54, value: 0.3 },
//         { playerId: 55, value: 0.3 },
//         { playerId: 56, value: 0.3 },
//         { playerId: 57, value: 0.3 },
//         { playerId: 58, value: 0.3 },
//         { playerId: 59, value: 0.3 },
//         { playerId: 60, value: 0.3 },
//       ],
//     },
//     {
//       button: {
//         title: "Positive feeback",
//         icon: "/icons/positive.svg",
//       },
//       data: [
//         { playerId: 50, value: 0.4 },
//         { playerId: 51, value: 0.4 },
//         { playerId: 52, value: 0.4 },
//         { playerId: 53, value: 0.4 },
//         { playerId: 54, value: 0.4 },
//         { playerId: 55, value: 0.4 },
//         { playerId: 56, value: 0.4 },
//         { playerId: 57, value: 0.4 },
//         { playerId: 58, value: 0.4 },
//         { playerId: 59, value: 0.4 },
//         { playerId: 60, value: 0.4 },
//       ],
//     },
//     {
//       button: {
//         title: "Negative feedback",
//         icon: "/icons/negative.svg",
//       },
//       data: [
//         { playerId: 50, value: 0.5 },
//         { playerId: 51, value: 0.5 },
//         { playerId: 52, value: 0.5 },
//         { playerId: 53, value: 0.5 },
//         { playerId: 54, value: 0.5 },
//         { playerId: 55, value: 0.5 },
//         { playerId: 56, value: 0.5 },
//         { playerId: 57, value: 0.5 },
//         { playerId: 58, value: 0.5 },
//         { playerId: 59, value: 0.5 },
//         { playerId: 60, value: 0.5 },
//       ],
//     },
//   ],
//   gameData: {
//     startMinute: 0,
//     endMinute: 92,
//     halftime: 45,
//     from: 0,
//     to: 0,
//   },
//   colors: ["#D3D3D3", "#A7BAEA", "#6488E5", "#375FCA", "#2C2F51"],
//   profiles: playersData(),
//   formations: [],
// });

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
      `${API_URL}session/pitch-view/profiles?sessionId= ` + sessionId,
      players,
      config
    )
    .then((response: any) => response.data)
    .catch(console.log);
};
