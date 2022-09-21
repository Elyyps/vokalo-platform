import React from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountContext } from "../../../context/account";
import FilterContext from "../../../context/filter";
import { DatePickerComponent } from "../../cores/date-picker/date-picker";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./header.module.scss";

type Props = {
  user: any;
};
export const HeaderComponent = ({ user }: Props) => {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["team"]);
  const { logout } = React.useContext(AccountContext);
  const { startDate, setStartDate, endDate, setEndDate } =
    React.useContext(FilterContext);
  const onLogout = () => {
    logout();
    removeCookie("team");
    navigate("/login");
  };
  const setTeam = (team: any) => {
    setCookie("team", { name: team.name, id: team.id });
  };
  const isException = (): boolean => {
    const exceptions = ["/squad"];
    return exceptions.includes(pathname);
  };
  React.useEffect(() => {
    if (!cookies.team?.id && user) {
      if (isException()) {
        setTeam(user.teams[0]);
      } else {
        setTeam({ name: "All", id: "" });
      }
    }
  }, [pathname, user]);

  return (
    <div className={style["header"]}>
      <div className={style["header-left"]}>
        {user &&
          pathname !== "/" &&
          !pathname.includes("/squad/") &&
          !pathname.includes("/sessions/") && (
            <DropdownComponent
              title={cookies.team ? cookies.team.name : ""}
              contentPosition="right"
            >
              <ul>
                {!isException() && (
                  <li onClick={() => setTeam({ name: "All", id: "" })}>All</li>
                )}
                {user.teams?.map((team: any, key: number) => (
                  <li key={key} onClick={() => setTeam(team)}>
                    {team.name}
                  </li>
                ))}
              </ul>
            </DropdownComponent>
          )}
        {!pathname.includes("/sessions/") && pathname !== "/" && (
          <DatePickerComponent
            contentPosition="right"
            dateRange={{
              startDate: startDate,
              endDate: endDate,
            }}
            onChange={(range) => {
              setStartDate(range.startDate);
              setEndDate(range.endDate);
            }}
            onReset={() => {
              setStartDate(undefined);
              setEndDate(undefined);
            }}
          />
        )}
      </div>
      <div className={style["header-right"]}>
        {/* {pathname !== "/" && (
          <ButtonComponent
            title="Export"
            icon="/icons/export.svg"
            variant="transparent"
            position="left"
          />
        )} */}
        {user && (
          <DropdownComponent title={user.firstName} isProfile hasPadding>
            <ul>
              <li>Hello {user.firstName + " " + user.lastName}</li>
              <li onClick={onLogout}>Logout</li>
            </ul>
          </DropdownComponent>
        )}
      </div>
    </div>
  );
};
