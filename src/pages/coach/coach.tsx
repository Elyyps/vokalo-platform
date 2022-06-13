import React from "react";
import style from "./coach.module.scss";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { ActivityWidget } from "../../components/cores/activity-widget/activity-widget";
import { MostWordsComponent } from "../../components/modules/most-words/most-words";
import { mostWordsData } from "../../api/most-words";

export const CoachPage = () => {
  return (
    <div className={style["coach"]}>
      <PageHeaderComponent title="Gabriel" />
      <div className={style["coach-top"]}>
        <div>
          <ActivityWidget
            widget={{
              header: "Total interactions",
              label: "420",
              trendLabel: 5,
              trendDirection: "POSITIVE",
            }}
          />
          <ActivityWidget
            widget={{
              header: "Overall sentiment",
              label: "Great",
              trendLabel: 75,
              trendDirection: "POSITIVE",
            }}
            hasColor
          />
        </div>
        <div className="widget-container">-</div>
        <MostWordsComponent mostWords={mostWordsData()} />
      </div>
    </div>
  );
};
