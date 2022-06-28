type IAxe = {
  name?: string;
  color?: string;
  data: any[];
};
type IGraph = {
  xaxis?: IAxe;
  yaxis: IAxe | IAxe[] | any;
};
type IWidgetElements = {
  label?: string;
  percentage: number;
  color?: string;
};
export type IWidget = {
  type?: string;
  header: string;
  subHeader?: string;
  label?: string;
  widgetType?: string;
  trendLabel?: number;
  trendDirection?: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  elements?: IWidgetElements[];
  data?: IGraph;
};
