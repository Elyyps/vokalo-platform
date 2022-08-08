import { ITrend } from "../cores/trend";
import { IUser } from "../cores/user";

export type ISession = {
  id: string;
  creationTimestamp: string;
  type: "match" | "practice";
  length?: number;
  creator?: IUser;
  participants?: IUser[];
  vokaloLive?: boolean;
  hasRecordings?: boolean;
  coachScore?: number;
};
