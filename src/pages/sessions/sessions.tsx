import React from "react";
import style from "./sessions.module.scss";
import { SessionsTableComponent } from "../../components/modules/sessions-table/sessions-table";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { ISession } from "../../types/modules/session";
import { AccountContext } from "../../context/account";
import { LoaderComponent } from "../../components/cores/loader/loader";
import FilterContext from "../../context/filter";
import { IWidget } from "../../types/cores/widget";
import { PageWidgetsComponent } from "../../components/modules/page-widgets/page-widgets";
import { getAPI } from "../../utils/getApi";
import { useCookies } from "react-cookie";

export const SessionsPage = (user: any) => {
  const [list, setList] = React.useState<{
    sessions: ISession[];
    widgets: IWidget[];
  }>();

  const { getAccount } = React.useContext(AccountContext);
  const [cookies] = useCookies(["team"]);
  const { startDate, endDate } = React.useContext(FilterContext);
  const [filter, setFilter] = React.useState({ key: "type", value: "" });

  const getSessions = async (session: any) => {
    const data = await getAPI(
      "sessions",
      session,
      cookies.team && cookies.team.id ? cookies.team.id : "",
      startDate,
      endDate,
      filter
    );
    setList({ sessions: data.sessions, widgets: data.sessionsAggregations });
  };
  React.useEffect(() => {
    if (user) {
      getAccount().then((session: any) => {
        getSessions(session);
      });
    }
  }, [cookies.team, startDate, endDate, filter.value]);

  return (
    <div className={style["sessions"]}>
      <PageHeaderComponent
        title={"Sessions"}
        list={["Match", "Training"]}
        onSelect={(value: string) =>
          setFilter({ key: "type", value: value.toLocaleUpperCase() })
        }
      ></PageHeaderComponent>
      {list ? (
        <div>
          <PageWidgetsComponent widgets={list.widgets} />
          <SessionsTableComponent sessions={list.sessions} />
        </div>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};
