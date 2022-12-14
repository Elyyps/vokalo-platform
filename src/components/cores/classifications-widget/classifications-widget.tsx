import React from "react";
import style from "./classifications-widget.module.scss";
import { IWidget } from "../../../types/cores/widget";
import { Tooltip } from "../tooltip/tooltip";
import { EmptyStateComponent } from "../empty-state/empty-state";
interface IClassificationWidget {
  widget: IWidget;
  isBig?: boolean;
  tempoTooltip?: string;
}
export const ClassificationWidget = ({
  widget,
  isBig,
  tempoTooltip,
}: IClassificationWidget) => {
  const getPercentage = (value: number) => {
    return Math.round(value * 100) + "%";
  };
  const distrubutionTip = `<p>Total interactions categorized into four different communication types by percentages within selected period and applied filters.
  
Note: The total sum of the four categories can be more than 100% because one interaction can e.g. be positive and orientation at the same time.</p>`;
  return (
    <div className={` ${style["classifications-widget"]} widget-container`}>
      <h6>
        {widget.header}
        {widget.tooltip && (
          <Tooltip content={tempoTooltip ? tempoTooltip : distrubutionTip} />
        )}
      </h6>
      <div
        className={` ${style["classifications-widget-content"]} ${
          isBig && style["classifications-widget-big"]
        }`}
      >
        {widget.elements?.map((element, key) => (
          <div key={key}>
            <span>
              {element.percentage > 0 ? (
                getPercentage(element.percentage)
              ) : (
                <EmptyStateComponent />
              )}
            </span>
            <small>{element.label}</small>
          </div>
        ))}
      </div>
    </div>
  );
};
