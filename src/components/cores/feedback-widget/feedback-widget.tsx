import { IWidget } from "../../../types/cores/widget";
import { EmptyStateComponent } from "../empty-state/empty-state";
import { Tooltip } from "../tooltip/tooltip";
import style from "./feedback-widget.module.scss";

interface IFeedbackWidget {
  widget: IWidget;
}
export const FeedbackWidget = ({ widget }: IFeedbackWidget) => {
  const getPercentage = (value: number) => {
    return Math.round(value * 100) + "%";
  };
  const checkIfEmpty = () => {
    const list = widget.elements?.filter((item: any) => item.percentage === 0);
    return list?.length === widget.elements?.length;
  };
  return (
    <div className={` ${style["feedback-widget"]} widget-container `}>
      <h6>
        {widget.header}
        {widget.tooltip && (
          <Tooltip
            content={
              "Difference between match and training sessions within selected period and applied filters."
            }
          />
        )}
      </h6>
      {!checkIfEmpty() ? (
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
                element.percentage === 0 && style["feedback-widget-simple-none"]
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
      ) : (
        <EmptyStateComponent />
      )}
    </div>
  );
};
