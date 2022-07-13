import React from "react";
import style from "./coach.module.scss";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { MostWordsComponent } from "../../components/modules/most-words/most-words";
import { InteractionsComponent } from "../../components/modules/interactions/interactions";
import { SuggestionsComponent } from "../../components/modules/suggestions/suggestions";
import { SessionsComponent } from "../../components/modules/sessions/sessions";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { getAPI } from "../../utils/getApi";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { PageWidgetsComponent } from "../../components/modules/page-widgets/page-widgets";
interface ICoachPage {
  user: any;
}
export const CoachPage = ({ user }: ICoachPage) => {
  const [list, setList] = React.useState<any[]>();
  const { getAccount } = React.useContext(AccountContext);
  const { team, startDate, endDate } = React.useContext(FilterContext);
  const getCoach = async (session: any) => {
    const data = await getAPI(
      "coach",
      session,
      team && team.id,
      startDate,
      endDate,
      { key: "profileId", value: user.id }
    );
    setList(data.coachAggregations);
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getCoach(session);
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
