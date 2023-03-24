import style from "./classifications.module.scss";
import { IWidget } from "../../../types/cores/widget";
import { EmptyStateComponent } from "../../cores/empty-state/empty-state";
import { Tooltip } from "../../cores/tooltip/tooltip";

interface IClassificationComponent {
  widget: IWidget;
}
export const ClassificationComponent = ({
  widget,
}: IClassificationComponent) => {
  return (
    <div className={` ${style["classifications"]} widget-container`}>
      <span>
        {widget.header} {widget.tooltip && <Tooltip content={widget.tooltip} />}
      </span>
      {widget.elements?.length ? (
        <div className={style["classifications-content"]}>
          {widget.elements?.map((element, key) => (
            <div
              key={key}
              style={{
                width: `${element.percentage * 100}%`,
                backgroundColor: element.color,
              }}
            >
              <span>{element.header}</span>
            </div>
          ))}
        </div>
      ) : (
        <EmptyStateComponent />
      )}
      {widget.elements && widget.elements?.length > 0 && (
        <div className={style["classifications-footer"]}>
          {widget.elements?.map((element, key) => (
            <div key={key}>
              <span style={{ backgroundColor: element.color }} />
              {element.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
