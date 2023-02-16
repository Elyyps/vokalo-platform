import React from "react";
import { useCookies } from "react-cookie";
import { DropdownComponent } from "../../components/cores/dropdown/dropdown";
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
  const [filter, setFilter] = React.useState<any[]>([]);
  const [buttonName, setButtonName] = React.useState<string>("Session Type");

  const sessionTypes: string[] = ["", "Match", "Training"];
  const getSquads = async (session: any) => {
    const data = await getAPI(
      "profiles",
      session,
      cookies.team && cookies.team.id ? cookies.team.id : "",
      startDate,
      endDate,
      filter
    );
    setList({ squads: data.profiles, widgets: data.profilesAggregations });
  };
  const getSessionButtonTitle = (value: string) => {
    value ? setButtonName(value) : setButtonName("Session type");
  };
  const setFilterValue = (type: string, value: string) => {
    const result = filter.find((item) => item.key === type);
    if (result) {
      const newFilters = filter.map((item) => {
        if (item.key === type) {
          item.value = value.toLocaleUpperCase();
        }
        return item;
      });
      type === "sessionType" && getSessionButtonTitle(value);
      setFilter(newFilters);
    } else {
      type === "sessionType" && getSessionButtonTitle(value);
      setFilter(filter.concat({ key: type, value: value.toLocaleUpperCase() }));
    }
  };
  React.useEffect(() => {
    if (user) {
      getAccount().then((session: any) => {
        getSquads(session);
      });
    }
  }, [cookies.team, startDate, endDate, filter]);

  return (
    <div className={style["squad"]}>
      <PageHeaderComponent
        hasTwoButtons
        buttonTitle="Profile type"
        title={"Squad"}
        list={["Athlete", "Coach"]}
        onSelect={(value: string) => filter && setFilterValue("role", value)}
      >
        <DropdownComponent
          title={buttonName}
          icon="/icons/filter.svg"
          hasBorder
        >
          <ul>
            {sessionTypes.map((item, key) =>
              !item.length ? (
                <li
                  key={key}
                  onClick={() => filter && setFilterValue("sessionType", "")}
                >
                  All
                </li>
              ) : (
                <li
                  key={key}
                  onClick={() => filter && setFilterValue("sessionType", item)}
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </DropdownComponent>
      </PageHeaderComponent>
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
