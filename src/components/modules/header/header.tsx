import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserAPI } from "../../../api/user";
import { AccountContext } from "../../../context/account";
import { ButtonComponent } from "../../cores/button/button";
import { DatePickerComponent } from "../../cores/date-picker/date-picker";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./header.module.scss";

export const HeaderComponent = () => {
  let navigate = useNavigate();
  const [user, setUser] = React.useState<any>();
  const [currentTeam, setCurrentTeam] = React.useState<string>("");

  const { getSession, logout } = React.useContext(AccountContext);

  const getUser = async (session: any) => {
    const data = await getUserAPI(session);
    setUser(data);
    setCurrentTeam(data.teams[0].name);
  };
  const onLogout = () => {
    logout();
    navigate("/login");
  };

  React.useEffect(() => {
    getSession().then((session: any) => {
      getUser(session);
    });
  }, [getSession]);

  return (
    <div className={style["header"]}>
      <div className={style["header-left"]}>
        {user && (
          <DropdownComponent title={currentTeam} contentPosition="right">
            <ul>
              {user.teams.map((team: any, key: number) => (
                <li key={key} onClick={() => setCurrentTeam(team.name)}>
                  {team.name}
                </li>
              ))}
            </ul>
          </DropdownComponent>
        )}
        <DatePickerComponent contentPosition="right" />
      </div>
      <div className={style["header-right"]}>
        <ButtonComponent
          title="Export"
          icon="/icons/export.svg"
          variant="transparent"
          position="left"
        />
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
