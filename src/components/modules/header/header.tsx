import React from "react";
import { ButtonComponent } from "../../cores/button/button";
import { DatePickerComponent } from "../../cores/date-picker/date-picker";
import { DropdownComponent } from "../../cores/dropdown/dropdown";
import style from "./header.module.scss";

export const HeaderComponent = () => {
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
        <DropdownComponent title="profile" isProfile>
          HELLO
        </DropdownComponent>
      </div>
    </div>
  );
};
