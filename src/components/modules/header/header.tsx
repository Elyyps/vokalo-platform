import React from "react";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../../../context/account";
import { ButtonComponent } from "../../cores/button/button";
import { DatePickerComponent } from "../../cores/date-picker/date-picker";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./header.module.scss";

export const HeaderComponent = () => {
  let navigate = useNavigate();

  const [status, setStatus] = React.useState(false);
  const { getSession, logout } = React.useContext(AccountContext);
  React.useEffect(() => {
    getSession().then((session: any) => {
      setStatus(true);
    });
  }, [getSession]);
  const onLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className={style["header"]}>
      <div className={style["header-left"]}>
        <ButtonComponent title="normal btn" icon="/icons/sessions.svg" />
        <DropdownComponent title="Dropdown">HELLO</DropdownComponent>
        <DatePickerComponent />
      </div>
      <div className={style["header-right"]}>
        <ButtonComponent
          title="transparent btn"
          icon="/icons/export.svg"
          variant="transparent"
          position="left"
        />
        {status && (
          <DropdownComponent title="profile" isProfile>
            <ul>
              <li>Hello </li>
              <li onClick={onLogout}>Logout</li>
            </ul>
          </DropdownComponent>
        )}
      </div>
    </div>
  );
};
