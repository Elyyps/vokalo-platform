import React from "react";
import { IWidget } from "../../../types/cores/widget";
import { TrendComponent } from "../trend/trend";
import style from "./sentiment-widget.module.scss";
interface ISentimentWidget {
  widget: IWidget;
}
export const SentimentWidget = ({ widget }: ISentimentWidget) => {
  const [height, setHight] = React.useState(0);

  React.useEffect(() => {
    let heightSorted = widget.data?.yaxis[0].data.sort(
      (a: any, b: any) => b.value - a.value
    );
    setHight(heightSorted[0].value);
  }, []);
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
                height: (item.value * 100) / height + "%",
                width: `calc(${
                  100 / (widget.data ? widget.data?.yaxis[0].data.length : 0)
                }% - 2%)`,
              }}
            />
          ))}
        </div>
      </div>
      <div className={style["sentiment-widget-footer"]}>
        <small>{widget.subheader}</small>
        <TrendComponent
          trendLabel={widget.trendLabel}
          trendDirection={widget.trendDirection}
        />
      </div>
    </div>
  );
};
