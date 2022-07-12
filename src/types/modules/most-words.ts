import { ITrend } from "../cores/trend";

type IWord = {
  label: string;
  subHeader: String;
  trendLabel: number;
  trendDirection: "NEUTRAL" | "POSITIVE" | "NEGATIVE";
};
export type IMostWords = {
  header: string;
  elements: IWord[];
};
