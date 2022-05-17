import { ISession } from "../types/modules/session";

export const sessionsData = (): ISession[] => [
  {
    date: "01/05/2022",
    type: "match",
    length: 65,
    coach: "coach name 1",
    athletes: ["athletes1"],
    recordings: true,
    analyzed: true,
  },
  {
    date: "05/05/2022",
    type: "match",
    length: 85,
    coach: "coach name 4",
    athletes: ["athletes2","athletes2","athletes2"],
    recordings: true,
    analyzed: true,
  },
  {
    date: "02/05/2022",
    type: "practice",
    length: 165,
    coach: "coach name 8",
    athletes: ["athletes3","athletes2"],
    recordings: false,
    analyzed: false,
  },
];
