import { ISession } from "../types/modules/session";
import axios from "axios";
import { getFilterUrl } from "../utils/getFilterUrl";

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
  {
    creationTimestamp: "05/05/2022",
    type: "match",
    vokaloLive: true,
    recordings: true,
    score: { trendDirection: "POSITIVE" },
  },
  {
    creationTimestamp: "12/02/2022",
    type: "match",
    vokaloLive: false,
    recordings: true,
    score: { trendDirection: "NEGATIVE" },
  },
  {
    creationTimestamp: "01/01/2022",
    type: "match",
    vokaloLive: false,
    recordings: false,
    score: { trendDirection: "NEGATIVE" },
  },
  {
    creationTimestamp: "01/01/2022",
    type: "match",
    vokaloLive: true,
    recordings: true,
    score: { trendDirection: "NEGATIVE" },
  },
];
export const squadSessionsData = (): ISession[] => [
  {
    creationTimestamp: "05/05/2022",
    type: "match",
    length: 25,
  },
  {
    creationTimestamp: "12/02/2022",
    type: "match",
    length: 85,
  },
  {
    creationTimestamp: "01/01/2022",
    type: "match",
    length: 155,
  },
];

export const getSessionsAPI = async (
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
      `https://data.stage.vokaloio.com/v1/platform/sessions${filtersList}`,
      config
    )
    .then((response: any) => response.data)
    .catch(console.log);
};
