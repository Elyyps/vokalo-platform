import React from "react";
import { IWidget } from "../../../types/cores/widget";
import style from "./feedback-widget.module.scss";

interface IFeedbackWidget {
  widget: IWidget;
}
export const FeedbackWidget = ({ widget }: IFeedbackWidget) => {
  const getPercentage = (value: number) => {
    return Math.round(value * 100) + "%";
  };
  return (
    <div className={` ${style["feedback-widget"]} widget-container `}>
      <h6>{widget.header}</h6>
      <div className={style["feedback-widget-percentage"]}>
        {widget.elements?.map((element, key) => (
          <div
            key={key}
            className={` ${
              style[
                widget.elements && widget.elements.length > 2
                  ? "feedback-widget-complex"
                  : "feedback-widget-simple"
              ]
            } ${
              widget.elements &&
              widget.elements[0].percentage === 0 &&
              style["feedback-widget-simple-none"]
            }
            `}
            style={{
              width: getPercentage(element.percentage),
              backgroundColor: element.color,
            }}
          >
            <div>{getPercentage(element.percentage)}</div>
            <div>{element.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
