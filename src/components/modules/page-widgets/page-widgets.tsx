import React from "react";
import { IWidget } from "../../../types/cores/widget";
import { ActivityWidget } from "../../cores/activity-widget/activity-widget";
import { ClassificationWidget } from "../../cores/classifications-widget/classifications-widget";
import { EmptyStateComponent } from "../../cores/empty-state/empty-state";
import { FeedbackWidget } from "../../cores/feedback-widget/feedback-widget";
import { SentimentWidget } from "../../cores/sentiment-widget/sentiment-widget";
import { Tooltip } from "../../cores/tooltip/tooltip";
import { UsageWidget } from "../../cores/usage-widget/usage-widget";
import { ClassificationComponent } from "../classifications/classifications";
import style from "./page-widgets.module.scss";
interface IPageWidgetsComponent {
  widgets: IWidget[];
}
export const PageWidgetsComponent = ({ widgets }: IPageWidgetsComponent) => {
  return (
    <div className={style["page-widgets"]}>
      {widgets.map((widget, key) => (
        <div key={key}>
          {widget.widgetType === "BASIC_LABEL" && (
            <div className="widget-container">
              <h6>
                {widget.header}
                {widget.tooltip && <Tooltip content={widget.tooltip} />}
              </h6>
              {widget.label !== "NaN" ? (
                <h3 style={{ marginTop: "16px" }}>{widget.label}</h3>
              ) : (
                <EmptyStateComponent />
              )}
            </div>
          )}
          {widget.widgetType === "BASIC_PERCENTAGE_DISTRIBUTION_WIDGET" && (
            <FeedbackWidget widget={widget} />
          )}
          {widget.widgetType === "PERCENTAGE_DISTRIBUTION_WIDGET" && (
            <ClassificationWidget widget={widget} />
          )}
          {widget.widgetType === "SMALL_TABLE_WITH_TRENDING_LABEL" && (
            <SentimentWidget widget={widget} />
          )}
          {widget.widgetType === "BASIC_WITH_TRENDING_LABEL" && (
            <ActivityWidget widget={widget} />
          )}
          {(widget.widgetType === "SMALL_GRAPH_WITH_TRENDING_LABEL" ||
            widget.widgetType === "BASIC_SMALL_GRAPH_WITH_TRENDING_LABEL") && (
            <UsageWidget widget={widget} />
          )}
          {widget.widgetType === "LARGE_PERCENTAGE_DISTRIBUTION_WIDGET" && (
            <ClassificationComponent widget={widget} />
          )}
        </div>
      ))}
    </div>
  );
};
