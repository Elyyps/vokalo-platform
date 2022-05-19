import React from "react";
import { IWidget } from "../../../types/cores/widget";
import style from "./feedback-widget.module.scss";

interface IFeedbackWidget {
  widget: IWidget;
}
export const FeedbackWidget = ({ widget }: IFeedbackWidget) => {
  return (
    <div className={` ${style["feedback-widget"]} section-item `}>
      <h6>Feedback</h6>
      <div className={style["feedback-widget-percentage"]}>
        {widget.elements?.map((element, key) => (
          <div
            key={key}
            className={
              style[
                widget.elements && widget.elements.length > 2
                  ? "feedback-widget-complex"
                  : "feedback-widget-simple"
              ]
            }
            style={{
              width: `${element.percentage}%`,
              backgroundColor: element.color,
            }}
          >
            <div>{element.percentage}%</div>
            <div>{element.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
