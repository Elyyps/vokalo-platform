import { IProfile } from "../types/modules/squad";
import { getFilterUrl } from "../utils/getFilterUrl";
import axios from "axios";

// export const squadData = (): IProfile[] => [
//   {
//     name: "Anders A",
//     role: "Athlete",
//     speechTime: 620,
//     interation: 120,
//     averageInteraction: 0,
//     type: 90,
//     mood: { trendDirection: "NEUTRAL", trendLabel: 0 },
//   },
//   {
//     name: "Anders B",
//     role: "Athlete",
//     speechTime: 100,
//     interation: 120,
//     averageInteraction: 0,
//     type: 75,
//     mood: { trendDirection: "NEGATIVE", trendLabel: -30 },
//   },
//   {
//     name: "Anders C",
//     role: "Coach",
//     speechTime: 50,
//     interation: 120,
//     averageInteraction: 0,
//     type: 60,
//     mood: { trendDirection: "POSITIVE", trendLabel: 50 },
//   },
//   {
//     name: "Anders D",
//     role: "Athlete",
//     speechTime: 90,
//     interation: 120,
//     averageInteraction: 0,
//     type: 30,
//     mood: { trendDirection: "NEUTRAL", trendLabel: 0 },
//   },
//   {
//     name: "Anders F",
//     role: "Athlete",
//     speechTime: 40,
//     interation: 120,
//     averageInteraction: 0,
//     type: 50,
//     mood: { trendDirection: "NEGATIVE", trendLabel: -15 },
//   },
//   {
//     name: "Anders G",
//     role: "Coach",
//     speechTime: 20,
//     interation: 120,
//     averageInteraction: 0,
//     type: 75,
//     mood: { trendDirection: "POSITIVE", trendLabel: 50 },
//   },
// ];
export const getSquadAPI = async (
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
      `https://data.stage.vokaloio.com/v1/platform/profiles${filtersList}`,
      config
    )
    .then((response: any) => response.data)
    .catch(console.log);
};
