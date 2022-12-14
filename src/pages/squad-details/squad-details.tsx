import React from "react";
import { useParams } from "react-router-dom";
import { ClassificationWidget } from "../../components/cores/classifications-widget/classifications-widget";
import { FeedbackWidget } from "../../components/cores/feedback-widget/feedback-widget";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { ClassificationComponent } from "../../components/modules/classifications/classifications";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import { PageWidgetsComponent } from "../../components/modules/page-widgets/page-widgets";
import { SessionsComponent } from "../../components/modules/sessions/sessions";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { getAPI } from "../../utils/getApi";
import style from "./squad-details.module.scss";

export const SquadDetailsPage = () => {
  const [list, setList] = React.useState<{
    profile: any;
    widgets: any[];
  }>();
  const [isLineGraph, setIsLineGraph] = React.useState<boolean>(true);
  const [interval, setInterval] = React.useState<number>(1);

  const { getAccount } = React.useContext(AccountContext);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const [filter, setFilter] = React.useState({ key: "role", value: "" });
  const { id } = useParams();

  const getSquadDetails = async (session: any) => {
    const data = await getAPI("profile", session, "", startDate, endDate, [
      {
        key: "profileId",
        value: id,
      },
      filter,
      {
        key: "intervalLength",
        value: interval,
      },
    ]);
    setList({ profile: data.profile, widgets: data.profileAggregations });
  };
  const getTitle = () => {
    return list ? list.profile.firstName + " " + list.profile.lastName : "";
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getSquadDetails(session);
    });
  }, [team, startDate, endDate, filter, interval]);
  const sessionTip = `Sessions where the player has been recorded within selected period and applied filters`;
  const distrubutionTip = `<p>Total interactions categorized into four different communication types by percentages within selected period and applied filters.
  
Note: The total sum of the four categories can be more than 100% because one interaction can e.g. be positive and orientation at the same time.</p>`;
  const graphTip = `<p>This section consists of a graph and a chart changed by the arrows.
  
The graph shows interactions over time, and the chart compares the player´s average interaction across sessions.</p>
<span>You can:</span>
 <ul> 
 <li>Enlarge graph</li>
 <li>Select sessions for comparison in graph</li>
 <li>Change minute interval of graph</li>
 <li>Change interaction type</li>
 </ul>`;
  return list ? (
    <div className={style["squad-details"]}>
      <PageHeaderComponent
        title={getTitle()}
        hasReturn
        route="squad"
        list={["Match", "Training"]}
        onSelect={(value: string) =>
          setFilter({ key: "type", value: value.toLocaleUpperCase() })
        }
      />
      <div className={style["squad-details-content"]}>
        <div className={style["squad-details-left"]}>
          <PageWidgetsComponent widgets={list.widgets.slice(0, 2)} />
          <ClassificationWidget widget={list.widgets[2]} isBig />
          <InteractionsComponent
            widget={
              !isLineGraph
                ? list.widgets[4].tableData
                : list.widgets[4].graphData
            }
            tooltip={graphTip} // tooltip={list.widgets[4].tooltip}
            isLineGraph={isLineGraph}
            onClick={setIsLineGraph}
            onIntervalChange={setInterval}
            interval={interval}
            hasButtons
            isNotDefault
          />
        </div>
        <div className={` ${style["squad-details-right"]} widget-container `}>
          <SessionsComponent
            sessions={list.widgets[3].sessions}
            isSquadSessions
            //tooltip={list.widgets[3].tooltip}
            tooltip={sessionTip}
          />
        </div>
      </div>
    </div>
  ) : (
    <LoaderComponent />
  );
};
