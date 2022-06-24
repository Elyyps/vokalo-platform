import React from "react";
import { FieldOverviewData } from "../../api/field-overview";
import { playerInteractionData } from "../../api/interactions";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import Layout from "../../components/Layout";
import { ClassificationComponent } from "../../components/modules/classifications/classifications";
import { FieldOverviewComponent } from "../../components/modules/field-overview/field-overview";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import style from "./session-details.module.scss";

export const SessionDetailsPage = () => {
  const [isLineChart, setIsLineChart] = React.useState<boolean>(false);
  return (
    <div className={style["session-details"]}>
      <PageHeaderComponent title="Session details" route="sessions" hasReturn />
      <div className={style["session-details-content"]}>
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
          <div className={style["session-details-classification"]}>
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
              widget={playerInteractionData()}
              isLineChart={isLineChart}
              onClick={setIsLineChart}
              hasButtons
            />
          </div>
        </div>
        <div className={` ${style["session-details-right"]} widget-container `}>
          <FieldOverviewComponent fieldOverview={FieldOverviewData()} />
        </div>
      </div>
    </div>
  );
};
