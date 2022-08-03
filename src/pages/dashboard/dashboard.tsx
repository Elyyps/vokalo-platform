import React from "react";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { PageWidgetsComponent } from "../../components/modules/page-widgets/page-widgets";
import { AccountContext } from "../../context/account";
import { IWidget } from "../../types/cores/widget";
import { getAPI } from "../../utils/getApi";
import style from "./dashboard.module.scss";

export const DashboardPage = () => {
  const [list, setList] = React.useState<{
    lastSession: IWidget[];
    sessions: IWidget[];
  }>();
  const { getAccount } = React.useContext(AccountContext);

  const getDashboard = async (session: any) => {
    const data = await getAPI("dashboard", session, "", "", "", "");
    setList({
      lastSession: data.lastSessionAggregations,
      sessions: data.sessionAggregations,
    });
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getDashboard(session);
    });
  }, []);
  return list ? (
    <div className={style["dashboard"]}>
      <h1>Last session</h1>
      <PageWidgetsComponent widgets={list?.lastSession} />
      <h1>Last 30 days</h1>
      <div className={style["dashboard-bottom"]}>
        <PageWidgetsComponent widgets={list?.sessions.slice(0, 4)} />
        <div className="widget-container">ee</div>
        {/* <InteractionsComponent widget={list?.sessions[4]} onClick={() => ""} /> */}
      </div>
    </div>
  ) : (
    <LoaderComponent />
  );
};
