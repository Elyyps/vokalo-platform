import React from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { AccountContext } from "../../../context/account";
import FilterContext from "../../../context/filter";
import { DatePickerComponent } from "../../cores/date-picker/date-picker";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import Switch from "react-switch";

import style from "./header.module.scss";
import { ButtonComponent } from "../../cores/button/button";
import CoachContext from "../../../context/coach";

type Props = {
  user: any;
};
export const HeaderComponent = ({ user }: Props) => {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["team"]);
  const { logout } = React.useContext(AccountContext);
  const { isCoach, setIsCoach } = React.useContext(CoachContext);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { startDate, setStartDate, endDate, setEndDate } =
    React.useContext(FilterContext);
  const checkPassword = (value: string) => {
    if (value === "0000") {
      setIsCoach(true);
      setIsOpen(false);
    }
  };
  const onSwitchClick = () => {
    if (isCoach) {
      setIsCoach(false);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  const onLogout = () => {
    logout();
    removeCookie("team");
    navigate("/login");
  };
  const setTeam = (team: any) => {
    setCookie("team", { name: team.name, id: team.id });
  };
  React.useEffect(() => {
    if (!cookies.team?.id) {
      setTeam({ name: "All", id: "" });
    }
  }, [pathname]);

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
                <li onClick={() => setTeam({ name: "All", id: "" })}>All</li>
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
            <ul className={style["header-profile"]}>
              <li>
                User: <b>{user.firstName + " " + user.lastName}</b>
              </li>
              <li className={style["header-profile-coach"]}>
                <div className={style["header-profile-coach-switch"]}>
                  Coach
                  <Switch
                    onChange={onSwitchClick}
                    checked={isCoach}
                    height={18}
                    width={42}
                    handleDiameter={19}
                    offColor={"#dadada"}
                    onColor={"#333333"}
                    offHandleColor={"#000000"}
                    onHandleColor={"#000000"}
                  />
                </div>
                {isOpen && (
                  <input
                    placeholder="enter password"
                    type={"password"}
                    onChange={(e) => checkPassword(e.target.value)}
                  />
                )}
              </li>

              <li>
                <span onClick={onLogout} style={{ cursor: "pointer" }}>
                  Logout
                </span>
              </li>
            </ul>
          </DropdownComponent>
        )}
      </div>
    </div>
  );
};
