import React from "react";
import style from "./classifications-widget.module.scss";
import { IWidget } from "../../../types/cores/widget";
import { Tooltip } from "../tooltip/tooltip";
interface IClassificationWidget {
  widget: IWidget;
  isBig?: boolean;
}
export const ClassificationWidget = ({
  widget,
  isBig,
}: IClassificationWidget) => {
  const getPercentage = (value: number) => {
    return Math.round(value * 100) + "%";
  };
  return (
    <div className={` ${style["classifications-widget"]} widget-container`}>
      <h6>
        {widget.header}
        {widget.tooltip && <Tooltip content={widget.tooltip} />}
      </h6>
      <div
        className={` ${style["classifications-widget-content"]} ${
          isBig && style["classifications-widget-big"]
        }`}
      >
        {widget.elements?.map((element, key) => (
          <div key={key}>
            <span>{getPercentage(element.percentage)}</span>
            <small>{element.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
};
