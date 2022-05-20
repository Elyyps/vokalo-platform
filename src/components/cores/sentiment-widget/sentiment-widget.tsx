import React from "react";
import { ReactSVG } from "react-svg";
import { IWidget } from "../../../types/cores/widget";
import { TrendComponent } from "../trend/trend";
import style from "./sentiment-widget.module.scss";
interface ISentimentWidget {
  widget: IWidget;
}
export const SentimentWidget = ({ widget }: ISentimentWidget) => {
  return (
    <div className={` ${style["sentiment-widget"]} widget-container `}>
      <h6>{widget.header}</h6>
      <div className={style["sentiment-widget-content"]}>
        <span>{widget.label}</span>
        <div className={style["sentiment-widget-graph"]}>
          {widget.graph?.yAxis.data.map((item, key) => (
            <div
              key={key}
              style={{
                height: item + "%",
                width: `calc(${
                  100 / (widget.graph ? widget.graph?.yAxis.data.length : 0)
                }% - 2%)`,
              }}
            />
          ))}
        </div>
      </div>
      <div className={style["sentiment-widget-footer"]}>
        <small>{widget.subHeader}</small>
        <TrendComponent
          trendLabel={widget.trendLabel}
          trendDirection={widget.trendDirection}
        />
      </div>
    </div>
  );
};
