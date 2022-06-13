import { ITrend } from "../cores/trend";

export type ISquad = {
  name: string;
  role: "Athlete" | "Coach";
  speechTime: number;
  interation: number;
  averageInteraction: number;
  type: number;
  mood: ITrend;
};
