import React from "react";
import { IWidget } from "../../../types/cores/widget";
import { ActivityWidget } from "../../cores/activity-widget/activity-widget";
import { FeedbackWidget } from "../../cores/feedback-widget/feedback-widget";
import { SentimentWidget } from "../../cores/sentiment-widget/sentiment-widget";
import { UsageWidget } from "../../cores/usage-widget/usage-widget";
import style from "./page-widgets.module.scss";
interface IPageWidgetsComponent {
  widgets: IWidget[];
  isDetailPage?: boolean;
}
export const PageWidgetsComponent = ({
  widgets,
  isDetailPage,
}: IPageWidgetsComponent) => {
  return (
    <div
      className={` ${style["page-widgets"]} ${
        isDetailPage && style["page-widgets-details"]
      }`}
    >
      {widgets.map((widget, key) => (
        <div key={key}>
          {widget.widgetType === "BASIC_LABEL" && (
            <div className="widget-container">
              <h6>{widget.header}</h6>
              <h3 style={{ marginTop: "16px" }}>{widget.label}</h3>
            </div>
          )}
          {widget.widgetType === "BASIC_PERCENTAGE_DISTRIBUTION_WIDGET" && (
            <FeedbackWidget widget={widget} />
          )}
          {widget.widgetType === "PERCENTAGE_DISTRIBUTION_WIDGET" && (
            <FeedbackWidget widget={widget} />
          )}
          {widget.widgetType === "SMALL_TABLE_WITH_TRENDING_LABEL" && (
            <SentimentWidget widget={widget} />
          )}
          {widget.widgetType === "BASIC_WITH_TRENDING_LABEL" && (
            <ActivityWidget widget={widget} />
          )}
          {widget.widgetType === "SMALL_GRAPH_WITH_TRENDING_LABEL" && (
            <UsageWidget widget={widget} />
          )}
        </div>
      ))}

      {/*  <ActivityWidget
              widget={{
                header: "Most active athlete",
                label: "Brian B.",
                trendLabel: 25,
                trendDirection: "POSITIVE",
              }}
            /> 
            <UsageWidget
        widget={{
          header: "Usage",
          label: "7.240",
          subHeader: "previous 15 days",
          trendLabel: 55,
          trendDirection: "POSITIVE",
          graph: {
            yAxis: {
              name: "age",
              data: [0, 2, 4, 8, 5, 6, 2],
            },
            xAxis: {
              name: "weight",
              data: [0, 1, 2, 3, 4, 5, 6],
            },
          },
        }}
      />
      
      <SentimentWidget
        widget={{
          header: "Sentiment",
          label: "Good",
          subHeader: "previous 15 days",
          trendLabel: 55,
          trendDirection: "POSITIVE",
          graph: {
            yAxis: {
              data: [42, 95, 75, 50, 40, 55, 80],
            },
          },
        }}
      /> 
      <FeedbackWidget
              widget={{
                header: "Feedback",
                elements: [
                  { percentage: 25, color: "#2C2F51", label: "POSITIVE" },
                  { percentage: 35, color: "#486FD4", label: "STIMULATION" },
                  { percentage: 20, color: "#91AAE8", label: "ORIENTATION" },
                  { percentage: 20, color: "#D3D3D3", label: "NEGATIVE" },
                ],
              }}
            />
       */}
    </div>
  );
};
