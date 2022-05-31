import React from "react";
import { interactionData } from "../../api/interactions";
import { ClassificationComponent } from "../../components/modules/classifications/classifications";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import style from "./session-details.module.scss";

export const SessionDetailsPage = () => {
  const [isLineChart, setIsLineChart] = React.useState<boolean>(false);
  return (
    <div className={style["session-details"]}>
      <div className={style["session-details-left"]}>
        <div className={style["session-details-widgets"]}>
          <div className="widget-container">
            <h6>Total interactions</h6>
            <h3>420</h3>
          </div>
          <div className="widget-container">
            <h6>Sessions length</h6>
            <h3>92 mins</h3>
          </div>
        </div>
        <div
          className={` ${style["session-details-classification"]} widget-container `}
        >
          <ClassificationComponent
            widget={{
              header: "Team interaction classifications",
              elements: [
                {
                  percentage: 49,
                  color: "#2C2F51",
                  label: "Positive feedback",
                },
                { percentage: 21, color: "#486FD4", label: "Stimulation" },
                { percentage: 15, color: "#91AAE8", label: "Orientation" },
                {
                  percentage: 15,
                  color: "#D3D3D3",
                  label: "Negative feedback",
                },
              ],
            }}
          />
        </div>
        <div className={style["session-details-graph"]}>
          <InteractionsComponent
            widget={interactionData()}
            isLineChart={isLineChart}
            onClick={setIsLineChart}
          />
        </div>
      </div>
      <div
        className={` ${style["session-details-right"]} widget-container `}
      ></div>
    </div>
  );
};
