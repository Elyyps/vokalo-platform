import React from "react";
import style from "./classifications.module.scss";
import { IWidget } from "../../../types/cores/widget";
interface IClassificationComponent {
  widget: IWidget;
}
export const ClassificationComponent = ({
  widget,
}: IClassificationComponent) => {
  return (
    <div className={style["classifications"]}>
      <span>{widget.header}</span>
      <div className={style["classifications-content"]}>
        {widget.elements?.map((element, key) => (
          <div
            key={key}
            style={{
              width: `${element.percentage}%`,
              backgroundColor: element.color,
            }}
          >
            <span>{element.percentage}%</span>
          </div>
        ))}
      </div>
      <div className={style["classifications-footer"]}>
        {widget.elements?.map((element, key) => (
          <div key={key}>
            <span style={{ backgroundColor: element.color }} />
            {element.label}
          </div>
        ))}
      </div>
    </div>
  );
};
