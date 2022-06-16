import React from "react";
import { squadData } from "../../api/squad";
import { ActivityWidget } from "../../components/cores/activity-widget/activity-widget";
import { FeedbackWidget } from "../../components/cores/feedback-widget/feedback-widget";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { UsageWidget } from "../../components/cores/usage-widget/usage-widget";
import { SquadTableComponent } from "../../components/modules/squad-table/squad-table";
import style from "./squad.module.scss";

export const SquadPage = () => {
  return (
    <div className={style["squad"]}>
      <PageHeaderComponent title="Squad" />
      <div className={style["squad-top"]}>
        <UsageWidget
          widget={{
            header: "Usage",
            subHeader: "previous 15 days",
            trendLabel: 55,
            trendDirection: "POSITIVE",
            graph: {
              yAxis: {
                name: "age",
                data: [0, 4, 2, 2, 8, 6, 2],
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
            trendLabel: 45,
            trendDirection: "NEGATIVE",
          }}
        />
        <div className="widget-container">
          <h6>Mood</h6>
          <h3 style={{ marginTop: "16px" }}>65% POSITIVE</h3>
        </div>
        <FeedbackWidget
          widget={{
            header: "Feedback",
            trendLabel: 55,
            elements: [
              { percentage: 75, color: "#21ce71", label: "POSITIVE" },
              { percentage: 25, color: "#f05056", label: "ORIENTATION" },
            ],
          }}
        />
      </div>
      <SquadTableComponent squad={squadData()} />
    </div>
  );
};
