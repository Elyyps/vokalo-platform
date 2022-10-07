import React from "react";
import { useCookies } from "react-cookie";
import { LoaderComponent } from "../../components/cores/loader/loader";
import { PageHeaderComponent } from "../../components/cores/page-header/page-header";
import { PageWidgetsComponent } from "../../components/modules/page-widgets/page-widgets";
import { SquadTableComponent } from "../../components/modules/squad-table/squad-table";
import { AccountContext } from "../../context/account";
import FilterContext from "../../context/filter";
import { IWidget } from "../../types/cores/widget";
import { IProfile } from "../../types/modules/squad";
import { getAPI } from "../../utils/getApi";
import style from "./squad.module.scss";
interface ISquadPage {
  user: any;
}
export const SquadPage = ({ user }: ISquadPage) => {
  const [list, setList] = React.useState<{
    squads: IProfile[];
    widgets: IWidget[];
  }>();
  const { getAccount } = React.useContext(AccountContext);
  const [cookies] = useCookies(["team"]);
  const { startDate, endDate } = React.useContext(FilterContext);
  const [filter, setFilter] = React.useState({ key: "role", value: "" });

  const getSquads = async (session: any) => {
    const data = await getAPI(
      "profiles",
      session,
      cookies.team.id ? cookies.team.id : "",
      startDate,
      endDate,
      filter
    );
    setList({ squads: data.profiles, widgets: data.profilesAggregations });
  };
  React.useEffect(() => {
    if (user) {
      getAccount().then((session: any) => {
        getSquads(session);
      });
    }
  }, [cookies.team, startDate, endDate, filter.value]);

  return (
    <div className={style["squad"]}>
      <PageHeaderComponent
        title={"Squad"}
        list={["Athlete", "Coach"]}
        onSelect={(value: string) =>
          setFilter({ key: "role", value: value.toLocaleUpperCase() })
        }
      />
      {list ? (
        <div>
          <PageWidgetsComponent widgets={list.widgets} />
          <SquadTableComponent squad={list.squads} />
        </div>
      ) : (
        <LoaderComponent />
      )}
    </div>
  );
};
