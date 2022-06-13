import { ITrend } from "../cores/trend";

type IWord = {
  label: string;
  repetition: number;
  trend: ITrend;
};
export type IMostWords = {
  title: string;
  words: IWord[];
};
