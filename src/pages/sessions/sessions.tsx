import React from "react";
import style from "./sessions.module.scss";
import { getSessionsAPI } from "../../api/session";
import { ActivityWidget } from "../../components/cores/activity-widget/activity-widget";
import { SessionsTableComponent } from "../../components/modules/sessions-table/sessions-table";
import { FeedbackWidget } from "../../components/cores/feedback-widget/feedback-widget";
import { SentimentWidget } from "../../components/cores/sentiment-widget/sentiment-widget";
import { UsageWidget } from "../../components/cores/usage-widget/usage-widget";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import Layout from "../../components/Layout";
import { ISession } from "../../types/modules/session";
import { AccountContext } from "../../context/account";
import { LoaderComponent } from "../../components/cores/loader/loader";
import FilterContext from "../../context/filter";

export const SessionsPage = (user: any) => {
  const [sessions, setSessions] = React.useState<ISession[]>();

  const { getAccount } = React.useContext(AccountContext);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const [filter, setFilter] = React.useState({ key: "type", value: "" });

  const getSessions = async (session: any) => {
    const data = await getSessionsAPI(
      session,
      team.id,
      startDate,
      endDate,
      filter
    );
    setSessions(data.sessions);
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getSessions(session);
    });
  }, [team, startDate, endDate, filter.value]);

  return (
    <div className={style["sessions"]}>
      {filter.value}
      <PageHeaderComponent
        title="Session"
        list={["Match", "Training"]}
        onSelect={(value: string) =>
          setFilter({ key: "type", value: value.toLocaleUpperCase() })
        }
      ></PageHeaderComponent>
      <div className={style["sessions-top"]}>
        <UsageWidget
          widget={{
            header: "Usage",
            label: "7.240",
            subHeader: "previous 15 days",
            trendLabel: 55,
            trendDirection: "POSITIVE",
            graph: {
              yAxis: {
                name: "age",
                data: [0, 2, 4, 8, 5, 6, 2],
              },
              xAxis: {
                name: "weight",
                data: [0, 1, 2, 3, 4, 5, 6],
              },
            },
          }}
        />
        <ActivityWidget
          widget={{
            header: "Most active athlete",
            label: "Brian B.",
            trendLabel: 25,
            trendDirection: "POSITIVE",
          }}
        />
        <SentimentWidget
          widget={{
            header: "Sentiment",
            label: "Good",
            subHeader: "previous 15 days",
            trendLabel: 55,
            trendDirection: "POSITIVE",
            graph: {
              yAxis: {
                data: [42, 95, 75, 50, 40, 55, 80],
              },
            },
          }}
        />
        <FeedbackWidget
          widget={{
            header: "Feedback",
            trendLabel: 55,
            elements: [
              { percentage: 25, color: "#2C2F51", label: "POSITIVE" },
              { percentage: 35, color: "#486FD4", label: "STIMULATION" },
              { percentage: 20, color: "#91AAE8", label: "ORIENTATION" },
              { percentage: 20, color: "#D3D3D3", label: "NEGATIVE" },
            ],
          }}
        />
      </div>
      {sessions ? (
        <SessionsTableComponent sessions={sessions} />
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};
