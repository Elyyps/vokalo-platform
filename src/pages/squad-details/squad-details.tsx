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
  const [isLineGraph, setIsLineGraph] = React.useState<boolean>(false);
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
  }, [team, startDate, endDate, filter]);

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
            tooltip={list.widgets[4].tooltip}
            isLineGraph={isLineGraph}
            onClick={setIsLineGraph}
            hasButtons
            isNotDefault
          />
        </div>
        <div className={` ${style["squad-details-right"]} widget-container `}>
          <SessionsComponent
            sessions={list.widgets[3].sessions}
            isSquadSessions
            tooltip={list.widgets[3].tooltip}
          />
        </div>
      </div>
    </div>
  ) : (
    <LoaderComponent />
  );
};
