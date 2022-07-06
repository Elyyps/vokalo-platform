import React from "react";
import { useParams } from "react-router-dom";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { ClassificationComponent } from "../../components/modules/classifications/classifications";
import { FieldOverviewComponent } from "../../components/modules/field-overview/field-overview";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { ISession } from "../../types/modules/session";
import { converToDate } from "../../utils/convertDate";
import { getAPI } from "../../utils/getApi";
import style from "./session-details.module.scss";
type graphType = "Table" | "AllLine" | "Line";

export const SessionDetailsPage = () => {
  const [isLineGraph, setIsLineGraph] = React.useState<boolean>(false);
  const [list, setList] = React.useState<{
    session: ISession;
    widgets: any[];
  }>();
  const { getAccount } = React.useContext(AccountContext);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const { id } = useParams();

  const getSessionDetails = async (session: any) => {
    const data = await getAPI(
      "session",
      session,
      team && team.id,
      startDate,
      endDate,
      { key: "sessionId", value: id }
    );
    setList({ session: data.session, widgets: data.sessionAggregations });
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getSessionDetails(session);
    });
  }, [team, startDate, endDate]);

  const getTitle = () => {
    if (list) {
      return (
        converToDate(list.session.creationTimestamp) +
        ", " +
        list.session.type.toLocaleLowerCase()
      );
    } else return "";
  };
  return (
    <div className={style["session-details"]}>
      <PageHeaderComponent
        title={getTitle()}
        route="sessions"
        hasReturn
        list={[]}
        onSelect={() => ""}
      />
      {list && (
        <div className={style["session-details-content"]}>
          <div className={style["session-details-left"]}>
            <div className={style["session-details-widgets"]}>
              {list.widgets.slice(0, 2).map((widget, key) => (
                <div key={key} className="widget-container">
                  <h6>{widget.header}</h6>
                  <h3 style={{ marginTop: "16px" }}>{widget.label}</h3>
                </div>
              ))}
            </div>
            <div className={style["session-details-classification"]}>
              <ClassificationComponent widget={list.widgets[2]} />
            </div>
            <div className={style["session-details-graph"]}>
              <InteractionsComponent
                widget={
                  !isLineGraph
                    ? list.widgets[3].tableData
                    : list.widgets[3].graphData
                }
                isLineGraph={isLineGraph}
                onClick={setIsLineGraph}
                hasButtons
              />
            </div>
          </div>
          <div
            className={` ${style["session-details-right"]} widget-container `}
          >
            <FieldOverviewComponent
              fieldOverview={list.widgets[4].data}
              profiles={list.widgets[4].profiles}
            />
          </div>
        </div>
      )}
    </div>
  );
};
