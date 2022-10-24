import { ISession } from "../types/modules/session";
import axios from "axios";
const API_URL = process.env.REACT_APP_STAGE_API_URL;

export const updateSessionTitleAPI = async (
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
    .put(`${API_URL}session/?${filter}`, {}, config)
    .then((response: any) => response.data)
    .catch(console.log);
};

export const addVideoAPI = async (
  { accessToken }: any,
  file: any,
  sessionId?: string
) => {
  let formData = new FormData();
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${accessToken.jwtToken}`,
    },
  };
  formData.append("file", file);
  console.log(file);
  return await axios
    .post(
      `${API_URL}session/upload-session-video?sessionId= ` + sessionId,
      formData,
      config
    )
    .then((response: any) => console.log(response.data))
    .catch(console.log);
};
// export const sessionsTableData = (): ISession[] => [
//   {
//     creationTimestamp: "01/05/2022",
//     type: "match",
//     length: 65,
//     coach: "coach name 1",
//     participants: [{admin:false,club:{},id:"wedwqeq",}],
//     recordings: true,
//     vokaloLive: true,
//   },
//   {
//     creationTimestamp: "05/05/2022",
//     type: "match",
//     length: 85,
//     coach: "coach name 2",
//     participants: ["athletes2", "athletes2", "athletes2"],
//     recordings: true,
//     vokaloLive: true,
//   },
//   {
//     creationTimestamp: "02/05/2022",
//     type: "practice",
//     length: 165,
//     coach: "coach name 3",
//     participants: ["athletes3", "athletes2"],
//     recordings: false,
//     vokaloLive: false,
//   },
//   {
//     creationTimestamp: "02/05/2022",
//     type: "practice",
//     length: 165,
//     coach: "coach name 4",
//     participants: ["athletes3", "athletes2"],
//     recordings: false,
//     vokaloLive: false,
//   },
//   {
//     creationTimestamp: "02/05/2022",
//     type: "practice",
//     length: 165,
//     coach: "coach name 5",
//     participants: ["athletes3", "athletes2"],
//     recordings: false,
//     vokaloLive: false,
//   },
//   {
//     creationTimestamp: "02/05/2022",
//     type: "practice",
//     length: 165,
//     coach: "coach name 6",
//     participants: ["athletes3", "athletes2"],
//     recordings: false,
//     vokaloLive: false,
//   },
//   {
//     creationTimestamp: "02/05/2022",
//     type: "practice",
//     length: 165,
//     coach: "coach name 7",
//     participants: ["athletes3", "athletes2"],
//     recordings: false,
//     vokaloLive: false,
//   },
//   {
//     creationTimestamp: "02/05/2022",
//     type: "practice",
//     length: 165,
//     coach: "coach name 8",
//     participants: ["athletes3", "athletes2"],
//     recordings: false,
//     vokaloLive: false,
//   },
// ];
export const coachSessionsData = (): ISession[] => [
  // {
  //   id: "",
  //   creationTimestamp: "05/05/2022",
  //   type: "match",
  //   vokaloLive: true,
  //   recordings: true,
  //   score: { trendDirection: "POSITIVE" },
  // },
  // {
  //   id: "",
  //   creationTimestamp: "12/02/2022",
  //   type: "match",
  //   vokaloLive: false,
  //   recordings: true,
  //   score: { trendDirection: "NEGATIVE" },
  // },
  // {
  //   id: "",
  //   creationTimestamp: "01/01/2022",
  //   type: "match",
  //   vokaloLive: false,
  //   recordings: false,
  //   score: { trendDirection: "NEGATIVE" },
  // },
  // {
  //   id: "",
  //   creationTimestamp: "01/01/2022",
  //   type: "match",
  //   vokaloLive: true,
  //   recordings: true,
  //   score: { trendDirection: "NEGATIVE" },
  // },
];
export const squadSessionsData = (): ISession[] => [
  { id: "", creationTimestamp: "05/05/2022", type: "match", length: 25 },
  { id: "", creationTimestamp: "12/02/2022", type: "match", length: 85 },
  { id: "", creationTimestamp: "01/01/2022", type: "match", length: 155 },
];

// export const getSessionsAPI = async (
//   { accessToken }: any,
//   team: string,
//   startDate: any,
//   endDate: any,
//   filter: any
// ) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken.jwtToken}`,
//     },
//   };
//   let filtersList = getFilterUrl(team, startDate, endDate, filter);
//   return await axios
//     .get(
//       `https://data.stage.vokaloio.com/v1/platform/sessions/${filtersList}`,
//       config
//     )
//     .then((response: any) => response.data)
//     .catch(console.log);
// };
// export const getSessionDetailsAPI = async (
//   url: string,
//   { accessToken }: any,
//   team: string,
//   startDate: any,
//   endDate: any,
//   filter: any
// ) => {
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken.jwtToken}`,
//     },
//   };
//   let filtersList = getFilterUrl(team, startDate, endDate, filter);
//   return await axios
//     .get(
//       `https://data.stage.vokaloio.com/v1/platform/${url}${filtersList}`,
//       config
//     )
//     .then((response: any) => response.data)
//     .catch(console.log);
// };
