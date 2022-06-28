import React from "react";
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
        <h3>{widget.label}</h3>
        <div className={style["sentiment-widget-graph"]}>
          {widget.data?.yaxis[0].data.map((item: any, key: number) => (
            <div
              key={key}
              style={{
                height: item.value * 10 + "%",
                width: `calc(${
                  100 / (widget.data ? widget.data?.yaxis[0].data.length : 0)
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
