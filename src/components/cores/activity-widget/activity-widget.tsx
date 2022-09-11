import { IWidget } from "../../../types/cores/widget";
import { EmptyStateComponent } from "../empty-state/empty-state";
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
        <h6>{widget.header}</h6>
        <TrendComponent
          trendLabel={widget.trendLabel}
          trendDirection={widget.trendDirection}
        />
      </div>
      {widget.label !== "NONE" ? (
        <h3
          className={
            hasColor ? style[`activity-widget-${widget.trendDirection}`] : ""
          }
        >
          {widget.label}
        </h3>
      ) : (
        <EmptyStateComponent />
      )}
    </div>
  );
};
