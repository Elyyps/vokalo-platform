import React from "react";
import { useParams } from "react-router-dom";
import { squadInteractionData } from "../../api/interactions";
import { squadSessionsData } from "../../api/session";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { ClassificationComponent } from "../../components/modules/classifications/classifications";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import { SessionsComponent } from "../../components/modules/sessions/sessions";
import style from "./squad-details.module.scss";

export const SquadDetailsPage = () => {
  const { name } = useParams();
  const [isLineChart, setIsLineChart] = React.useState<boolean>(false);

  return (
    <div className={style["squad-details"]}>
      <PageHeaderComponent
        title={name ? name : ""}
        hasReturn
        route="squad"
        list={[""]}
        onSelect={() => ""}
      />
      <div className={style["squad-details-content"]}>
        <div className={style["squad-details-left"]}>
          <div className={style["squad-details-widgets"]}>
            <div className="widget-container">
              <h6>Session</h6>
              <h3>4</h3>
            </div>
            <div className="widget-container">
              <h6>Interactions per min</h6>
              <h3>3.57</h3>
            </div>
          </div>
          <div className={style["squad-details-classification"]}>
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
          <div className={style["squad-details-graph"]}>
            {/* <InteractionsComponent
              widget={squadInteractionData()}
              isLineChart={isLineChart}
              onClick={setIsLineChart}
              hasButtons
            /> */}
          </div>
        </div>
        <div className={` ${style["squad-details-right"]} widget-container `}>
          <SessionsComponent sessions={squadSessionsData()} isSquadSessions />
        </div>
      </div>
    </div>
  );
};
