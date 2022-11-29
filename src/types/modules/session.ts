import { ITrend } from "../cores/trend";
import { IUser } from "../cores/user";
type IAggregation = {
  key: string;
  trendDirection: "NEUTRAL" | "POSITIVE" | "NEGATIVE";
  value: number;
};
type ICommunicationAggregation = {
  averageInteractionLength: number;
  averageInteractions: number;
  minutes: number;
};
export type ISession = {
  id: string;
  creationTimestamp: string;
  type: "match" | "training";
  length?: number;
  label?: string;
  creator?: IUser;
  participants?: IUser[];
  vokaloLive?: boolean;
  hasRecordings?: boolean;
  coachScore?: number;
  hasVideoConnected?: boolean;
  communicationAggregations?: ICommunicationAggregation;
  orientationAggregations?: IAggregation;
  analysis_language?: string;
};
