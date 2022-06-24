import React from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../../context/account";
import FilterContext from "../../../context/filter";
import { ButtonComponent } from "../../cores/button/button";
import { DatePickerComponent } from "../../cores/date-picker/date-picker";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./header.module.scss";
type Props = {
  user: any;
};
export const HeaderComponent = ({ user }: Props) => {
  let navigate = useNavigate();

  const { logout } = React.useContext(AccountContext);
  const { team, setTeam } = React.useContext(FilterContext);

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={style["header"]}>
      <div className={style["header-left"]}>
        {user && (
          <DropdownComponent
            title={team ? team.name : user.teams[0].name}
            contentPosition="right"
          >
            <ul>
              {user.teams.map((team: any, key: number) => (
                <li key={key} onClick={() => setTeam(team)}>
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
