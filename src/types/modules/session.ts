import { ITrend } from "../cores/trend";

export type ISession = {
  date: string;
  type: "match" | "practice";
  length?: number;
  coach?: string;
  athletes?: string[];
  vokalo?: ITrend;
  recordings?: ITrend;
  score?: ITrend;
};
