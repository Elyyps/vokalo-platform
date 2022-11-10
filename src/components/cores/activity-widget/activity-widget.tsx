import { IWidget } from "../../../types/cores/widget";
import { EmptyStateComponent } from "../empty-state/empty-state";
import { Tooltip } from "../tooltip/tooltip";
import { TrendComponent } from "../trend/trend";
import style from "./activity-widget.module.scss";
interface IActivityWidget {
  widget: IWidget;
  hasColor?: boolean;
}
export const ActivityWidget = ({ widget, hasColor }: IActivityWidget) => {
  return (
    <div className={` ${style["activity-widget"]} widget-container `}>
      <div className="widget-header">
        <h6>
          {widget.header}
          {widget.tooltip && <Tooltip content={widget.tooltip} />}
        </h6>
        {widget.trendLabel && (
          <TrendComponent
            trendLabel={widget.trendLabel}
            trendDirection={widget.trendDirection}
          />
        )}
      </div>
      {widget.label !== "NONE" ? (
        <h3
          className={
            hasColor ? style[`activity-widget-${widget.trendDirection}`] : ""
          }
          style={widget.subLabels && { fontSize: "24px" }}
        >
          {widget.subLabels && "1. "} {widget.label}
        </h3>
      ) : (
        <EmptyStateComponent />
      )}
      {widget.subLabels && (
        <ul>
          {widget.subLabels.map((item, key) => (
            <li key={key}>
              {key + 2}. {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
