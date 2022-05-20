import React from "react";
import style from "./sessions.module.scss";
import { sessionsData } from "../../api/session";
import { ActivityWidget } from "../../components/cores/activity-widget/activity-widget";
import { SessionsTableComponent } from "../../components/modules/sessions-table/sessions-table";
import { FeedbackWidget } from "../../components/cores/feedback-widget/feedback-widget";
import { SentimentWidget } from "../../components/cores/sentiment-widget/sentiment-widget";
import { UsageWidget } from "../../components/cores/usage-widget/usage-widget";

export const SessionPage = () => {
  return (
    <div className={style["sessions"]}>
      <div className={style["sessions-top"]}>
        <ActivityWidget
          widget={{
            header: "Most active athlete",
            label: "Brian B.",
            trendLabel: 25,
            trendDirection: "POSITIVE",
          }}
        />
        <ActivityWidget
          widget={{
            header: "Most active athlete",
            label: "Brian B.",
            trendLabel: 45,
            trendDirection: "NEGATIVE",
          }}
        />
        <FeedbackWidget
          widget={{
            header: "Feedback",
            trendLabel: 55,
            elements: [
              { percentage: 65, color: "#21ce71", label: "POSITIVE" },
              { percentage: 35, color: "#f05056", label: "ORIENTATION" },
            ],
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
      </div>
      <SessionsTableComponent sessions={sessionsData()} />
    </div>
  );
};
