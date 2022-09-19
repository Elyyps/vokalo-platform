import React from "react";
import { useNavigate } from "react-router-dom";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import { PageWidgetsComponent } from "../../components/modules/page-widgets/page-widgets";
import { AccountContext } from "../../context/account";
import { IWidget } from "../../types/cores/widget";
import { getAPI } from "../../utils/getApi";
import style from "./dashboard.module.scss";
interface IDashboard {
  user: any;
}
export const DashboardPage = ({ user }: IDashboard) => {
  const [list, setList] = React.useState<{
    lastSession: IWidget[];
    sessions: IWidget[];
  }>();
  const { getAccount } = React.useContext(AccountContext);
  let navigate = useNavigate();

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
      <h1 onClick={() => user && navigate("sessions/" + user.lastSession.id)}>
        Last session
      </h1>
      <PageWidgetsComponent widgets={list?.lastSession} />
      <h1>Last 30 days</h1>
      <div className={style["dashboard-bottom"]}>
        <PageWidgetsComponent widgets={list?.sessions.slice(0, 4)} />

        <InteractionsComponent
          widget={list?.sessions[4]}
          onClick={() => ""}
          tooltip={list?.sessions[4].tooltip}
        />
      </div>
    </div>
  ) : (
    <LoaderComponent />
  );
};
