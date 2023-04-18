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
export type ISquad = {
  communicationAggregations: ICommunicationAggregation;
  firstName: string;
  lastName: string;
  moodAggregations: IAggregation;
  orientationAggregations: IAggregation;
  role: "Athlete" | "Coach";
  tags: string[];
  teams: any[];
  id: string;
};
