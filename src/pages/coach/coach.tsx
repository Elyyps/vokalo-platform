import React from "react";
import style from "./coach.module.scss";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { ActivityWidget } from "../../components/cores/activity-widget/activity-widget";
import { MostWordsComponent } from "../../components/modules/most-words/most-words";
import { mostWordsData } from "../../api/most-words";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import { coachInteractionData } from "../../api/interactions";
import { SuggestionsComponent } from "../../components/modules/suggestions/suggestions";
import { suggestionsData } from "../../api/suggestions";
import { SessionsComponent } from "../../components/modules/sessions/sessions";
import { coachSessionsData } from "../../api/session";
import Layout from "../../components/Layout";

export const CoachPage = () => {
  return (
    <div className={style["coach"]}>
      <PageHeaderComponent title="Gabriel" list={[""]} onSelect={() => ""} />
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
        <div className={` ${style["coach-right"]} widget-container `}>
          <SessionsComponent sessions={coachSessionsData()} />
        </div>
        <MostWordsComponent mostWords={mostWordsData()} />
        <div className={style["coach-graph"]}>
          <InteractionsComponent
            widget={coachInteractionData()}
            onClick={() => ""}
          />
        </div>
        <SuggestionsComponent suggestions={suggestionsData()} />
      </div>
    </div>
  );
};
