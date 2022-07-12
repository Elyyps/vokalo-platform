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
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { getAPI } from "../../utils/getApi";
import { IWidget } from "../../types/cores/widget";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { PageWidgetsComponent } from "../../components/modules/page-widgets/page-widgets";
interface ICoachPage {
  user: any;
}
export const CoachPage = ({ user }: ICoachPage) => {
  const [list, setList] = React.useState<any[]>();
  const { getAccount } = React.useContext(AccountContext);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const getSessionDetails = async (session: any) => {
    const data = await getAPI(
      "coach",
      session,
      team && team.id,
      startDate,
      endDate,
      { key: "profileId", value: user.id }
    );
    console.log(data.coachAggregations);

    setList(data.coachAggregations);
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getSessionDetails(session);
    });
  }, [team, startDate, endDate]);
  return list ? (
    <div className={style["coach"]}>
      <PageHeaderComponent title="Gabriel" list={[]} onSelect={() => ""} />
      <div className={style["coach-top"]}>
        <PageWidgetsComponent widgets={list.slice(0, 2)} />
        <div className={` ${style["coach-right"]} widget-container `}>
          <SessionsComponent sessions={list[2].sessions} />
        </div>
        <MostWordsComponent mostWords={list[4]} />
        <div className={style["coach-graph"]}>
          <InteractionsComponent
            widget={list[3].tableData}
            onClick={() => ""}
          />
        </div>
        <SuggestionsComponent suggestions={list[5]} />
      </div>
    </div>
  ) : (
    <LoaderComponent />
  );
};
