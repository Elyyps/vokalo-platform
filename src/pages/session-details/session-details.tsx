import React from "react";
import { useParams } from "react-router-dom";
import { updateSessionTitleAPI } from "../../api/session";
import { ButtonComponent } from "../../components/cores/button/button";
import { ClassificationWidget } from "../../components/cores/classifications-widget/classifications-widget";
import { EmptyStateComponent } from "../../components/cores/empty-state/empty-state";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { ModalComponent } from "../../components/cores/modal/modal";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { Tooltip } from "../../components/cores/tooltip/tooltip";
import { FieldOverviewComponent } from "../../components/modules/field-overview/field-overview";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { ISession } from "../../types/modules/session";
import { converToDate } from "../../utils/convertDate";
import { getAPI } from "../../utils/getApi";
import style from "./session-details.module.scss";

export const SessionDetailsPage = () => {
  const [isLineGraph, setIsLineGraph] = React.useState<boolean>(true);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [interval, setInterval] = React.useState<number>(1);

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
      [
        { key: "sessionId", value: id },
        { key: "intervalLength", value: interval },
      ]
    );

    setList({ session: data.session, widgets: data.sessionAggregations });
  };
  const changeTitle = async (title: string, type: string) => {
    getAccount().then(async (session: any) => {
      const result = await updateSessionTitleAPI(
        session,
        "sessionId=" +
          id +
          "&sessionType=" +
          type.toUpperCase() +
          "&label=" +
          title
      );
      if (result && list) {
        setList({ ...list, session: result.session });
        setIsEdit(false);
      }
    });
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getSessionDetails(session);
    });
  }, [interval]);

  const getTitle = () => {
    if (list?.session) {
      return (
        (list.session.label ? list.session.label + ", " : "") +
        converToDate(list.session.creationTimestamp) +
        ", " +
        list.session.type.toLocaleLowerCase()
      );
    } else return "";
  };
  const fieldTip = `<p>The number on each player is their average interactions/min in the match.</p>
You can: 
 <ul> 
 <li>Drag’n drop players in their position</li>
 <li>Change playing direction</li>
 <li>Change team formation</li>
 <li>Change between interaction types.</li>
 </ul>
 `;
  const graphTip = `<p>This section consists of a graph and a chart changed by the arrows..

The graph shows interactions over time (average = team), and the chart compares players’ average interactions/min.</p>
<span>You can:</span>
 <ul> 
 <li>Enlarge graph</li>
 <li>Select players for comparison in graph</li>
 <li>Change minute interval of graph</li>
 <li>Change interaction type</li>
 </ul>
 `;
  const distrubutionTip = `<p>Total interactions categorized into four different communication types by percentages for the session.

Note: The total sum of the four categories can be more than 100% because one interaction can e.g. be positive and orientation at the same time.</p>
 `;
  return list ? (
    <div className={style["session-details"]}>
      <PageHeaderComponent
        title={getTitle()}
        route="sessions"
        hasReturn
        hasTwoButtons
        list={[]}
        onSelect={() => ""}
      >
        <ButtonComponent
          title={"Edit session"}
          icon="/icons/settings.svg"
          hasBorder
          onClick={() => setIsEdit(true)}
        />
      </PageHeaderComponent>
      {isEdit && (
        <ModalComponent
          onClick={changeTitle}
          onClose={() => setIsEdit(false)}
          title={list.session.label ? list.session.label : ""}
          type={list.session.type ? list.session.type : "match"}
        />
      )}
      <div className={style["session-details-content"]}>
        <div className={style["session-details-left"]}>
          <div className={style["session-details-widgets"]}>
            {list.widgets.slice(0, 2).map((widget, key) => (
              <div key={key} className="widget-container">
                <h6>
                  {widget.header}
                  {widget.tooltip && <Tooltip content={widget.tooltip} />}
                </h6>
                <h3 style={{ marginTop: "16px" }}>{widget.label}</h3>
              </div>
            ))}
          </div>
          <div className={style["session-details-classification"]}>
            <ClassificationWidget
              widget={list.widgets[2]}
              isBig
              tempoTooltip={distrubutionTip}
            />
          </div>
          <div className={style["session-details-graph"]}>
            <InteractionsComponent
              widget={
                !isLineGraph
                  ? list.widgets[3].tableData
                  : list.widgets[3].graphData
              }
              //tooltip={list.widgets[3].tooltip}
              tooltip={graphTip}
              isLineGraph={isLineGraph}
              onClick={setIsLineGraph}
              onIntervalChange={setInterval}
              interval={interval}
              hasButtons
            />
          </div>
        </div>
        <div className={` ${style["session-details-right"]} widget-container `}>
          {list.widgets[4].tooltip && <Tooltip content={fieldTip} />}
          {list.widgets[4].data && list.widgets[4].profiles ? (
            <FieldOverviewComponent
              fieldOverview={list.widgets[4].data}
              profiles={list.widgets[4].profiles}
            />
          ) : (
            <EmptyStateComponent />
          )}
        </div>
      </div>
    </div>
  ) : (
    <LoaderComponent />
  );
};
